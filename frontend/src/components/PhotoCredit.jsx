import styled from 'styled-components'

const PhotoCredit = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: var(--white);
  margin-top: 0.5rem;
  text-align: right;

  a {
    color: inherit;
    &:hover {
      color: var(--orange);
    }
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`

export default PhotoCredit
