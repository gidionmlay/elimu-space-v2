# Hero Section Documentation

## Overview
The HomeHero component has been completely rebuilt to match a modern, Coursera-style professional hero section design. This implementation focuses on conversion optimization while maintaining Elimu Space's brand identity.

## Design Features

### Layout
- **Two-column responsive layout**: Text content on left, image on right
- **Mobile-first design**: Stacks vertically on mobile devices
- **Clean white space**: Professional spacing and balanced alignment
- **Background**: Soft light blue gradient (`bg-[#F7FBFF]`)

### Content Structure

#### Left Column (Text Content)
1. **Subtitle**: "Start your favourite course"
   - Style: `text-sm text-gray-600 font-medium`

2. **Main Headline**: "Now learning from anywhere, and build your bright career."
   - Style: `text-4xl md:text-5xl font-bold leading-tight text-[#0f172a]`
   - Highlight: "bright career." in `text-green-500`

3. **Supporting Text**: "It has survived not only five centuries but also the leap into electronic typesetting."
   - Style: `text-gray-600 text-lg max-w-md`

4. **CTA Button**: "Start A Course"
   - Style: `bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md`
   - Navigation: Links to `/courses`
   - Hover effects: Scale and shadow transitions

5. **Stats Section**:
   - **1,235 learners**: FontAwesome `faUsers` icon in green circle
   - **4.8 rating**: FontAwesome `faStar` icon in yellow circle
   - Layout: Horizontal with centered icons and text

#### Right Column (Image & Decorations)
1. **Main Image**: Hero placeholder image
   - Path: `/src/assets/hero/hero-placeholder.png`
   - Style: `max-w-xs md:max-w-md rounded-lg object-cover shadow-lg`
   - Fallback: Gradient placeholder with icon if image fails to load

2. **Decorative Elements**: Placeholder divs for future SVG additions
   - Top-left: Gray circle
   - Bottom-right: Gray circle
   - Top-right: Orange circle
   - Bottom-left: Green circle

## Brand Colors Used

### Primary Colors
- **Background**: `#F7FBFF` (soft light blue)
- **Text**: `#0f172a` (dark navy for readability)
- **Accent Green**: `#22c55e` (green-500)

### Secondary Colors
- **Gray Text**: `text-gray-600` for supporting text
- **Green Background**: `bg-green-100` for stat icons
- **Yellow Background**: `bg-yellow-100` for rating icon

## Responsive Design

### Desktop (md: and above)
- Two-column layout with equal width (`md:w-1/2`)
- Horizontal stats layout
- Larger text sizes (`text-5xl` for headline)

### Mobile (below md:)
- Single column layout (`flex-col`)
- Stacked content with proper spacing
- Smaller text sizes (`text-4xl` for headline)
- Centered alignment for mobile optimization

## Technical Implementation

### Dependencies
- React Router for navigation
- FontAwesome icons (`faUsers`, `faStar`)
- Tailwind CSS for styling

### Key Features
- **Error Handling**: Automatic fallback for missing images
- **Accessibility**: Proper alt text and focus states
- **Performance**: Optimized hover effects and transitions
- **SEO**: Semantic HTML structure with proper heading hierarchy

## File Structure
```
src/
├── components/
│   └── HomeHero.tsx (main component)
└── assets/
    └── hero/
        ├── hero-placeholder.png (main image)
        └── HERO_SECTION_DOCUMENTATION.md (this file)
```

## Future Enhancements
1. Replace placeholder divs with actual SVG decorations
2. Add hero image with proper student/laptop content
3. Consider adding animation effects with Framer Motion
4. Implement A/B testing for CTA button variations
5. Add analytics tracking for conversion metrics

## Testing Checklist
- [x] Responsive design on mobile devices
- [x] CTA button navigation to /courses
- [x] FontAwesome icons display correctly
- [x] Image fallback works when placeholder missing
- [x] Hover effects function properly
- [x] Color contrast meets accessibility standards
- [x] Typography hierarchy is clear and readable
