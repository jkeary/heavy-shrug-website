import { NavLink } from "react-router-dom";
import { logoImg } from "../variables";
import styled from "styled-components";

export default function Navbar() {
  return (
    <Nav>
      <Brand>
        <NavLink to="/">
          <LogoImg
            src={logoImg}
            alt="Heavy Shrug Logo"
          />
        </NavLink>
      </Brand>
      <Links>
        <ExternalLink href="https://heavyshrug.bandcamp.com" target="_blank" rel="noopener noreferrer">
          Listen
        </ExternalLink>
        <StyledNavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </StyledNavLink>
        <StyledNavLink
          to="/shows"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Shows
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

const LogoImg = styled.img`
  height: 65px;
  width: 100px;
  margin-top: 5px;
  @media (max-width: 640px) {
    height: 50px;
    width: 75px;
  }
  transition: filter 0.3s ease; 
  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
    
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.3rem 2rem;
  height: 64px;
  top: 0;
  z-index: 100;
  background: rgba(20, 28, 12, 0.6);

  @media (max-width: 640px) {
    padding: 0 1rem;
    height: 56px;
  }
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

const ExternalLink = styled.a`
  font-family: var(--font-heading);
  font-size: 1.2rem;
  color: var(--orange);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-bottom: 3px solid transparent;
  transition:
    color 0.8s,
    border-color 0.8s;
  text-shadow:
    3px 3px 0 rgba(0, 0, 0, 0.8),
    0 0 30px rgba(255, 107, 0, 0.4);
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
    color 0.8s,
    border-color 0.8s;
  text-shadow:
    3px 3px 0 rgba(0, 0, 0, 0.8),
    0 0 30px rgba(255, 107, 0, 0.4);
`;
