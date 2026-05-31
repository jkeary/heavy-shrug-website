import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export default function MyButton({ url, name, to, submit, loading }) {
  if (submit) {
    return (
      <SubmitButton type="submit">
        {loading ? "Sending..." : "Send It"}
      </SubmitButton>
    );
  }
  if (to) {
    return <FakeButton to={to}>{name}</FakeButton>;
  }
  return (
    <Button key={name} href={url} target="_blank" rel="noopener noreferrer">
      {name}
    </Button>
  );
}

const SubmitButton = styled.button`
  font-family: var(--font-heading);
  font-size: 1.3rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.75rem 2rem;
  background-color: var(--orange);
  color: #0d1a07;
  border: 2px solid var(--orange);
  border-radius: 15px;
  cursor: pointer;
  align-self: flex-start;
  transition:
    background-color 0.8s,
    color 0.8s,
    border-color 0.8s,
    transform 0.75s,
    box-shadow 0.75s;

  &:hover {
    background-color: #0d1a07;
    color: var(--orange);
    border-color: var(--orange);
    text-decoration: none;
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const sharedButtonStyles = css`
  font-family: var(--font-heading);
  font-size: 1.2rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.7rem 2rem;
  background-color: var(--orange);
  color: #0d1a07;
  border: 2px solid var(--orange);
  border-radius: 15px;
  cursor: pointer;
  text-decoration: none;
  transition:
    background-color 0.8s,
    color 0.8s,
    border-color 0.8s,
    transform 0.75s,
    box-shadow 0.75s;
  display: inline-block;

  &:hover {
    background-color: #0d1a07;
    color: var(--orange);
    border-color: var(--orange);
    text-decoration: none;
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
  }
`;

const FakeButton = styled(Link)`
  ${sharedButtonStyles}
`;

const Button = styled.a`
  ${sharedButtonStyles}
`;
