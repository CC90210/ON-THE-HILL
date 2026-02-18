import React, { useState, useEffect } from 'react';
import './QuoteEstimator.css';
import { calculateEstimate } from '../../utils/pricing';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function QuoteWizard() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        contact: { name: '', email: '', phone: '', method: 'email', city: 'Collingwood', address: '' },
        property: { type: 'Residential', storeys: '2 Storey', windows: '21-30', skylights: 0, doors: 0, hardAccess: false },
        services: { windowType: 'both', extras: [], frequency: 'seasonal' }
    });

    const [estimate, setEstimate] = useState({ low: 0, high: 0 });

    useEffect(() => {
        // Map internal formData names to pricing util expectations
        const mapping = {
            property: {
                windowCountRange: formData.property.windows,
                storeys: formData.property.storeys,
                size: '1,500–2,500 sq ft', // Default for now
                isHardAccess: formData.property.hardAccess,
                skylightCount: formData.property.skylights,
                glassDoorCount: formData.property.doors,
                type: formData.property.type.toLowerCase()
            },
            services: {
                windowCleaningType: formData.services.windowType,
                additionalServices: formData.services.extras,
                frequency: formData.services.frequency
            }
        };
        setEstimate(calculateEstimate(mapping));
    }, [formData]);

    const updateSection = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    };

    const next = () => {
        setStep(s => s + 1);
        const id = step === 4 ? 'root' : 'estimate'; // Scroll to top if finished or back to widget
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };

    const back = () => setStep(s => s - 1);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsSuccess(true);
        setIsSubmitting(false);
    };

    if (isSuccess) {
        return (
            <div className="wizard-container text-center">
                <div className="success-anim">
                    <CheckCircle2 color="var(--color-cta)" size={80} strokeWidth={1} />
                </div>
                <div className="wizard-title">
                    <h2>Estimate Requested!</h2>
                    <p>We've received your details. Here is your preliminary range:</p>
                </div>
                <div className="estimate-value large" style={{ margin: '2rem 0', fontSize: '4rem' }}>
                    ${estimate.low} – ${estimate.high}
                </div>
                <p style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
                    Cameron will review your property details and reach out within 24 hours to finalize your quote.
                </p>
                <button onClick={() => window.location.reload()} className="btn-wizard btn-next">
                    Start New Request
                </button>
            </div>
        );
    }

    return (
        <div className="wizard-container" id="estimate">
            <div className="wizard-header">
                <div className="wizard-title">
                    <h2>Professional Estimate</h2>
                    <p>Step {step} of 4: {['Contact Info', 'Property Details', 'Select Services', 'Review & Confirm'][step - 1]}</p>
                </div>
                <div className="progress-container">
                    <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="step-content">
                {step === 1 && <Step1 data={formData.contact} update={(f, v) => updateSection('contact', f, v)} onNext={next} />}
                {step === 2 && <Step2 data={formData.property} update={(f, v) => updateSection('property', f, v)} onNext={next} onBack={back} />}
                {step === 3 && <Step3 data={formData.services} estimate={estimate} update={(f, v) => updateSection('services', f, v)} onNext={next} onBack={back} />}
                {step === 4 && <Review data={formData} estimate={estimate} setStep={setStep} onBack={back} onSubmit={handleSubmit} loading={isSubmitting} />}
            </div>
        </div>
    );
}

