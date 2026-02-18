# ON THE HILL WINDOW CLEANING - Implementation Plan

## Project Overview
- **Name**: On The Hill Window Cleaning Website
- **Stack**: React + Vite + Vanilla CSS
- **Design**: Clean, premium, component-based structure
- **Key Feature**: Multi-step Quote Estimator with real-time pricing and webhook submission

## Directory Structure
```
src/
  assets/          # Images (generated)
  components/      # Reusable components
    Header.jsx
    Hero.jsx
    Services.jsx
    Portfolio.jsx
    About.jsx
    Testimonials.jsx
    QuoteEstimator/
      Wizard.jsx
      Step1Contact.jsx
      Step2Property.jsx
      Step3Service.jsx
      Step4Review.jsx
      Result.jsx
    Footer.jsx
  data/            # Static data (services, portfolio images, pricing logic)
  styles/          # CSS Modules or global styles
    Global.css
    Variables.css
    App.css
  App.jsx          # Main layout and scroll logic
  main.jsx         # Entry point
```

## Step 1: Foundation & Global Styles
- Set up CSS variables for colors (Deep Navy, Clean White, Sky Blue, Warm Grey, Dark Charcoal, Vibrant Green).
- Set up typography (Inter/Satoshi from Google Fonts).
- Reset CSS and base styles.

## Step 2: Core Components Implementation
1.  **Header**: Sticky nav, responsive hamburger menu.
2.  **Hero**: Full-screen background image (generated), large H1, CTAs.
3.  **Services**: Grid layout with cards, hover effects.
4.  **Portfolio**: Image grid with lightbox/modal (simple implementation).
5.  **About**: Text + Image layout.
6.  **Testimonials**: Simple carousel or grid.
7.  **Footer**: Contact info, social links, copyright.

## Step 3: Quote Estimator (Complex Logic)
- **State Management**: React `useState` / `useReducer` to hold form data across steps.
- **Pricing Logic**: Implement the provided pricing formula in `src/utils/pricing.js`.
- **Steps**:
    - **Step 1**: Contact Info (validation required).
    - **Step 2**: Property Details (buttons/cards selection).
    - **Step 3**: Service Selection (real-time estimate constraint).
    - **Step 4**: Review & Submit (POST to webhook).
- **Webhook Integration**: `fetch` POST to placeholder/mock webhook URL.

## Step 4: Assets Generation
- Generate key images using `generate_image`:
    - Hero Image (Modern black A-frame cottage).
    - About Image (Technician on ladder).
    - Gallery Images (3-4 representative shots: Glass doors, Heritage home, Interior view).
- Use generated images in components.

## Step 5: Integration & Polish
- Assemble all components in `App.jsx`.
- Implement smooth scrolling for navigation links.
- Ensure responsive design (mobile-first).
- Add SEO meta tags (Helmet or static HTML edits).
- Verify performance and accessibility.
