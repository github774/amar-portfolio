# Amar Portfolio Design Philosophy

## Design Direction: **Neon Minimalism**

### Design Movement
Cyberpunk-influenced minimalism with glassmorphism. Inspired by tech founder portfolios and modern dev communities. Think: dark academia meets tech startup culture.

### Core Principles
1. **Deep Darkness**: Navy/black backgrounds create focus and make neon accents pop
2. **Glassmorphism**: Frosted glass cards with subtle blur and transparency for depth
3. **Neon Accents**: Purple/cyan gradients as the signature brand colors
4. **Intentional Whitespace**: Breathing room between sections, never cluttered

### Color Philosophy
- **Primary Background**: Deep navy (`#0a0e27`) — dark enough for eye comfort, sophisticated
- **Card Background**: Slightly lighter navy with transparency (`rgba(15, 23, 47, 0.5)`)
- **Neon Purple**: `#a855f7` — primary accent, energetic and youthful
- **Neon Cyan**: `#06b6d4` — secondary accent, creates gradient with purple
- **Text**: Off-white (`#f1f5f9`) for high contrast and readability
- **Emotional Intent**: Cutting-edge, technical, ambitious, youthful energy

### Layout Paradigm
- **Hero**: Full-screen with animated particle grid background
- **Sections**: Asymmetric card layouts with staggered animations
- **Timeline**: Vertical hackathon timeline with glowing cards
- **Projects**: Filterable gallery with smooth transitions
- **Navigation**: Minimal sticky header with smooth scroll behavior

### Signature Elements
1. **Glowing Cards**: Subtle box-shadow with neon glow on hover
2. **Animated Particles**: Background grid that responds to scroll
3. **Gradient Accents**: Purple-to-cyan gradients on badges and CTAs

### Interaction Philosophy
- Smooth scroll animations reveal content progressively
- Cards scale and glow on hover
- Filter transitions are fluid and instant
- All interactions respect `prefers-reduced-motion`

### Animation Guidelines
- Entrance animations: 300-400ms ease-out
- Hover states: 150-200ms transitions
- Scroll-triggered reveals: Staggered 30-50ms per item
- Particle animation: Continuous, subtle, non-distracting

### Typography System
- **Display**: Geist (bold, 3xl-4xl) for headings
- **Body**: Inter (regular/medium, base-lg) for content
- **Accent**: Geist (medium) for badges and labels
- **Hierarchy**: Clear weight differentiation, generous line-height

### Brand Essence
**Positioning**: "A high schooler building AI systems and shipping real products at scale — think technical founder energy, not resume."

**Personality**: Ambitious, Technical, Youthful

### Brand Voice
- Headlines: Direct, energetic, no fluff
- CTAs: Action-oriented ("Explore," "Build," "Connect")
- Microcopy: Conversational but technical
- **Example lines**:
  - "High schooler building AI systems, hackathons, and things that probably shouldn't exist yet."
  - "Always building. Reach out."

### Signature Brand Color
**Neon Purple** (`#a855f7`) — unmistakably Amar's brand. Used for primary CTAs, badges, and accent elements.

---

## Implementation Notes
- Use Framer Motion for all animations
- Tailwind 4 with OKLCH colors for consistency
- Dark mode only (no light theme toggle)
- Mobile-first responsive design
- Glassmorphism via `backdrop-blur` and semi-transparent backgrounds
