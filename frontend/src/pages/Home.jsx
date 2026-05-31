import { useEffect, useRef } from "react";
import styled from "styled-components";

import SocialLinks from "../components/SocialLinks";
import PhotoCredit from "../components/PhotoCredit";
import { heroPhoto, whatPhoto, shortBio } from "../variables";
import MyButton from "../components/Button";

export default function Home() {
  const overlayRef = useRef(null);
  const whoTitleRef = useRef(null);

  useEffect(() => {
    let frame = null;

    const updateScrollMotion = () => {
      if (window.innerWidth <= 768) {
        if (overlayRef.current) overlayRef.current.style.transform = "none";
        if (whoTitleRef.current) {
          whoTitleRef.current.style.transform = "none";
          whoTitleRef.current.style.opacity = "1";
        }
        frame = null;
        return;
      }
      const overlayOffset = Math.min(28, window.scrollY * 0.12);
      const titleOffset = Math.max(0, 60 - window.scrollY * 0.16);

      if (overlayRef.current) {
        overlayRef.current.style.transform = `translateX(${overlayOffset}px)`;
      }
      if (whoTitleRef.current) {
        whoTitleRef.current.style.transform = `translateX(${titleOffset}px)`;
        
        // Calculate opacity based on visibility
        const rect = whoTitleRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const fadeStart = windowHeight * 0.9;
        const fadeEnd = windowHeight * 0.4;

        if (rect.top > fadeStart) {
          whoTitleRef.current.style.opacity = "0";
        } else if (rect.top <= fadeEnd) {
          whoTitleRef.current.style.opacity = "1";
        } else {
          const progress = 1 - (rect.top - fadeEnd) / (fadeStart - fadeEnd);
          whoTitleRef.current.style.opacity = `${Math.min(1, Math.max(0, progress))}`;
        }
      }
      frame = null;
    };

    const handleScroll = () => {
      if (frame === null) {
        frame = requestAnimationFrame(updateScrollMotion);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollMotion();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Main>
      <HeroSection>
        <HeroOverlay ref={overlayRef}>
          <HeroTitle>
            Welcome to
            <br />
            Shrug <Italic>Nation</Italic>
          </HeroTitle>
        </HeroOverlay>
        <HeroMedia>
          <HeroImg
            src={heroPhoto}
            alt="Heavy Shrug band photo"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <PhotoCredit>
            Photo by{" "}
            <a
              href="https://molemanmedia.mypixieset.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mol White
            </a>
          </PhotoCredit>
        </HeroMedia>
      </HeroSection>

      <WhoSection>
        <WhoContent>
          <WhoTitle ref={whoTitleRef}>What even are we?</WhoTitle>
          <WhoBio dangerouslySetInnerHTML={{ __html: shortBio }} />
          <ButtonWrap>
            <MyButton to="/about" name="Read More" />
          </ButtonWrap>
        </WhoContent>
        <WhoPhotoWrap>
          <WhoPhoto
            src={whatPhoto}
            alt="Heavy Shrug band"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <PhotoCredit>
            Photo by{" "}
            <a
              href="https://www.instagram.com/tam_stockton/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tam Stockton
            </a>
          </PhotoCredit>
        </WhoPhotoWrap>
      </WhoSection>

      <SocialLinks />
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
    padding: 2rem 1.5rem;
  }
`;

const HeroMedia = styled.div`
  width: 65%;
  max-width: 1200px;
  display: block;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HeroImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
  display: block;
  /* filter: grayscale(100%) contrast(1.1) brightness(0.85); */
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 10%;
  right: 12%;
  z-index: 2;
  text-align: right;
  width: clamp(260px, 40vw, 520px);
  transform: translateX(0);
  will-change: transform;
  pointer-events: none;

  @media (max-width: 768px) {
    position: static;
    transform: none;
    width: 100%;
    text-align: center;
    margin-bottom: 1.5rem;
    pointer-events: auto;
  }
`;

const HeroTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--orange);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
  line-height: 1.05;

  @media (max-width: 768px) {
    font-size: var(--mobile-header-title-font);
  }
`;

const Italic = styled.span`
  font-style: italic;
`;

const WhoSection = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 4rem 3rem;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2.5rem 1.5rem;
  }
  background: rgba(20, 28, 12, 0.6);
`;

const WhoContent = styled.div`
  flex: 0 0 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  position: relative;
  z-index: 2;
  margin-right: -13%; /* overlap onto the photo (60% + 50% - 100% = 10%) */

  @media (max-width: 768px) {
    flex: unset;
    width: 100%;
    margin-right: 0;
    z-index: auto;
  }
`;

const WhoTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: var(--orange);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-shadow:
    3px 3px 0 rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 107, 0, 0.3);
  margin: 0;
  transform: translateX(32px);
  opacity: 0;
  transition: opacity 0.35s ease-out;
  will-change: transform, opacity;

  @media (max-width: 768px) {
    transform: none;
    text-align: center;
    align-self: center;
    font-size: var(--mobile-header-title-font);
  }
`;

const WhoBio = styled.p`
  font-size: 1.4rem;
  line-height: 1.8;
  color: #f5f0e8;
  text-shadow:
    3px 3px 0 rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 107, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const WhoPhotoWrap = styled.div`
  /* reduce flex-basis slightly so the photo doesn't butt against the right edge
     while preserving the intended overlap with the text */
  flex: 0 0 calc(50% - 2rem);
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    flex: unset;
    width: 100%;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const WhoPhoto = styled.img`
  width: 100%;
  display: block;
  /* filter: grayscale(100%) contrast(1.1) brightness(0.85); */
`;
