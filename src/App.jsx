import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Testimonials from './components/Testimonials';
import QuoteWizard from './components/QuoteEstimator/QuoteWizard';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Testimonials />
        <section className="quote-section-wrapper">
          <QuoteWizard />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
