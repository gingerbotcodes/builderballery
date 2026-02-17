# Builder Ballery - Award-Winning Civil Engineering Website

A modern, award-winning website for Instagram influencer Builder Ballery, featuring a polished professional interface with sophisticated design elements.

## Features

### Design System
- **Sophisticated Color Palette**: CSS variables for consistent theming with primary green tones
- **Depth & Visual Hierarchy**: Subtle gradients, shadows, and glass-morphism effects
- **Micro-interactions**: Smooth hover states, animations, and transitions using Framer Motion
- **Typography Scale**: Distinctive hierarchy with proper font weights and spacing
- **Visual Rhythm**: Meaningful whitespace and consistent spacing system
- **Background Patterns**: Subtle grid, dots, and gradient overlays
- **Border Radius System**: Consistent rounded corners throughout

### Sections
1. **Hero Section**: Visually striking with animated elements, featured reel widget, and trust indicators
2. **Stats Section**: Animated statistics with trend indicators
3. **Instagram Feed**: Filterable grid with reels and posts, hover effects, and engagement metrics
4. **About Section**: Professional bio with feature cards and stats
5. **CTA Section**: Compelling call-to-action with gradient background
6. **Footer**: Comprehensive links and social integration

### Technical Features
- **Next.js 14**: App Router with React 18
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Framer Motion**: Smooth animations and transitions
- **Mobile-First**: Fully responsive design
- **SEO Optimized**: Meta tags, Open Graph, and Twitter cards
- **Performance**: Optimized images with Next.js Image component

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env.local` file for any API keys:

```env
# Apify API Token (for Instagram scraping)
APIFY_API_TOKEN=your_token_here
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Manual Build

```bash
npm run build
npm start
```

## Project Structure

```
builder-ballery/
|-- app/
|   |-- globals.css      # Global styles & design system
|   |-- layout.tsx       # Root layout with metadata
|   |-- page.tsx         # Main page with all sections
|-- public/              # Static assets
|-- package.json         # Dependencies
|-- tailwind.config.ts   # Tailwind configuration
|-- tsconfig.json        # TypeScript configuration
|-- next.config.js       # Next.js configuration
```

## Customization

### Colors
Edit CSS variables in `app/globals.css`:

```css
:root {
  --color-primary-500: #22c55e;
  /* ... other colors */
}
```

### Typography
Modify font families and sizes in the `:root` section.

### Animations
Customize animation variants in `app/page.tsx`:

```typescript
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}
```

## Instagram Integration

The website is prepared for Apify MCP integration to dynamically scrape Instagram content. To enable:

1. Set up Apify account
2. Configure Instagram scraper actor
3. Add API token to environment
4. Update the `fetchData` function in `page.tsx`

## Performance Optimizations

- Static generation for fast page loads
- Image optimization with Next.js Image
- CSS-in-JS with Tailwind for minimal bundle size
- Lazy loading for images and components
- Smooth scroll behavior

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

MIT License - feel free to use for personal or commercial projects.

## Credits

- Design & Development: Built with modern web technologies
- Images: Unsplash (placeholder images)
- Icons: Lucide React
- Animations: Framer Motion

---

Built with passion for the construction and engineering community.