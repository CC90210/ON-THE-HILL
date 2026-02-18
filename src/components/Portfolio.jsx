import React, { useState } from 'react';
import './Portfolio.css';

const Portfolio = () => {
    const images = [
        { src: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1200&q=80", category: "Luxury A-Frame", title: "Modern Black Facade" },
        { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", category: "Residential", title: "Collingwood Heritage" },
        { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", category: "Commercial", title: "Main Street Glass" },
        { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80", category: "Cottage", title: "Lakeside Panoramic" },
        { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80", category: "Exterior", title: "High-Reach Detail" },
        { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80", category: "Restoration", title: "Hard Water Removal" }
    ];

    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section id="work" className="portfolio-section">
            <div className="container">
                <h2>Our Recent Work</h2>
                <div className="portfolio-grid">
                    {images.map((img, index) => (
                        <div key={index} className="portfolio-item" onClick={() => setSelectedImage(img)}>
                            <img src={img.src} alt={img.title} loading="lazy" />
                            <div className="portfolio-overlay">
                                <span className="portfolio-category">{img.category}</span>
                                <h3 className="portfolio-title">{img.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedImage && (
                <div className="lightbox" onClick={() => setSelectedImage(null)}>
                    <div className="lightbox-content">
                        <img src={selectedImage.src} alt={selectedImage.title} />
                        <button className="close-btn" onClick={() => setSelectedImage(null)}>×</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
