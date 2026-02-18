import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
    const reviews = [
        { name: "Sarah J.", initial: "S", text: "Cameron did an amazing job on our windows! They look brand new. Very professional and detail-oriented. Highly recommend!" },
        { name: "Mike T.", initial: "M", text: "Excellent service. Arrived on time, very polite, and the price was fair. Will definitely use On The Hill again." },
        { name: "Emily R.", initial: "E", text: "Our view is crystal clear now. The attention to detail was impressive, even on the hard-to-reach windows." },
        { name: "David L.", initial: "D", text: "Great local business. Cameron is friendly and hardworking. Support local!" }
    ];

    return (
        <section id="testimonials" className="reviews-section">
            <div className="container">
                <div className="center-header">
                    <h2>What Our Customers Say</h2>
                    <div className="stars">★★★★★</div>
                    <p>5.0 Rating on Google</p>
                </div>
                <div className="reviews-grid">
                    {reviews.map((r, i) => (
                        <div key={i} className="review-card">
                            <div className="reviewer-avatar">{r.initial}</div>
                            <div className="review-content">
                                <div className="stars-small">★★★★★</div>
                                <p>"{r.text}"</p>
                                <span className="reviewer-name">- {r.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="google-link">
                    <a href="https://www.google.com/search?q=On+The+Hill+Window+Cleaning" target="_blank" rel="noopener noreferrer">
                        See All Reviews on Google →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
