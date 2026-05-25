import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <GlobalStyle />
      <AppWrapper>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </AppWrapper>
      <MusicPlayer />
    </Router>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --orange: #FF6B00;
    --orange-dark: #CC5500;
    --orange-light: #FF8C33;
    --white: #F5F0E8;
    --font-heading: "header font 1", Arial, Helvetica, sans-serif;
    --font-heading-2: "header font 2", Arial, sans-serif;
    --font-body: "body font", sans-serif;
  }

  body {
    font-family: var(--font-body);
    color: #F5F0E8;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3 {
    font-family: var(--font-heading);
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-shadow:
      3px 3px 0 rgba(0, 0, 0, 0.8),
      0 0 20px rgba(255, 107, 0, 0.3);
  }

  a {
    color: var(--orange);
    text-decoration: none;
    display: inline-block;
    transition: color 0.2s, transform 0.15s, box-shadow 0.15s;
    &:hover {
      cursor: pointer;
      color: var(--orange-light);
    }
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
