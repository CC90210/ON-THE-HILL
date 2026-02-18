import React from 'react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="section-about">
            <div className="container">
                <div className="about-grid">
                    <div className="about-visual">
                        <img
                            src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80"
                            alt="Professional window cleaner working"
                            className="about-image-main"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1581578731117-104f2a893c5e?auto=format&fit=crop&w=600&q=80"
                            alt="Meticulous window detail"
                            className="about-image-secondary"
                        />
                    </div>

                    <div className="about-content">
                        <div className="about-content-inner">
                            <span className="about-accent">Est. 2020</span>
                            <h2>Locally Owned.<br />Quality Driven.</h2>
                            <p className="about-text">
                                On The Hill Window Cleaning is rooted in Duntroon, Ontario. We specialize in meticulous care for
                                premium properties — from lakeside cottages in Blue Mountain to heritage homes in Collingwood.
                                Using eco-friendly products and advanced deionization systems, we ensure your views remain
                                uninterrupted.
                            </p>

                            <div className="stat-row">
                                <div className="stat-item">
                                    <h3>5.0</h3>
                                    <p>Star rating</p>
                                </div>
                                <div className="stat-item">
                                    <h3>100%</h3>
                                    <p>Eco-Friendly</p>
                                </div>
                                <div className="stat-item">
                                    <h3>24h</h3>
                                    <p>Response time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
