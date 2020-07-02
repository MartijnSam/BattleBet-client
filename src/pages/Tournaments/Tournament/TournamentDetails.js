import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/index";
import { GET_TOURNAMENT } from "../../../store/tournaments/gql";
import { gotTournament } from "../../../store/tournaments/actions";
import { setMessage } from "../../../store/appState/actions";
import { Pane, Tablist, Tab } from "evergreen-ui";
import { capitalize } from "../../../config/constants";
import TournamentHome from "./Tabs/home";
import Players from "./Tabs/players";
import League from "./Tabs/league";

export default function TournamentDetails() {
  const [tab, setTab] = useState("home");
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_TOURNAMENT, {
    variables: { TournamentId: parseInt(id) },
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    dispatch(setMessage("danger", true, error.message));
    return <Loading />;
  } else dispatch(gotTournament(data));

  let { tournament } = data;
  const tabs = ["home", "players", "matches", "standings", "league"];

  const renderContent = (item) => {
    switch (item) {
      case "home":
        return (
          <TournamentHome
            id={id}
            admin={tournament.User}
            createdAt={tournament.createdAt}
            playergroup={tournament.PlayerGroup.Users}
            league={tournament.League}
          />
        );
      case "players":
        return <Players playergroup={tournament.PlayerGroup.Users} />;
      case "matches":
        return <>Matches</>;
      case "league":
        return <League league={tournament.League} />;
      case "standings":
        return <>Standings</>;
      default:
        break;
    }
  };

  return (
    <Pane border marginLeft="5rem" marginTop="2rem">
      <Pane border padding={20}>
        <h1>
          <strong>{tournament.name}</strong>
        </h1>
      </Pane>
      <Pane>
        <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
          {tabs.map((item) => (
            <Tab
              key={item}
              id={item}
              onSelect={() => setTab(item)}
              isSelected={tab === item}
            >
              {capitalize(item)}
            </Tab>
          ))}
        </Tablist>
      </Pane>
      <Pane>
        {tabs.map((item) => (
          <Pane
            key={item}
            id={`panel-${item}`}
            role="tabpanel"
            aria-labelledby={item}
            aria-hidden={tab !== item}
            display={tab === item ? "block" : "none"}
            marginLeft="2rem"
            marginRight="1rem"
          >
            {renderContent(item)}
          </Pane>
        ))}
      </Pane>
    </Pane>
  );
}
