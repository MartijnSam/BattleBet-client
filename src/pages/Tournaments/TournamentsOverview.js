import React, { useState } from "react";
import {
  Table,
  Popover,
  Menu,
  TextDropdownButton,
  Position,
} from "evergreen-ui";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch } from "react-redux";
import { GET_TOURNAMENTS } from "./../../store/tournaments/gql";
import { gotTournaments } from "./../../store/tournaments/actions";
import { setMessage } from "../../store/appState/actions";
import Loading from "../../components/Loading";
import { formatDate } from "./../../config/constants";
import { filter } from "fuzzaldrin-plus";

export default function TournamentsOverview() {
  const [search, setSearch] = useState("");
  const [ordering, setOrdening] = useState("NONE");
  const [orderingColumn, setOrdeningColumn] = useState(0);

  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_TOURNAMENTS);
  if (loading) {
    return <Loading />;
  }
  if (error) dispatch(setMessage("danger", true, error.message));
  if (data) dispatch(gotTournaments(data));

  const Order = {
    NONE: "NONE",
    ASC: "ASC",
    DESC: "DESC",
  };

  let getIconForOrder = (order) => {
    switch (order) {
      case Order.ASC:
        return "arrow-up";
      case Order.DESC:
        return "arrow-down";
      default:
        return "caret-down";
    }
  };

  let handleFilterChange = (value) => {
    setSearch(value);
  };

  function filterData(data) {
    if (search === "") return data.tournaments;
    return data.tournaments.filter((tourn) => {
      const result = filter([tourn.name], search);
      return result.length === 1;
    });
  }

  let renderOrderedHeader = (title, column) => {
    return (
      <Table.TextHeaderCell>
        <Popover
          position={Position.BOTTOM_LEFT}
          content={({ close }) => (
            <Menu>
              <Menu.OptionsGroup
                title="Order"
                options={[
                  { label: "Ascending", value: Order.ASC },
                  { label: "Descending", value: Order.DESC },
                ]}
                selected={ordering}
                onChange={(value) => {
                  setOrdening(value);
                  setOrdeningColumn(column);
                  // Close the popover when you select a value.
                  close();
                }}
              />
            </Menu>
          )}
        >
          <TextDropdownButton
            icon={getIconForOrder(orderingColumn === column ? ordering : null)}
          >
            {title}
          </TextDropdownButton>
        </Popover>
      </Table.TextHeaderCell>
    );
  };

  function sortData(data) {
    if (ordering === Order.NONE) return data;
    let key = "User";
    if (orderingColumn === 2) {
      return data.sort((a, b) => {
        let aValue = a[key].name;
        let bValue = b[key].name;

        const sortTable = { true: 1, false: -1 };
        // Order ascending (Order.ASC)
        if (ordering === Order.ASC) {
          return aValue === bValue ? 0 : sortTable[aValue > bValue];
        }
        // Order descending (Order.DESC)
        return bValue === aValue ? 0 : sortTable[bValue > aValue];
      });
    }
    if (orderingColumn === 3) key = "createdAt";
    return data.sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      const sortTable = { true: 1, false: -1 };
      // Order ascending (Order.ASC)
      if (ordering === Order.ASC) {
        return aValue === bValue ? 0 : sortTable[aValue > bValue];
      }
      // Order descending (Order.DESC)
      return bValue === aValue ? 0 : sortTable[bValue > aValue];
    });
  }

  let items = sortData(filterData(data));

  return (
    <div>
      {" "}
      <h1>Tournaments</h1>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell
            onChange={handleFilterChange}
            value={search}
          />
          {renderOrderedHeader("Created by", 2)}
          {renderOrderedHeader("Created at", 3)}
        </Table.Head>
        <Table.VirtualBody height={240}>
          {items.map((tournament) => (
            <Table.Row
              key={tournament.id}
              isSelectable
              onSelect={() => alert(tournament.name)}
            >
              <Table.TextCell>{tournament.name}</Table.TextCell>
              <Table.TextCell>{tournament.User.name}</Table.TextCell>
              <Table.TextCell>
                {formatDate(tournament.createdAt)}
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.VirtualBody>
      </Table>
    </div>
  );
}
