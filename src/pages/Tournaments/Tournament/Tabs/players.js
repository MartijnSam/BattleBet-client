import React from "react";
import { Pane, Avatar } from "evergreen-ui";

export default function Players(props) {
  const { playergroup } = props;
  return (
    <Pane display="flex" flexDirection="column">
      {playergroup.map((plyr) => (
        <Pane
          key={plyr.id}
          elevation={2}
          background="tint2"
          marginY={10}
          paddingTop={10}
          paddingBottom={10}
          display="flex"
          flexDirection="row"
        >
          <Avatar src={plyr.avatar} marginRight="1rem" marginLeft="1rem" />
          {plyr.userName}
        </Pane>
      ))}
    </Pane>
  );
}
