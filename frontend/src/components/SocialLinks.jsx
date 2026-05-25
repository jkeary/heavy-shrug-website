import styled from 'styled-components'

import { links } from '../variables'
import MyButton from './Button'

export default function SocialLinks() {
  return (
    <Section>
      <Heading>Crunch those likes, fam</Heading>
      <Grid>
        {links.map(({ name, url }) => (
          <MyButton key={name} url={url} name={name} />
        ))}
      </Grid>
    </Section>
  )
}

const Section = styled.section`
  padding: 3rem 2rem;
  /* background-color: rgba(20, 28, 12, 0.6);
  border-top: 3px solid var(--orange-dark); */
  /* border-bottom: 3px solid var(--orange-dark); */
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Heading = styled.h2`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  color: var(--orange);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 3.3rem;
  text-align: center;
  align-self: center;
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`

// const SocialButton = styled.a`
//   font-family: var(--font-heading);
//   font-size: 1.1rem;
//   letter-spacing: 0.1em;
//   text-transform: uppercase;
//   padding: 0.65rem 1.5rem;
//   background-color: var(--orange);
//   color: #0d1a07;
//   border: 2px solid var(--orange);
//   border-radius: 15px;
//   cursor: pointer;
//   text-decoration: none;
//   transition: background-color 0.2s, color 0.2s, border-color 0.2s, transform 0.15s, box-shadow 0.15s;
//   display: inline-block;

//   &:hover {
//     background-color: #0d1a07;
//     color: var(--orange);
//     border-color: var(--orange);
//     text-decoration: none;
//     transform: translateY(-2px) scale(1.03);
//     box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
//   }
// `