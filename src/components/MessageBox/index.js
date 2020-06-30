import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMessage } from "../../store/appState/selectors";
import { Alert, Pane } from "evergreen-ui";
import { clearMessage } from "../../store/appState/actions";
import { capitalize } from "../../config/constants";

export default function MessageBox() {
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();
  const showMessage = message !== null;
  if (!showMessage) return null;

  const background = () => {
    if (message.intent === "danger") return "redTint";
    if (message.intent === "success") return "greenTint";
    if (message.intent === "warning") return "yellowTint";
    if (message.intent === "none") return "blueTint";
    else return "tint1";
  };
  return (
    <Pane
      show={showMessage ? "show" : "hide"}
      height={0}
      background={background()}
    >
      <Alert
        width="50%"
        float="right"
        intent={message.intent}
        title={capitalize(message.intent)}
        isRemoveable={message.removable}
        onRemove={message.removable ? () => dispatch(clearMessage()) : null}
        children={message.text}
      />
    </Pane>
  );
}
