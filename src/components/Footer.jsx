import React from 'react';
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h3>ON THE HILL</h3>
                        <p>
                            Premium window cleaning and property detailing.
                            Servicing Collingwood, Wasaga Beach, and the Blue Mountains since 2020.
                        </p>
                    </div>

                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#services">Services</a></li>
                            <li><a href="#work">Our Work</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#estimate">Get Estimate</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Regions</h4>
                        <ul className="footer-links">
                            <li>Collingwood</li>
                            <li>Blue Mountains</li>
                            <li>Wasaga Beach</li>
                            <li>Creemore</li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Contact</h4>
                        <ul className="footer-links">
                            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <Phone size={14} /> (705) 888-4383
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <Mail size={14} /> cam@onthehill.ca
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <MapPin size={14} /> Duntroon, ON
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} On The Hill Window Cleaning. Just Like New ✨</p>
                    <div className="social-row">
                        <a href="#" className="social-link"><Instagram size={20} /></a>
                        <a href="#" className="social-link"><Facebook size={20} /></a>
                        <a href="#" className="social-link"><Linkedin size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
