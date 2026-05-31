import styled from "styled-components";
import { useEffect, useRef } from "react";
import { links } from "../variables";
import MyButton from "./Button";

export default function SocialLinks() {
  const titleRef = useRef(null);

  useEffect(() => {
    const heading = titleRef.current;
    if (!heading) return;

    const mobileFont = getComputedStyle(document.documentElement).getPropertyValue('--mobile-header-title-font') || '1.8rem';

    if (window.innerWidth <= 768) {
      heading.style.opacity = "1";
      heading.style.fontSize = mobileFont;
      return;
    }

    // start small on desktop so it can scale up
    heading.style.fontSize = "0px";

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const fadeStartRatio = 0.55;
        const progress = ratio >= fadeStartRatio ? 1 : ratio / fadeStartRatio;
        heading.style.opacity = `${Math.min(1, Math.max(0, progress))}`;
        const maxPx = 48; // desktop max (3rem)
        heading.style.fontSize = `${Math.min(maxPx, Math.max(0, progress * maxPx))}px`;
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
      }
    );

    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  return (
    <Section>
      <Heading ref={titleRef}>Crunch those likes, fam</Heading>
      <Grid>
        {links.map(({ name, url }) => (
          <MyButton key={name} url={url} name={name} />
        ))}
      </Grid>
    </Section>
  );
}

const Section = styled.section`
  padding: 3rem 2rem;
  /* background-color: rgba(20, 28, 12, 0.6);
  border-top: 3px solid var(--orange-dark); */
  /* border-bottom: 3px solid var(--orange-dark); */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h2`
  font-family: var(--font-heading);
  font-size: 3rem;
  color: var(--orange);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 3.3rem;
  text-align: center;
  align-self: center;
  opacity: 0;
  transition: opacity 1s ease-out, font-size 1s ease-out;

  @media (max-width: 640px) {
    font-size: var(--mobile-header-title-font);
    margin-bottom: 2rem;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
`;
