import React from 'react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="section-padding bg-white">
            <div className="container about-container">
                <div className="about-image">
                    {/* Placeholder for technician image */}
                    <img
                        src="https://images.unsplash.com/photo-1581578731117-104f2a893c5e?auto=format&fit=crop&w=800&q=80"
                        alt="Window cleaning technician on a ladder"
                        loading="lazy"
                    />
                    <div className="experience-badge">
                        <span className="years">5+</span>
                        <span className="text">Years of Excellence</span>
                    </div>
                </div>
                <div className="about-content">
                    <span className="subcap">Locally Owned & Operated</span>
                    <h2>Quality Driven. <br />Community Focused.</h2>
                    <p>
                        On The Hill Window Cleaning is locally owned and operated out of Duntroon, Ontario.
                        We specialize in more than just glass — from streak-free window cleaning to eaves, gutter cleaning,
                        pressure washing, and deck sanding, we bring professional care to every property.
                    </p>
                    <p>
                        Using advanced equipment and eco-friendly products, we deliver results that speak for themselves.
                        Whether it's a lakeside cottage, a heritage home, or a modern build — every property gets the
                        same attention to detail.
                    </p>

                    <div className="trust-badges">
                        <div className="badge-item">✓ Fully Insured</div>
                        <div className="badge-item">✓ Eco-Friendly</div>
                        <div className="badge-item">✓ 5-Star Rated</div>
                    </div>

                    <a href="#estimate" className="btn btn-primary margin-top">Get A Quote</a>
                </div>
            </div>
        </section>
    );
};

export default About;
