import React, { useState } from "react";
import { TabNavigation, SidebarTab, Pane } from "evergreen-ui";
import { useLocation } from "react-router-dom";

export default function SideBar() {
  let location = useLocation();

  return (
    <Pane width="20%" paddingTop={20}>
      <TabNavigation marginBottom={16} marginTop={16}>
        {[
          { title: "Tournaments", url: "/tournaments" },
          { title: "Create Tournament", url: "/tournaments/create" },
        ].map((item) => (
          <SidebarTab
            key={item.title}
            is="a"
            href={item.url}
            id={item.title}
            isSelected={location.pathname === item.url}
          >
            {item.title}
          </SidebarTab>
        ))}
      </TabNavigation>
    </Pane>
  );
}
