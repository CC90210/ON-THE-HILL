/**
 * Calculate estimate based on property and service details.
 * 
 * @param {Object} data - The complete form state.
 * @returns {Object} - { low: number, high: number, breakdown: Object }
 */
export const calculateEstimate = (data) => {
    if (!data.property || !data.services) return { low: 0, high: 0 };

    const {
        windowCountRange,
        storeys,
        size,
        isHardAccess,
        skylightCount,
        glassDoorCount
    } = data.property;

    const {
        windowCleaningType,
        additionalServices,
        frequency
    } = data.services;

    // 1. Get window count midpoint
    let windowCount = 0;
    if (windowCountRange === '5-10') windowCount = 8;
    else if (windowCountRange === '11-20') windowCount = 16;
    else if (windowCountRange === '21-30') windowCount = 26;
    else if (windowCountRange === '31-40') windowCount = 36;
    else if (windowCountRange === '41-50') windowCount = 46;
    else if (windowCountRange === '50+') windowCount = 60; // Estimate
    else windowCount = 20; // Fallback

    // 2. Base Rates
    let lowRate = 0, highRate = 0;
    if (windowCleaningType === 'exterior') { lowRate = 6; highRate = 10; }
    else if (windowCleaningType === 'interior') { lowRate = 5; highRate = 8; }
    else if (windowCleaningType === 'both') { lowRate = 10; highRate = 15; }

    let baseLow = windowCount * lowRate;
    let baseHigh = windowCount * highRate;

    // 3. Storey Multiplier
    let storeyMult = 1.0;
    if (storeys.includes('2')) storeyMult = 1.15;
    if (storeys.includes('2.5') || storeys.includes('3')) storeyMult = 1.35;

    baseLow *= storeyMult;
    baseHigh *= storeyMult;

    // 4. Hard Access
    if (isHardAccess) {
        baseLow *= 1.2;
        baseHigh *= 1.2;
    }

    // 5. Skylights & Doors
    const skylightLow = (skylightCount || 0) * 15;
    const skylightHigh = (skylightCount || 0) * 30;

    const doorLow = (glassDoorCount || 0) * 10;
    const doorHigh = (glassDoorCount || 0) * 20;

    // 6. Hard Water Stain (if selected)
    let hardWaterLow = 0, hardWaterHigh = 0;
    if (additionalServices.includes('hard_water')) {
        const affected = Math.ceil(windowCount * 0.25);
        hardWaterLow = affected * 15;
        hardWaterHigh = affected * 30;
    }

    // 7. Eaves & Gutter
    let eavesLow = 0, eavesHigh = 0;
    if (additionalServices.includes('eaves_gutter')) {
        // Logic based on storeys (simplified mapping)
        if (storeys === '1 Storey') { eavesLow = 100; eavesHigh = 175; }
        else if (storeys === '1.5 Storey') { eavesLow = 125; eavesHigh = 200; }
        else if (storeys.includes('2') && !storeys.includes('2.5')) { eavesLow = 150; eavesHigh = 250; }
        else { eavesLow = 200; eavesHigh = 350; } // 2.5+
    }

    // 8. Pressure Washing
    let pressureLow = 0, pressureHigh = 0;
    // Size-based logic needed, usually string '1,500-2,500 sq ft'
    if (additionalServices.includes('pressure_washing')) {
        if (size.includes('Under')) { pressureLow = 150; pressureHigh = 250; }
        else if (size.includes('1,500')) { pressureLow = 200; pressureHigh = 325; }
        else if (size.includes('2,500')) { pressureLow = 275; pressureHigh = 400; }
        else { pressureLow = 350; pressureHigh = 500; }
    }

    // 9. Deck Sanding
    let deckLow = 0, deckHigh = 0;
    if (additionalServices.includes('deck_sanding')) {
        if (size.includes('Under')) { deckLow = 200; deckHigh = 350; }
        else if (size.includes('1,500')) { deckLow = 250; deckHigh = 400; }
        else if (size.includes('2,500')) { deckLow = 300; deckHigh = 450; }
        else { deckLow = 400; deckHigh = 600; }
    }

    // Sum totals
    let totalLow = baseLow + skylightLow + doorLow + hardWaterLow + eavesLow + pressureLow + deckLow;
    let totalHigh = baseHigh + skylightHigh + doorHigh + hardWaterHigh + eavesHigh + pressureHigh + deckHigh;

    // 10. Property Size Multiplier (4000+)
    if (size.includes('4,000')) {
        totalLow *= 1.1;
        totalHigh *= 1.1;
    }

    // 11. Property Type (Cottage)
    if (data.property.type === 'cottage') {
        totalLow *= 1.05;
        totalHigh *= 1.05;
    }

    // 12. Frequency Discount
    let discount = 0;
    if (frequency === 'seasonal') discount = 0.10;
    if (frequency === 'quarterly') discount = 0.15;
    if (frequency === 'monthly') discount = 0.20;

    totalLow = totalLow * (1 - discount);
    totalHigh = totalHigh * (1 - discount);

    // 13. Minimum
    if (totalLow < 150) totalLow = 150;
    if (totalHigh < 150) totalHigh = 150; // High should arguably be higher

    // 14. Rounding
    const round5 = (n) => Math.ceil(n / 5) * 5;

    return {
        low: round5(totalLow),
        high: round5(totalHigh)
    };
};
