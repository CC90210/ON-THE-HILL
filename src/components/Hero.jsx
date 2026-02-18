import React from 'react';
import './Hero.css';

const Hero = () => {
    const scrollToEstimate = () => {
        document.getElementById('estimate').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="container hero-content">
                <div className="hero-text">
                    <div className="badge">★★★★★ 5.0 on Google</div>
                    <h1>Crystal-Clear Windows.<br />Every Time.</h1>
                    <p className="hero-sub">
                        Professional window cleaning, pressure washing & more — serving Collingwood, Blue Mountain, Wasaga Beach & the Georgian Bay area.
                    </p>
                    <div className="hero-actions">
                        <button onClick={scrollToEstimate} className="btn-primary hero-cta">
                            Get Your Free Estimate
                        </button>
                        <a href="tel:7058884383" className="btn-secondary hero-call">
                            Call (705) 888-4383
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
