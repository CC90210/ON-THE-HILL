import React from 'react';
import { Sparkles, Mountain, CloudRain, Droplets, Layers, ZapTurn } from 'lucide-react';
import './Services.css';

const Services = () => {
    const services = [
        {
            icon: <Sparkles size={32} />,
            title: "Interior Window Cleaning",
            desc: "Streak-free cleaning of all interior glass, tracks, and sills."
        },
        {
            icon: <Mountain size={32} />,
            title: "Exterior Window Cleaning",
            desc: "From ground level to multi-storey, using water-fed poles to remove grime."
        },
        {
            icon: <CloudRain size={32} />,
            title: "Eaves & Gutter Cleaning",
            desc: "Clear debris and flush downspouts to prevent water damage and ice dams."
        },
        {
            icon: <ZapTurn size={32} />, // Or something representing power/force
            title: "Pressure Washing",
            desc: "Restore driveways, patios, siding, and walkways to like-new condition."
        },
        {
            icon: <Layers size={32} />,
            title: "Deck Sanding",
            desc: "Sand, smooth, and prep your weathered deck for staining or sealing."
        },
        {
            icon: <Droplets size={32} />,
            title: "Hard Water Removal",
            desc: "Specialty products to dissolve mineral deposits and restore glass clarity."
        }
    ];

    return (
        <section id="services" className="section bg-light">
            <div className="container">
                <div className="section-header">
                    <h2>Professional Services</h2>
                    <p>More than just glass cleaning — we care for your entire property exterior.</p>
                </div>
                <div className="services-grid">
                    {services.map((s, i) => (
                        <div key={i} className="service-card">
                            <div className="icon-wrapper">
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
