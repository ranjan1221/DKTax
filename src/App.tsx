import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Feedback from './components/Feedback';
import Footer from './components/Footer';
import AllReviews from './components/AllReviews';

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Experience />
      <Contact />
      <Feedback />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reviews" element={<AllReviews />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;