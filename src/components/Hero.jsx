import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-background">
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=100"
                    alt="Modern glass cottage in forest"
                />
            </div>
            <div className="hero-overlay"></div>

            <div className="hero-content">
                <div className="hero-badge">
                    <span>✨ JUST LIKE NEW</span>
                </div>
                <h1>Crystal-Clear Views.<br />Every Time.</h1>
                <p className="hero-sub">
                    Premium window cleaning and exterior maintenance for Georgian Bay's finest homes and cottages.
                </p>
                <div className="hero-actions">
                    <button
                        onClick={() => document.getElementById('estimate').scrollIntoView({ behavior: 'smooth' })}
                        className="hero-cta"
                    >
                        Get Free Estimate
                    </button>
                    <a href="tel:7058884383" className="hero-call">
                        Call (705) 888-4383
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
