import React, { useState, useEffect } from 'react';
import './QuoteEstimator.css';
import { calculateEstimate } from '../../utils/pricing';

export default function QuoteWizard() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState('forward');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        contact: {
            name: '',
            email: '',
            phone: '',
            contactMethod: 'email',
            address: '',
            city: 'Collingwood',
            postalCode: ''
        },
        property: {
            type: 'residential',
            storeys: '2 Storey',
            size: '1,500–2,500 sq ft',
            windowCountRange: '11-20',
            hasSkylights: false,
            skylightCount: 1,
            hasGlassDoors: false,
            glassDoorCount: 1,
            isHardAccess: false,
            hardAccessDetails: '',
            notes: ''
        },
        services: {
            windowCleaningType: 'both',
            additionalServices: [],
            frequency: 'seasonal',
            date: '',
            time: 'no_preference',
            source: 'google',
            wantsPromotions: false
        }
    });

    const [estimate, setEstimate] = useState({ low: 0, high: 0 });

    useEffect(() => {
        setEstimate(calculateEstimate(formData));
    }, [formData]);

    const update = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    };

    const next = () => {
        setDirection('forward');
        setStep(s => s + 1);
        const el = document.getElementById('estimate');
        if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    };

    const back = () => {
        setDirection('backward');
        setStep(s => s - 1);
    };

    const submit = async () => {
        setIsSubmitting(true);
        try {
            const payload = {
                timestamp: new Date().toISOString(),
                source: 'website_quote_estimator',
                customer: formData.contact,
                property: formData.property,
                services: formData.services,
                estimate: calculateEstimate(formData)
            };

            console.log('Posting to webhook:', payload);
            await new Promise(r => setTimeout(r, 1500));

            setIsSuccess(true);
            setStep(5);
        } catch (err) {
            console.error(err);
            alert('Something went wrong. Please try again or call us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="wizard-container success-container" id="estimate">
                <div className="success-content">
                    <div className="success-icon">✓</div>
                    <h2>Request Received!</h2>
                    <p>Thanks, {formData.contact.name.split(' ')[0]}. Your estimated range is:</p>
                    <div className="price-display large">
                        ${estimate.low} – ${estimate.high}
                    </div>
                    <p>Cameron will review your details and get back to you within 24 hours to confirm the price and schedule your service.</p>
                    <div className="success-actions">
                        <a href="tel:7058884383" className="btn btn-primary">Call (705) 888-4383</a>
                        <button onClick={() => window.location.reload()} className="btn btn-outline">Start New Quote</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="wizard-container" id="estimate">
            <div className="wizard-header">
                <div className="wizard-title">
                    <h2>Get Your Free Estimate</h2>
                    <p>Step {step} of 4</p>
                </div>
                <div className="progress-bar">
                    <div className="fill" style={{ width: `${(step / 4) * 100}%` }}></div>
                </div>
            </div>

            <div className={`wizard-step step-${step}`}>
                {step === 1 && <Step1Contact data={formData.contact} update={update} next={next} />}
                {step === 2 && <Step2Property data={formData.property} update={update} next={next} back={back} />}
                {step === 3 && <Step3Services data={formData.services} update={update} next={next} back={back} estimate={estimate} />}
                {step === 4 && <Step4Review formData={formData} update={update} estimate={estimate} submit={submit} back={back} isSubmitting={isSubmitting} setStep={setStep} />}
            </div>
        </div>
    );
}

// ---------------- SUB COMPONENTS ----------------

const Step1Contact = ({ data, update, next }) => {
    const isValid = data.name.length > 1 && data.email.includes('@') && data.phone.length > 9;

    return (
        <div className="step-content fade-in">
            <h3>Contact Information</h3>
            <div className="form-group-row">
                <label>Full Name *</label>
                <input type="text" value={data.name} onChange={e => update('contact', 'name', e.target.value)} placeholder="John Doe" />
            </div>
            <div className="form-group-row">
                <div className="half">
                    <label>Email *</label>
                    <input type="email" value={data.email} onChange={e => update('contact', 'email', e.target.value)} placeholder="john@example.com" />
                </div>
                <div className="half">
                    <label>Phone *</label>
                    <input type="tel" value={data.phone} onChange={e => update('contact', 'phone', e.target.value)} placeholder="(705) 555-0123" />
                </div>
            </div>
            <div className="form-group-row">
                <label>Preferred Contact</label>
                <div className="radio-group">
                    {['email', 'phone', 'text'].map(m => (
                        <label key={m} className={`radio-card ${data.contactMethod === m ? 'selected' : ''}`}>
                            <input type="radio" checked={data.contactMethod === m} onChange={() => update('contact', 'contactMethod', m)} />
                            {m.charAt(0).toUpperCase() + m.slice(1)}
                        </label>
                    ))}
                </div>
            </div>
            <div className="form-group-row">
                <label>City *</label>
                <select value={data.city} onChange={e => update('contact', 'city', e.target.value)}>
                    {['Collingwood', 'Wasaga Beach', 'Blue Mountain', 'Duntroon', 'Clearview', 'Stayner', 'Creemore', 'Other'].map(c =>
                        <option key={c} value={c}>{c}</option>
                    )}
                </select>
            </div>
            <div className="form-group-row">
                <label>Street Address</label>
                <input type="text" value={data.address} onChange={e => update('contact', 'address', e.target.value)} placeholder="123 Main St" />
            </div>

            <button className="btn btn-primary full-width" onClick={next} disabled={!isValid}>
                Next: Property Details →
            </button>
        </div>
    );
};

// Moved helper out
const CardSelect = ({ field, options, label, data, update }) => (
    <div className="form-group-row">
        <label>{label}</label>
        <div className="card-grid">
            {options.map(opt => (
                <button
                    key={opt}
                    className={`select-card ${data[field] === opt ? 'selected' : ''}`}
                    onClick={() => update('property', field, opt)}
                >
                    {opt}
                </button>
            ))}
        </div>
    </div>
);

const Step2Property = ({ data, update, next, back }) => {
    const toggle = (field) => update('property', field, !data[field]);

    return (
        <div className="step-content fade-in">
            <h3>Property Details</h3>
            <CardSelect field="type" label="Property Type" options={['Residential', 'Cottage/Vacation', 'Commercial']} data={data} update={update} />
            <CardSelect field="storeys" label="Number of Storeys" options={['1 Storey', '1.5 Storey', '2 Storey', '2.5+ Storey']} data={data} update={update} />
            <CardSelect field="windowCountRange" label="Approx. Windows" options={['5-10', '11-20', '21-30', '31-40', '41-50', '50+']} data={data} update={update} />

            <div className="form-group-row">
                <label className="toggle-label">
                    <span>Do you have skylights?</span>
                    <input type="checkbox" checked={data.hasSkylights} onChange={() => toggle('hasSkylights')} />
                </label>
                {data.hasSkylights && (
                    <div className="sub-input display-flex">
                        <span>How many?</span>
                        <input type="number" min="1" max="10" value={data.skylightCount} onChange={e => update('property', 'skylightCount', parseInt(e.target.value))} />
                    </div>
                )}
            </div>

            <div className="form-group-row">
                <label className="toggle-label">
                    <span>Do you have glass doors?</span>
                    <input type="checkbox" checked={data.hasGlassDoors} onChange={() => toggle('hasGlassDoors')} />
                </label>
                {data.hasGlassDoors && (
                    <div className="sub-input display-flex">
                        <span>How many?</span>
                        <input type="number" min="1" max="10" value={data.glassDoorCount} onChange={e => update('property', 'glassDoorCount', parseInt(e.target.value))} />
                    </div>
                )}
            </div>

            <div className="form-group-row">
                <label className="toggle-label">
                    <span>Hard to access windows?</span>
                    <input type="checkbox" checked={data.isHardAccess} onChange={() => toggle('isHardAccess')} />
                </label>
                {data.isHardAccess && (
                    <textarea
                        placeholder="Describe access challenges (e.g. steep hill, over roof)"
                        value={data.hardAccessDetails}
                        onChange={e => update('property', 'hardAccessDetails', e.target.value)}
                    />
                )}
            </div>

            <div className="action-row">
                <button className="btn btn-outline" onClick={back}>← Back</button>
                <button className="btn btn-primary" onClick={next}>Next: Services →</button>
            </div>
        </div>
    );
};

const Step3Services = ({ data, update, estimate, next, back }) => {
    const toggleService = (id) => {
        const current = data.additionalServices;
        const newServices = current.includes(id)
            ? current.filter(s => s !== id)
            : [...current, id];
        update('services', 'additionalServices', newServices);
    };

    return (
        <div className="step-content fade-in">
            <h3>Select Services</h3>

            <div className="form-group-row">
                <label>Window Cleaning Type</label>
                <div className="card-grid">
                    {[
                        { id: 'exterior', label: 'Exterior Only' },
                        { id: 'interior', label: 'Interior Only' },
                        { id: 'both', label: 'Both In & Out' }
                    ].map(opt => (
                        <button
                            key={opt.id}
                            className={`select-card ${data.windowCleaningType === opt.id ? 'selected' : ''}`}
                            onClick={() => update('services', 'windowCleaningType', opt.id)}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group-row">
                <label>Add-On Services</label>
                <div className="card-grid services-grid">
                    {[
                        { id: 'eaves_gutter', label: 'Eaves & Gutters' },
                        { id: 'pressure_washing', label: 'Pressure Washing' },
                        { id: 'deck_sanding', label: 'Deck Sanding' },
                        { id: 'hard_water', label: 'Hard Water Removal' }
                    ].map(opt => (
                        <button
                            key={opt.id}
                            className={`select-card service-card ${data.additionalServices.includes(opt.id) ? 'selected' : ''}`}
                            onClick={() => toggleService(opt.id)}
                        >
                            <span className="checkbox-mock">{data.additionalServices.includes(opt.id) ? '✓' : ''}</span>
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group-row">
                <label>Frequency (Save up to 20%)</label>
                <select value={data.frequency} onChange={e => update('services', 'frequency', e.target.value)}>
                    <option value="one_time">One-Time (Standard Rate)</option>
                    <option value="seasonal">Seasonal - 2x/year (10% Off)</option>
                    <option value="quarterly">Quarterly - 4x/year (15% Off)</option>
                    <option value="monthly">Monthly (20% Off)</option>
                </select>
            </div>

            <div className="live-estimate-bar">
                <span>Estimated Range:</span>
                <span className="price-tag">${estimate.low} – ${estimate.high}</span>
            </div>

            <div className="action-row">
                <button className="btn btn-outline" onClick={back}>← Back</button>
                <button className="btn btn-primary" onClick={next}>Review Quote →</button>
            </div>
        </div>
    );
};

const Step4Review = ({ formData, update, estimate, submit, back, isSubmitting, setStep }) => {
    return (
        <div className="step-content fade-in">
            <h3>Review & Submit</h3>

            <div className="review-card">
                <div className="review-section">
                    <div className="review-header">
                        <h4>Contact</h4>
                        <button onClick={() => setStep(1)} className="link-btn">Edit</button>
                    </div>
                    <p>{formData.contact.name}</p>
                    <p>{formData.contact.email} • {formData.contact.phone}</p>
                    <p>{formData.contact.address}, {formData.contact.city}</p>
                </div>
                <div className="divider"></div>

                <div className="review-section">
                    <div className="review-header">
                        <h4>Property</h4>
                        <button onClick={() => setStep(2)} className="link-btn">Edit</button>
                    </div>
                    <p>{formData.property.type} • {formData.property.storeys}</p>
                    <p>{formData.property.windowCountRange} Windows</p>
                    {formData.property.hasSkylights && <p>{formData.property.skylightCount} Skylights</p>}
                </div>
                <div className="divider"></div>

                <div className="review-section">
                    <div className="review-header">
                        <h4>Services</h4>
                        <button onClick={() => setStep(3)} className="link-btn">Edit</button>
                    </div>
                    <p><strong>{formData.services.windowCleaningType === 'both' ? 'Interior & Exterior' : formData.services.windowCleaningType + ' Only'} Cleaning</strong></p>
                    {formData.services.additionalServices.length > 0 && (
                        <p className="extras">
                            + {formData.services.additionalServices.map(s => s.replace('_', ' ')).join(', ')}
                        </p>
                    )}
                    <p>Frequency: {formData.services.frequency.replace('_', ' ')}</p>
                </div>

                <div className="total-estimate-large">
                    <span>Estimated Total</span>
                    <span className="price-range">${estimate.low} – ${estimate.high}</span>
                </div>
                <p className="disclaimer-text">
                    *Final pricing confirmed after assessment.
                </p>
            </div>

            <div className="form-group-row checkbox-row">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={formData.services.wantsPromotions}
                        onChange={() => update('services', 'wantsPromotions', !formData.services.wantsPromotions)}
                    />
                    I'd like to receive seasonal tips and promotions
                </label>
            </div>

            <div className="action-row">
                <button className="btn btn-outline" onClick={back} disabled={isSubmitting}>← Back</button>
                <button className="btn btn-cta" onClick={submit} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Request My Free Estimate'}
                </button>
            </div>
        </div>
    );
};
