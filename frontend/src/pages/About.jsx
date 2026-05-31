import styled from "styled-components";
import PhotoCredit from "../components/PhotoCredit";
import { aboutPhoto, longBio } from "../variables";

export default function About() {
  return (
    <Page>
      <Container>
        <Title>About The Shrug</Title>
        <FigureWrap>
          <Photo
            src={aboutPhoto}
            alt="Heavy Shrug band"
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
        </FigureWrap>
        <Bio dangerouslySetInnerHTML={{ __html: longBio }} />
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
  max-width: 1000px;
  margin: 0 auto;
  display: flow-root;
`;

const FigureWrap = styled.div`
  float: left;
  width: 55%;
  margin: 0.5rem 2.5rem 1.5rem 0;
  display: block;

  @media (max-width: 640px) {
    float: none;
    width: 100%;
    max-width: 100%;
    margin: 0 0 1.5rem 0;
  }
`;

const Photo = styled.img`
  width: 100%;
  display: block;
`;

const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: 3.4rem;
  color: var(--orange);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
  text-shadow:
    3px 3px 0 rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 107, 0, 0.3);

  @media (max-width: 768px) {
    font-size: var(--mobile-header-title-font);
    text-align: center;
  }
`;

const Bio = styled.p`
  font-family: var(--font-body);
  font-size: 1.6rem;
  line-height: 1.4;
  color: var(--white);
  white-space: pre-line;
  text-shadow:
    3px 3px 0 rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 107, 0, 0.3);

  @media (max-width: 640px) {
    font-size: 1.2rem;
  }
`;
