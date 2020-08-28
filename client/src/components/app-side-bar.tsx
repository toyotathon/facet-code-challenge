import React, { FC, useCallback, useContext } from "react";
import { Sidebar, Button, Nav } from "grommet";
import { Table, Download, Dashboard, Logout } from "grommet-icons";
import { Link, Location, WindowLocation, navigate } from "@reach/router";
import { AuthService } from "../requests/auth-service";
import { LoggedInContext } from "../contexts/logged-in-context";

interface AppSidebarButtonProps {
  icon: JSX.Element;
  location: WindowLocation;
  path: string;
}

export const AppSidebarButton: FC<AppSidebarButtonProps> = ({
  icon,
  location,
  path,
}) => (
  <Link to={path}>
    <Button active={location.pathname === path} icon={icon} hoverIndicator />
  </Link>
);

export const AppSidebar: FC = () => {
  const { setLoggedIn } = useContext(LoggedInContext);
  const handleLogout = useCallback(async () => {
    await AuthService.sendLogoutRequest();
    setLoggedIn(false)
    navigate("/");
  }, [setLoggedIn]);

  return (
    <Sidebar
      animation={[
        { type: "fadeIn", duration: 300 },
        { type: "slideRight", size: "xlarge", duration: 150 },
      ]}
      background="brand"
      gridArea="sidebar"
      footer={
        <Button
          alignSelf="center"
          icon={<Logout />}
          onClick={handleLogout}
          hoverIndicator
        />
      }
    >
      <Location>
        {({ location }) => (
          <Nav align="center" gap="large">
            <AppSidebarButton
              icon={<Dashboard />}
              location={location}
              path="/dashboard"
            />
            <AppSidebarButton
              icon={<Table />}
              location={location}
              path="/data"
            />
            <AppSidebarButton
              icon={<Download />}
              location={location}
              path="/upload"
            />
          </Nav>
        )}
      </Location>
    </Sidebar>
  );
};
