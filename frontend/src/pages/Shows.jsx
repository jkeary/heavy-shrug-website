import { useEffect } from "react";
import styled from "styled-components";

export default function Shows() {
  useEffect(() => {
    const scriptId = "bit-widget-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://widgetv3.bandsintown.com/main.min.js";
      script.charset = "utf-8";
      document.head.appendChild(script);
    } else if (window.BIT) {
      window.BIT.renderWidget();
    }
  }, []);

  return (
    <Page>
      <Container>
        <Title>Shows</Title>
        <a
          className="bit-widget-initializer"
          data-artist-name="id_2813487"
          data-app-id="6ea2922fcac25af6d16f99a3da4141d1"
          data-button-label-capitalization="capitalize"
          data-location-capitalization="capitalize"
          data-venue-capitalization="capitalize"
          data-display-local-dates="true"
          data-social-share-icon="true"
          data-bit-logo-position="hidden"
          data-follow-section-position="top"
          data-follow-section-alignment="center"
          data-follow-section-cta-text="FOLLOW"
          data-display-lineup="true"
          data-display-start-time="true"
          data-display-details="true"
          data-display-past-dates="true"
          data-play-my-city-position="bottom"
        />
      </Container>
    </Page>
  );
}

const Page = styled.main`
  flex: 1;
  padding: 3rem 2rem;
  background: rgba(20, 28, 12, 0.6);

  @media (max-width: 640px) {
    padding: 2rem 1.25rem;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: 3.4rem;
  color: var(--orange);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
  text-shadow:
    3px 3px 0 rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 107, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;
