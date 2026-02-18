import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Testimonials from './components/Testimonials';
import QuoteWizard from './components/QuoteEstimator/QuoteWizard';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Services />
        <div className="section-divider-light"></div>
        <Portfolio />
        <About />
        <div className="section-divider-dark"></div>
        <Testimonials />
        <section className="quote-section-wrapper" style={{ padding: '4rem 0', background: '#f0f4f8' }}>
          <QuoteWizard />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
