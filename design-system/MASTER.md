## Design System: mianmian-dad

### Pattern
- **Name:** Newsletter / Content First
- **Conversion Focus:**  typewriter effect
- **CTA Placement:** Hero inline form + Sticky header form
- **Color Strategy:** Minimalist. Paper-like background. Text focus. Accent color for Subscribe.
- **Sections:** 1. Hero (Value Prop + Form), 2. Recent Issues/Archives, 3. Social Proof (Subscriber count), 4. About Author

### Style
- **Name:** Swiss Modernism 2.0
- **Keywords:** Grid system, Helvetica, modular, asymmetric, international style, rational, clean, mathematical spacing
- **Best For:** Corporate sites, architecture, editorial, SaaS, museums, professional services, documentation
- **Performance:** 鈿?Excellent | **Accessibility:** 鉁?WCAG AAA

### Colors
| Role | Hex |
|------|-----|
| Primary | #18181B |
| Secondary | #3F3F46 |
| CTA | #2563EB |
| Background | #FAFAFA |
| Text | #09090B |

*Notes: Brand primary + artistic interpretation*

### Typography
- **Heading:** Caveat
- **Body:** Quicksand
- **Mood:** handwritten, personal, friendly, casual, warm, charming
- **Best For:** Personal blogs, invitations, creative portfolios, lifestyle brands
- **Google Fonts:** https://fonts.google.com/share?selection.family=Caveat:wght@400;500;600;700|Quicksand:wght@300;400;500;600;700
- **CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap');
```

### Key Effects
display: grid, grid-template-columns: repeat(12 1fr), gap: 1rem, mathematical ratios, clear hierarchy

### Avoid (Anti-patterns)
- Poor typography
- Slow loading

### Pre-Delivery Checklist
- [ ] No emojis as icons (use SVG: Heroicons/Lucide)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px

