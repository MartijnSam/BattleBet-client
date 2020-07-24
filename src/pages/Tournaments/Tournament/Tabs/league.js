import React, { useState } from "react";
import LeagueHome from "./leagueTabs/home";
import { Pane, Tablist, Tab } from "evergreen-ui";
import { capitalize } from "../../../../config/constants";
import Teams from "./leagueTabs/Teams";
import Fixtures from "./leagueTabs/Fixtures";

export default function League(props) {
  const { league } = props;
  const [tab, setTab] = useState("home");

  const tabs = ["home", "teams", "fixtures", "standing"];

  const renderContent = (item) => {
    switch (item) {
      case "home":
        return <LeagueHome name={league.name} />;
      case "teams":
        return <Teams teams={league.Teams} />;
      case "fixtures":
        return <Fixtures fixtures={league.Fixtures} />;
      case "standings":
        return <>Standings</>;
      default:
        break;
    }
  };
  return (
    <>
      <Pane border padding={20}>
        <h2>
          <strong>{league.name}</strong>
        </h2>
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
    </>
  );
}
