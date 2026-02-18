import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simple mock POST to webhook
        setTimeout(() => {
            setStatus('success');
            setForm({ name: '', email: '', phone: '', message: '' });
        }, 1000);
    };

    return (
        <footer className="footer" id="contact">
            <div className="container footer-grid">
                <div className="footer-col">
                    <h3>On The Hill</h3>
                    <p className="footer-desc">
                        Professional window cleaning and property maintenance services for Georgian Bay's finest homes.
                    </p>
                    <div className="contact-info">
                        <div className="contact-item">
                            <MapPin size={18} />
                            <span>9433 County Rd 91, Duntroon, ON L0M 1H0</span>
                        </div>
                        <div className="contact-item">
                            <Phone size={18} />
                            <a href="tel:7058884383">(705) 888-4383</a>
                        </div>
                        <div className="contact-item">
                            <Mail size={18} />
                            <a href="mailto:info@onthehillcleaning.ca">info@onthehillcleaning.ca</a>
                        </div>
                    </div>
                    <div className="social-links">
                        <a href="https://instagram.com" aria-label="Instagram"><Instagram /></a>
                        <a href="https://facebook.com" aria-label="Facebook"><Facebook /></a>
                        <a href="https://linkedin.com" aria-label="LinkedIn"><Linkedin /></a>
                        <a href="https://yelp.ca" aria-label="Yelp"><ExternalLink /></a>
                    </div>
                </div>

                <div className="footer-col">
                    <h3>Service Area</h3>
                    <ul className="service-list">
                        <li>Collingwood</li>
                        <li>Blue Mountain</li>
                        <li>Wasaga Beach</li>
                        <li>Duntroon</li>
                        <li>Clearview</li>
                        <li>Stayner</li>
                        <li>Creemore</li>
                        <li>Georgian Bay Area</li>
                    </ul>
                </div>

                <div className="footer-col form-col">
                    <h3>Quick Contact</h3>
                    <form onSubmit={handleSubmit} className="footer-form">
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                        />
                        <div className="row">
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                value={form.phone}
                                onChange={e => setForm({ ...form, phone: e.target.value })}
                            />
                        </div>
                        <textarea
                            placeholder="Message"
                            rows="3"
                            required
                            value={form.message}
                            onChange={e => setForm({ ...form, message: e.target.value })}
                        ></textarea>
                        <button type="submit" disabled={status === 'sending' || status === 'success'}>
                            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} On The Hill Window Cleaning. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
