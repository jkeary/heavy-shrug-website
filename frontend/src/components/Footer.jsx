import { useLocation } from 'react-router-dom'
import MyButton from './Button'
import styled from 'styled-components'

export default function Footer() {
  const { pathname } = useLocation()
  const BAND_EMAIL = 'heavyshrug@gmail.com'
  const showContactButton = pathname !== '/contact'

  return (
    <FooterBar>
      <Label>Email for Booking</Label>
      {showContactButton && <MyButton to="/contact" name="Contact Us" />}
      <EmailLink href={`mailto:${BAND_EMAIL}`}>heavyshrug@gmail.com</EmailLink>
    </FooterBar>
  )
}

const FooterBar = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  font-family: var(--font-heading-2);
  font-size: 1rem;
  background: rgba(20, 28, 12, 0.6);

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1.25rem 1rem;
    text-align: center;
  }
`

const Label = styled.span`
  color: #F5F0E8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-shadow:
    3px 3px 0 rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 107, 0, 0.3);
`

const EmailLink = styled.a`
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: var(--orange);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  transition: color 0.2s;
  text-shadow:
    3px 3px 0 rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 107, 0, 0.3);
  &:hover {
    cursor: pointer;
    color: var(--orange-light);
  }
`
