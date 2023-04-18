import {
  createStyles,
  Autocomplete,
  Group,
  rem,
  Button,
  Avatar,
  Menu,
} from "@mantine/core";
import {
  IconBrandGoogle,
  IconLogout,
  IconPhoto,
  IconSearch,
} from "@tabler/icons-react";
import { Logo } from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "@store/slices/login";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export function HeaderSearch({
  search,
  setSearch,
}: {
  search?: string;
  setSearch?: (arg: string) => void;
}) {
  const auth = useSelector((state: RootState) => state.loginReducer.isLogin);
  const user = useSelector((state: RootState) => state.loginReducer.user);
  const files = useSelector((state: RootState) => state.filesReducer.files);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <div className="px-4">
      <div className={classes.inner}>
        <Logo />

        <Group>
          {auth ? (
            <Group>
              <Autocomplete
                className="hidden sm:block"
                placeholder="Search"
                icon={<IconSearch size="1rem" stroke={1.5} />}
                data={files.map((f) => f.name)}
                value={search || ""}
                onChange={(value) => {
                  setSearch && setSearch(value);
                }}
              />
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Avatar
                    radius="xl"
                    src={user.picture}
                    className="cursor-pointer"
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => navigate("/archive")}
                    icon={<IconPhoto size={14} />}
                  >
                    Archive
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    onClick={() => logout(dispatch)}
                    color="red"
                    icon={<IconLogout size={14} />}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          ) : (
            <NavLink to="http://api.localhost:80/auth">
              <Button leftIcon={<IconBrandGoogle size={rem(18)} />}>
                Continue with Google
              </Button>
            </NavLink>
          )}
        </Group>
      </div>
    </div>
  );
}
