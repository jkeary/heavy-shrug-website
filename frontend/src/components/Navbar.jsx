import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function Navbar() {
  return (
    <Nav>
      <Brand>
        <NavLink to="/">
          <div>Heavy</div>
          <div>Shrug</div>
        </NavLink>
      </Brand>
      <Links>
        <StyledNavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </StyledNavLink>
        <StyledNavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact
        </StyledNavLink>
      </Links>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 64px;
  top: 0;
  z-index: 100;
  background: rgba(20, 28, 12, 0.6);
`;

const Brand = styled.div`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--orange);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow:
    3px 3px 0 rgba(0, 0, 0, 0.8),
    0 0 30px rgba(255, 107, 0, 0.4);
  a {
    &:hover {
      cursor: pointer;
      color: var(--orange-light);
    }
  }
`;

const Links = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledNavLink = styled(NavLink)`
  font-family: var(--font-heading);
  font-size: 1.2rem;
  color: var(--orange);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-bottom: 3px solid transparent;
  transition:
    color 0.2s,
    border-color 0.2s;
  text-shadow:
    3px 3px 0 rgba(0, 0, 0, 0.8),
    0 0 30px rgba(255, 107, 0, 0.4);
`;
