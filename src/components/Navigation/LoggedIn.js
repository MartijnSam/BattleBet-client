import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import { Avatar, Popover, Position, Menu, Button, Pane } from "evergreen-ui";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <Pane
      border
      width={240}
      display="flex"
      alignItems="center"
      justifyContent="center"
      elevation={3}
      paddingLeft="1rem"
      paddingRight="1rem"
      marginRight="2rem"
    >
      <Avatar src={user.avatar} marginRight="1rem" />
      <Popover
        position={Position.BOTTOM_LEFT}
        content={
          <Menu>
            <Menu.Group>
              <Menu.Item icon="user">My Account</Menu.Item>
              <Menu.Item icon="numbered-list">My Tournaments</Menu.Item>
              <Menu.Item icon="calendar">Matches</Menu.Item>
            </Menu.Group>
            <Menu.Divider />
            <Menu.Group>
              <Menu.Item
                icon="remove"
                intent="danger"
                onSelect={() => dispatch(logOut())}
              >
                Logout
              </Menu.Item>
            </Menu.Group>
          </Menu>
        }
      >
        <Button width="100%">{user.userName}</Button>
      </Popover>
    </Pane>
  );
}
