import { useState } from "react";
import styled from "styled-components";
import { contactPhoto } from "../variables";
import PhotoCredit from "../components/PhotoCredit";

const BAND_EMAIL = "heavyshrug@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("https://formspree.io/f/xgoqlnrd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page>
      <Container>
        <PhotoWrap>
          <Photo
            src={contactPhoto}
            alt="Heavy Shrug contact"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <PhotoCredit>
            Photo by{" "}
            <a
              href="https://www.instagram.com/wrangler_jeans/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Derek Farr
            </a>
          </PhotoCredit>
        </PhotoWrap>
        <Content>
          <Title>Book Us</Title>
          <EmailLine>
            Hit us up directly:{" "}
            <a href={`mailto:${BAND_EMAIL}`}>{BAND_EMAIL}</a>
          </EmailLine>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Tell us about the show, venue, date..."
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
            />
            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send It"}
            </SubmitButton>
          </Form>
          {status === "success" && (
            <SuccessMsg>Message sent! We'll be in touch.</SuccessMsg>
          )}
          {status === "error" && (
            <ErrorMsg>Something went wrong. Email us directly.</ErrorMsg>
          )}
        </Content>
      </Container>
    </Page>
  );
}

const Page = styled.main`
  flex: 1;
  padding: 3rem 2rem;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PhotoWrap = styled.div`
  flex: 0 0 460px;

  @media (max-width: 768px) {
    flex: unset;
    width: 100%;
  }
`;

const Photo = styled.img`
  width: 100%;
  display: block;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: 3rem;
  color: var(--orange);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
  text-shadow:
    3px 3px 0 rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 107, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EmailLine = styled.p`
  font-family: var(--font-heading-2);
  font-size: 1.4rem;
  color: #f5f0e8;
  margin-bottom: 1.5rem;
  text-shadow:
    3px 3px 0 rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 107, 0, 0.3);

  a {
    color: var(--orange-light);
    font-weight: bold;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  font-family: var(--font-heading-2);
  font-size: 1rem;
  padding: 0.75rem 1rem;
  background-color: rgba(20, 28, 12);
  border: 2px solid #6b7c3a;
  border-radius: 2px;
  color: #f5f0e8;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--orange);
  }

  &::placeholder {
    color: rgba(245, 240, 232, 0.4);
  }
`;

const Textarea = styled(Input).attrs({ as: "textarea" })`
  min-height: 150px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  font-family: var(--font-heading);
  font-size: 1.3rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.75rem 2rem;
  background-color: var(--orange);
  color: #0d1a07;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  align-self: flex-start;
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s,
    transform 0.15s,
    box-shadow 0.15s;

  &:hover {
    background-color: #0d1a07;
    color: var(--orange);
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

const SuccessMsg = styled.p`
  margin-top: 1rem;
  color: #7ecf6a;
  font-family: var(--font-heading-2);
  font-size: 1.8rem;
`;

const ErrorMsg = styled.p`
  margin-top: 1rem;
  color: #ff6b6b;
  font-family: var(--font-heading-2);
  font-size: 1.8rem;
`;
