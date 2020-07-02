import React, { useState } from "react";
import {
  Pane,
  SelectMenu,
  Button,
  FormField,
  TextInputField,
  Dialog,
  TickCircleIcon,
} from "evergreen-ui";
import { GET_LEAGUES, CREATE_TOURNAMENT } from "../../store/tournaments/gql";
import { setMessage } from "../../store/appState/actions";
import Loading from "../../components/Loading";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useDispatch } from "react-redux";
import { createdTournament } from "../../store/tournaments/actions";
import { useHistory } from "react-router-dom";

export default function CreateTournament() {
  const dispatch = useDispatch();
  const [selectLeague, setSelectLeague] = useState({ id: null, name: null });
  const [invalidName, setInvalidName] = useState(false);
  const [validationMessageName, setValidationMessageName] = useState(null);
  const [showSucces, setShowSucces] = useState(false);
  const [validationMessageLeague, setValidationMessageLeague] = useState(null);
  const [intent, setIntent] = useState("success");
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const { loading, error, data } = useQuery(GET_LEAGUES);
  const [createTournament] = useMutation(CREATE_TOURNAMENT);
  const history = useHistory();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    dispatch(setMessage("danger", true, error.message));
    return <Loading />;
  }

  const { leagues } = data;

  async function handleSubmit() {
    setInvalidName(false);
    setIntent("success");
    setValidationMessageName(null);
    setValidationMessageLeague(null);
    if (name === "" && selectLeague.id === null) {
      setInvalidName(true);
      setIntent("danger");
      setValidationMessageName("Please enter a name for your tournament");
      setValidationMessageLeague("Please select a league");
    }
    if (name === "") {
      setInvalidName(true);
      setIntent("danger");
      setValidationMessageName("Please enter a name for your tournament");
    }
    if (selectLeague.id === null) {
      setIntent("danger");
      setValidationMessageLeague("Please select a league");
    }
    if (name !== "" && selectLeague.id !== null)
      try {
        const tournament = await createTournament({
          variables: { name, LeagueId: parseInt(selectLeague.id) },
        });
        dispatch(createdTournament(tournament.data));
        if (tournament) {
          setShowSucces(true);
          setLink(`/tournaments/${tournament.data.createTournament.id}`);
        }
      } catch (error) {
        dispatch(setMessage("danger", true, error.message));
      }
    setName("");
    setSelectLeague({ id: null, name: null });
  }

  return (
    <Pane border marginTop="2rem" width="100%">
      <Pane border padding={20}>
        <h1>Create a new Tournament</h1>
        <Pane border padding={20} margin={10} width="40%">
          <TextInputField
            label="Tournament name"
            description="Choose an awesome name for your tournament!"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={invalidName}
            validationMessage={validationMessageName}
          ></TextInputField>
          <FormField
            label="League Select"
            description="Select a league for your tournament!"
            required
            validationMessage={validationMessageLeague}
          >
            <SelectMenu
              closeOnSelect
              title="Select a league"
              options={leagues.map((league) => ({
                label: league.name,
                value: league.id,
              }))}
              selected={selectLeague.id}
              onSelect={(item) =>
                setSelectLeague({ id: item.value, name: item.label })
              }
            >
              <Button iconBefore="align-justify">
                {selectLeague.name || "Select a league"}
              </Button>
            </SelectMenu>
          </FormField>
        </Pane>
        <Button
          isLoading={loading}
          intent={intent}
          iconBefore="add"
          onClick={() => handleSubmit()}
        >
          Create Tournament
        </Button>
      </Pane>
      <Dialog
        isShown={showSucces}
        title="YEEY!"
        onCloseComplete={() => {
          setShowSucces(false);
          history.push(link);
        }}
        confirmLabel="Visit Tournament"
        hasCancel={false}
        hasClose={false}
        intent="success"
      >
        <TickCircleIcon color="success" marginRight={16} />
        You've successfully created a new tournament!
      </Dialog>
    </Pane>
  );
}
