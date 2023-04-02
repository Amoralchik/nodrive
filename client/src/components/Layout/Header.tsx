import { Button } from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "@store/slices/login";
import { RootState } from "@store/index";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Navbar } from "flowbite-react";

export function Header() {
  const auth = useSelector((state: RootState) => state.loginReducer.isLogin);
  const user = useSelector((state: RootState) => state.loginReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          NoDrive
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {auth ? (
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar alt="User settings" img={user.picture} rounded={true} />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{`${user.firstName} ${user.lastName}`}</span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => navigate("/archive")}>
              Archive
            </Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => dispatch(logoutAction())}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <NavLink to="http://api.localhost:80/auth">
            <Button color="Blue">
              <div className="flex text-center">
                <svg
                  className="w-4 h-4 mr-2 -ml-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sign in with Google
              </div>
            </Button>
          </NavLink>
        )}
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
