import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

import { NavLink as RouterNavLink, Link } from "react-router-dom";

const MainNav = props => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="light" light>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <NavbarBrand tag={Link} to="/" className="mr-auto">
          Ranked!
        </NavbarBrand>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/auth/login" onClick={toggleNavbar}>
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/auth/register" onClick={toggleNavbar}>
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/matches/history" onClick={toggleNavbar}>
                Match History
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/matches/predict" onClick={toggleNavbar}>
                Predict Match
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/matches/submit" onClick={toggleNavbar}>
                Submit Match
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MainNav;
