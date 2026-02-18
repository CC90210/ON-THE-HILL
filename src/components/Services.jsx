import React from 'react';
import { Sparkles, Mountain, CloudRain, Droplets, Layers, Zap } from 'lucide-react';
import './Services.css';

const Services = () => {
    const services = [
        {
            icon: <Sparkles size={32} />,
            title: "Interior Cleaning",
            desc: "Streak-free clarity for all interior glass, tracks, and sills. We treat your home with absolute care."
        },
        {
            icon: <Mountain size={32} />,
            title: "Exterior Cleaning",
            desc: "High-reach capability using deionized water systems for a spotless finish on every floor."
        },
        {
            icon: <CloudRain size={32} />,
            title: "Eaves & Gutter",
            desc: "Complete debris removal and downspout flushing to protect your foundation and roof."
        },
        {
            icon: <Zap size={32} />,
            title: "Pressure Washing",
            desc: "Revitalize siding, driveways, and stone walkways with professional-grade pressure systems."
        },
        {
            icon: <Layers size={32} />,
            title: "Deck Restoration",
            desc: "Expert sanding and preparation to bring weathered wood back to its natural glory."
        },
        {
            icon: <Droplets size={32} />,
            title: "Glass Restoration",
            desc: "Advanced mineral deposit and hard water stain removal for crystal-clear results."
        }
    ];

    return (
        <section id="services" className="section-services">
            <div className="container">
                <div className="services-header">
                    <h2>Our Specialized Services</h2>
                    <p>Meticulous care for residential properties across the Georgian Bay region.</p>
                </div>
                <div className="services-grid">
                    {services.map((s, i) => (
                        <div key={i} className="service-card">
                            <div className="service-icon">
                                {s.icon}
                            </div>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