// Sub-Steps
const Step1 = ({ data, update, onNext }) => {
    const isValid = data.name && data.email && data.phone;
    return (
        <div className="form-grid">
            <div className="form-full">
                <label className="step-label">Owner Information</label>
                <input className="input-field" placeholder="Full Name" value={data.name} onChange={e => update('name', e.target.value)} />
            </div>
            <input className="input-field" placeholder="Email Address" type="email" value={data.email} onChange={e => update('email', e.target.value)} />
            <input className="input-field" placeholder="Phone Number" type="tel" value={data.phone} onChange={e => update('phone', e.target.value)} />
            <div className="form-full">
                <label className="step-label">Service Location</label>
                <input className="input-field" placeholder="Street Address" value={data.address} onChange={e => update('address', e.target.value)} />
            </div>
            <select className="input-field" value={data.city} onChange={e => update('city', e.target.value)}>
                {['Collingwood', 'Wasaga Beach', 'Blue Mountain', 'Duntroon', 'Clearview', 'Stayner', 'Creemore', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="btn-group form-full">
                <button className="btn-wizard btn-next" onClick={onNext} disabled={!isValid}>
                    Service Details <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

const Step2 = ({ data, update, onNext, onBack }) => {
    return (
        <div className="step-inner">
            <label className="step-label">Property Type</label>
            <div className="card-grid" style={{ marginBottom: '2.5rem' }}>
                {['Residential', 'Cottage', 'Commercial'].map(t => (
                    <div key={t} className={`option-card ${data.type === t ? 'active' : ''}`} onClick={() => update('type', t)}>{t}</div>
                ))}
            </div>

            <label className="step-label">Approximate Number of Windows</label>
            <div className="card-grid" style={{ marginBottom: '2.5rem' }}>
                {['5-10', '11-20', '21-30', '31-40', '41-50', '50+'].map(w => (
                    <div key={w} className={`option-card ${data.windows === w ? 'active' : ''}`} onClick={() => update('windows', w)}>{w}</div>
                ))}
            </div>

            <div className="form-grid">
                <div className="flex-col">
                    <label className="step-label">Skylights</label>
                    <input className="input-field" type="number" min="0" value={data.skylights} onChange={e => update('skylights', parseInt(e.target.value) || 0)} />
                </div>
                <div className="flex-col">
                    <label className="step-label">Glass Doors</label>
                    <input className="input-field" type="number" min="0" value={data.doors} onChange={e => update('doors', parseInt(e.target.value) || 0)} />
                </div>
            </div>

            <div className="btn-group">
                <button className="btn-wizard btn-prev" onClick={onBack}><ChevronLeft size={18} /> Back</button>
                <button className="btn-wizard btn-next" onClick={onNext}>Select Services <ChevronRight size={18} /></button>
            </div>
        </div>
    );
};

const Step3 = ({ data, update, estimate, onNext, onBack }) => {
    const toggleExtra = (id) => {
        const extras = data.extras.includes(id) ? data.extras.filter(x => x !== id) : [...data.extras, id];
        update('extras', extras);
    };

    return (
        <div className="step-inner">
            <label className="step-label">Service Type</label>
            <div className="card-grid" style={{ marginBottom: '2.5rem' }}>
                {[
                    { id: 'exterior', l: 'Exterior' },
                    { id: 'interior', l: 'Interior' },
                    { id: 'both', l: 'Full Detail' }
                ].map(opt => (
                    <div key={opt.id} className={`option-card ${data.windowType === opt.id ? 'active' : ''}`} onClick={() => update('windowType', opt.id)}>
                        {opt.l}
                    </div>
                ))}
            </div>

            <label className="step-label">Additional Services</label>
            <div className="card-grid" style={{ marginBottom: '2.5rem' }}>
                {[
                    { id: 'eaves_gutter', l: 'Eaves Cleaning' },
                    { id: 'pressure_washing', l: 'Pressure Wash' },
                    { id: 'deck_sanding', l: 'Deck Sanding' },
                    { id: 'hard_water', l: 'Water Spot Removal' }
                ].map(opt => (
                    <div key={opt.id} className={`option-card ${data.extras.includes(opt.id) ? 'active' : ''}`} onClick={() => toggleExtra(opt.id)}>
                        {opt.l}
                    </div>
                ))}
            </div>

            <div className="live-estimate-card">
                <div>
                    <span style={{ opacity: 0.7, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Estimate</span>
                    <div className="estimate-value">${estimate.low} – ${estimate.high}</div>
                </div>
                <div style={{ opacity: 0.6, fontSize: '0.8rem', maxWidth: '180px', textAlign: 'right' }}>
                    *Final price subject to on-site assessment.
                </div>
            </div>

            <div className="btn-group">
                <button className="btn-wizard btn-prev" onClick={onBack}><ChevronLeft size={18} /> Back</button>
                <button className="btn-wizard btn-next" onClick={onNext}>Review Request <ChevronRight size={18} /></button>
            </div>
        </div>
    );
};

const Review = ({ data, estimate, setStep, onBack, onSubmit, loading }) => {
    return (
        <div className="step-inner">
            <div className="review-box" style={{ background: '#F8FAFC', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                    <h4 style={{ margin: 0 }}>Project Summary</h4>
                    <button className="link-btn" onClick={() => setStep(1)} style={{ color: 'var(--color-accent)', fontWeight: 700, background: 'none', border: 'none' }}>Edit</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                        <p style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>{data.contact.name}</p>
                        <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>{data.contact.address}, {data.contact.city}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>{data.property.windows} Windows</p>
                        <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>{data.services.windowType.toUpperCase()} CLEANING</p>
                    </div>
                </div>
                <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #E2E8F0' }} />
                <div className="flex-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>Estimated Range</span>
                    <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-cta)' }}>${estimate.low} – ${estimate.high}</span>
                </div>
            </div>

            <div className="btn-group">
                <button className="btn-wizard btn-prev" onClick={onBack} disabled={loading}><ChevronLeft size={18} /> Back</button>
                <button className="btn-wizard btn-next btn-submit" onClick={onSubmit} disabled={loading}>
                    {loading ? 'Processing...' : 'Submit Request'}
                </button>
            </div>
        </div>
    );
};
