import React, { useState } from 'react';
import './Portfolio.css';

const Portfolio = () => {
    // Using high quality Unsplash placeholders to represent the described portfolio
    const images = [
        { src: "https://images.unsplash.com/photo-1600596542815-e328701102b9?w=800", category: "Exterior", desc: "Elegant beige two-storey home" },
        { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", category: "Luxury", desc: "Modern black A-frame cottage" },
        { src: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800", category: "Exterior", desc: "Grand home with cathedral windows" },
        { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", category: "Glass", desc: "Modern glass sliding doors" },
        { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800", category: "Interior", desc: "Sunroom with wood ceiling" },
        { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", category: "Exterior", desc: "Contemporary dark ranch" },
        { src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800", category: "Heritage", desc: "Modern white farmhouse" },
        { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800", category: "Interior", desc: "Vaulted home office" }
    ];

    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section id="work" className="portfolio-section">
            <div className="container">
                <div className="section-header">
                    <h2>Our Work</h2>
                    <p>From heritage homes to modern glass cottages, we treat every property with care.</p>
                </div>

                <div className="portfolio-grid">
                    {images.map((img, index) => (
                        <div key={index} className="portfolio-item" onClick={() => setSelectedImage(img)}>
                            <img src={img.src} alt={img.desc} loading="lazy" />
                            <div className="overlay">
                                <span>{img.category}</span>
                                <p>{img.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedImage && (
                <div className="lightbox" onClick={() => setSelectedImage(null)}>
                    <div className="lightbox-content">
                        <img src={selectedImage.src} alt={selectedImage.desc} />
                        <button className="close-btn" onClick={() => setSelectedImage(null)}>×</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
