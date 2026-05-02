---
name: Modern Retail & Repair
colors:
  surface: '#fcf8fb'
  surface-dim: '#dcd9dc'
  surface-bright: '#fcf8fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#414754'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#717786'
  outline-variant: '#c0c6d6'
  surface-tint: '#005db8'
  primary: '#005ab3'
  on-primary: '#ffffff'
  primary-container: '#0073e0'
  on-primary-container: '#fefcff'
  inverse-primary: '#aac7ff'
  secondary: '#006e28'
  on-secondary: '#ffffff'
  secondary-container: '#6ffb85'
  on-secondary-container: '#00732a'
  tertiary: '#845000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a66600'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aac7ff'
  on-primary-fixed: '#001b3e'
  on-primary-fixed-variant: '#00468d'
  secondary-fixed: '#72fe88'
  secondary-fixed-dim: '#53e16f'
  on-secondary-fixed: '#002107'
  on-secondary-fixed-variant: '#00531c'
  tertiary-fixed: '#ffddbb'
  tertiary-fixed-dim: '#ffb868'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#673d00'
  background: '#fcf8fb'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 80px
---

## Brand & Style
The design system is rooted in the **Corporate / Modern** aesthetic, specifically tailored for the premium mobile retail and repair market in Vietnam. It draws inspiration from Apple’s "white space" philosophy and Samsung’s sleek, high-tech interface language. 

The brand personality is **Trustworthy, Professional, and Precise**. It aims to reassure customers that their high-value devices are in expert hands. The visual language uses a light-first approach to emphasize cleanliness, utilizing high-quality product photography and generous breathing room to elevate the shopping and service experience.

## Colors
The palette is centered around **Electric Blue**, signaling technological expertise and modernity. This is paired with a clean **Apple-style White** and a soft gray background to prevent eye strain.

- **Primary Blue (#0A84FF):** Used for primary actions (CTA), links, and branding elements.
- **Accent Green (#34C759):** Reserved strictly for "Trust" indicators—warranty badges, "In Stock" status, and successful repair confirmations.
- **Secondary Orange (#FF9F0A):** Used sparingly for "Sale" tags or urgent repair alerts.
- **Neutral Black (#1D1D1F):** Used for primary text to ensure maximum legibility against white backgrounds.

## Typography
This design system utilizes **Inter** for its exceptional clarity on high-resolution mobile screens and its neutral, technical character. 

Hierarchy is established through weight rather than just size. Headlines should feel "tight" with slight negative letter spacing to mimic premium editorial styles. For the Vietnamese language, special care is taken to ensure line heights (leading) are generous enough to accommodate tone marks without clipping or visual clutter.

## Layout & Spacing
The layout follows a **Fixed Grid** system for desktop (12 columns) and a fluid 2-column grid for mobile devices. 

A 8px base unit drives all spacing decisions. Large sections are separated by significant vertical gaps (80px+) to create a "gallery" feel, allowing products and service features to stand out individually. Content containers use a maximum width of 1200px to ensure comfortable scanning on ultra-wide monitors.

## Elevation & Depth
Depth is achieved through **Ambient Shadows** and **Tonal Layers** rather than heavy borders. 

Cards sit on a very light gray background (#F5F5F7) and use a pure white surface (#FFFFFF). To create a sense of lifting, a multi-layered shadow is used: a broad, very low-opacity blur (10%) combined with a tighter, slightly more opaque "sharp" shadow. This makes elements feel like they are physically resting just above the surface, similar to modern OS interfaces.

## Shapes
The shape language is defined by **large, friendly radii**. Product cards and primary containers must use a minimum of **16px (1rem)** corner radius. 

Smaller elements like buttons follow a "semi-pill" look (8px-12px), while search bars and badges use full pill shapes. This consistent use of rounding softens the technical nature of mobile repairs and makes the brand feel more approachable and modern.

## Components
- **Product Cards:** Feature a clean white background, 16px radius, and a subtle "0.5px" inner stroke in light gray to define edges against white backgrounds.
- **Action Buttons:** Primary buttons use the #0A84FF blue with white text. Hover states should slightly darken the blue. Repair "Book Now" buttons may use the green accent for high conversion.
- **Status Chips:** Small, pill-shaped badges for "Mới" (New), "Trả góp 0%" (Installment), or "Bảo hành 12th" (12m Warranty).
- **Service Icons:** Linear, 2pt stroke weight icons in the primary blue.
- **Repair Progress Tracker:** A vertical or horizontal stepper component using the green accent to indicate completed stages of a phone repair.
- **Input Fields:** Minimalist design with a focus on the active state—when focused, the border transitions to the primary blue with a soft outer glow.