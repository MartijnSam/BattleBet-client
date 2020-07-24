import React, { useState } from "react";
import TournamentsOverview from "./TournamentsOverview";
import CreateTournament from "./CreateTournament";
import { Pane, SidebarTab, Tablist } from "evergreen-ui";
import { capitalize } from "../../config/constants";

export default function Tournaments() {
  const [tab, setTab] = useState("tournaments");
  const tabs = ["tournaments", "create Tournament"];

  const renderContent = (item) => {
    switch (item) {
      case "tournaments":
        return <TournamentsOverview />;
      case "create Tournament":
        return <CreateTournament />;
      default:
        break;
    }
  };

  return (
    <Pane border>
      <Pane display="flex" flexDirection="row">
        <Pane
          border
          height="100%"
          marginTop="5rem"
          marginLeft="2rem"
          width="20%"
          paddingTop={20}
        >
          <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
            {tabs.map((item) => (
              <SidebarTab
                key={item}
                id={item}
                onSelect={() => setTab(item)}
                isSelected={tab === item}
              >
                {capitalize(item)}
              </SidebarTab>
            ))}
          </Tablist>
        </Pane>
        <Pane width="100%">
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
              width="100%"
            >
              {renderContent(item)}
            </Pane>
          ))}
        </Pane>
      </Pane>
    </Pane>
  );
}
