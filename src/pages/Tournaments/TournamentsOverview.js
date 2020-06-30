import React from "react";
import { Table } from "evergreen-ui";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch } from "react-redux";
import { GET_TOURNAMENTS } from "./../../store/tournaments/gql";
import { gotTournaments } from "./../../store/tournaments/actions";
import { setMessage } from "../../store/appState/actions";
import Loading from "../../components/Loading";

export default function TournamentsOverview() {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_TOURNAMENTS);
  if (loading) {
    return <Loading />;
  }
  if (error) dispatch(setMessage("danger", true, error.message));
  if (data) dispatch(gotTournaments(data));

  return (
    <div>
      {" "}
      <h1>Tournaments</h1>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell />
          <Table.TextHeaderCell>Created by</Table.TextHeaderCell>
          <Table.TextHeaderCell>ltv</Table.TextHeaderCell>
        </Table.Head>
        <Table.VirtualBody height={240}>
          {data.tournaments.map((tournament) => (
            <Table.Row
              key={tournament.id}
              isSelectable
              onSelect={() => alert(tournament.name)}
            >
              <Table.TextCell>{tournament.name}</Table.TextCell>
              <Table.TextCell>{tournament.User.name}</Table.TextCell>
              <Table.TextCell isNumber>{tournament.id}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.VirtualBody>
      </Table>
    </div>
  );
}
