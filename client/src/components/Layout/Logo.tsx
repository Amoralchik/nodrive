import { Title } from "@mantine/core";
import { NavLink } from "react-router-dom";

export function Logo() {
  return (
    <NavLink to="/">
      <Title order={1}>NoDrive</Title>
    </NavLink>
  );
}
