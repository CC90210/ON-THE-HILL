import React from 'react';
import { Star } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
    const reviews = [
        { name: "Sarah Janzen", loc: "Collingwood", initial: "SJ", text: "Cameron did an amazing job on our windows! They look brand new. Very professional and detail-oriented. Highly recommend!" },
        { name: "Michael Thoms", loc: "Blue Mountain", initial: "MT", text: "Excellent service. Arrived on time, very polite, and the price was fair. Our floor-to-ceiling glass looks incredible." },
        { name: "Emily Richardson", loc: "Wasaga Beach", initial: "ER", text: "Our view is crystal clear now. The attention to detail was impressive, especially on the eaves and the hard-to-reach windows." }
    ];

    return (
        <section id="testimonials" className="section-testimonials">
            <div className="container">
                <div className="testimonials-header">
                    <h2>Customer Experiences</h2>
                    <p>Highly rated architectural cleaning in the Georgian Bay region.</p>
                </div>
                <div className="testimonials-grid">
                    {reviews.map((r, i) => (
                        <div key={i} className="testimonial-card">
                            <div className="stars-modern">
                                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                            </div>
                            <p className="testimonial-text">"{r.text}"</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">{r.initial}</div>
                                <div className="author-info">
                                    <h4>{r.name}</h4>
                                    <p>{r.loc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
