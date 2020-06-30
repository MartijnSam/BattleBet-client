import React from "react";
import { Pane, Spinner } from "evergreen-ui";

export default function Loading() {
  return (
    <Pane>
      <Spinner marginX="auto" marginY={120} size={50} />
    </Pane>
  );
}
