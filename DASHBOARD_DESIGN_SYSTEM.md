
# Dashboard Design System Guide

## 🎨 Color Palette

### Primary Colors
```css
/* Emerald Green - Primary Actions */
--emerald-50: #f0fdf4
--emerald-100: #dcfce7
--emerald-500: #22c55e  /* Primary */
--emerald-600: #16a34a  /* Hover */
--emerald-700: #15803d

/* Blue - Secondary Actions */
--blue-500: #3b82f6
--blue-600: #2563eb
```

### Neutral Colors
```css
/* Backgrounds */
--gray-50: #f9fafb    /* Page background */
--gray-100: #f3f4f6   /* Hover states */
--white: #ffffff      /* Cards */

/* Text */
--gray-600: #4b5563   /* Body text */
--gray-700: #374151   /* Secondary text */
--gray-800: #1f2937   /* Headings */
--gray-900: #111827   /* Primary text */

/* Borders */
--gray-200: #e5e7eb   /* Card borders */
```

### Semantic Colors
```css
/* Status Colors */
--green-100: #dcfce7  /* Success background */
--green-600: #16a34a  /* Success text/icon */

--yellow-100: #fef3c7 /* Warning background */
--yellow-600: #ca8a04 /* Warning text/icon */

--red-100: #fee2e2    /* Error background */
--red-600: #dc2626    /* Error text/icon */

--blue-100: #dbeafe   /* Info background */
--blue-600: #2563eb   /* Info text/icon */

--purple-100: #f3e8ff /* Earnings background */
--purple-600: #9333ea /* Earnings text/icon */

--orange-100: #ffedd5 /* Streak background */
--orange-600: #ea580c /* Streak text/icon */
```

## 📏 Spacing Scale

```css
/* Tailwind Spacing Scale */
1 = 0.25rem = 4px
2 = 0.5rem = 8px
3 = 0.75rem = 12px
4 = 1rem = 16px
5 = 1.25rem = 20px
6 = 1.5rem = 24px
8 = 2rem = 32px
10 = 2.5rem = 40px
12 = 3rem = 48px
16 = 4rem = 64px
20 = 5rem = 80px
24 = 6rem = 96px
```

### Usage Guidelines
- **Component padding**: `p-4` or `p-6` (16px or 24px)
- **Section gaps**: `gap-6` (24px)
- **Grid gaps**: `gap-6` (24px)
- **Content spacing**: `space-y-6` (24px vertical)

## 🔤 Typography

### Font Families
```css
/* Default Sans-serif (Inter/System) */
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

### Text Sizes
```css
/* Headings */
text-2xl = 1.5rem = 24px   /* Page titles */
text-xl = 1.25rem = 20px   /* Section headings */
text-lg = 1.125rem = 18px  /* Card titles */

/* Body */
text-base = 1rem = 16px    /* Default body */
text-sm = 0.875rem = 14px  /* Labels, secondary */
text-xs = 0.75rem = 12px   /* Captions, metadata */

/* Stats */
text-3xl = 1.875rem = 30px /* Large numbers */
```

### Font Weights
```css
font-normal = 400    /* Body text */
font-medium = 500    /* Labels, nav items */
font-semibold = 600  /* Subheadings */
font-bold = 700      /* Headings, stats */
```

### Usage Examples
```tsx
// Page Title
<h1 className="text-2xl font-bold text-gray-900">

// Section Heading
<h2 className="text-xl font-semibold text-gray-800">

// Card Title
<h3 className="text-lg font-semibold text-gray-900">

// Body Text
<p className="text-gray-600">

// Label
<span className="text-sm font-medium text-gray-600">

// Large Stat
<p className="text-3xl font-bold text-gray-900">
```

## 📦 Component Patterns

### Stat Card
```tsx
<div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-600">Label</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">Value</p>
    </div>
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
      {/* Icon */}
    </div>
  </div>
</div>
```

### Gradient Feature Card
```tsx
<div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
  <div className="flex items-center gap-3 mb-3">
    {/* Icon */}
    <span className="font-medium">Label</span>
  </div>
  <p className="text-3xl font-bold">Value</p>
  <p className="text-sm text-blue-100 mt-2">Description</p>
</div>
```

### Tab Navigation
```tsx
<div className="border-b border-gray-200">
  <div className="flex gap-8 px-6">
    <button
      className={`py-4 px-2 font-medium border-b-2 transition-colors ${
        active
          ? 'border-emerald-500 text-emerald-600'
          : 'border-transparent text-gray-600 hover:text-gray-800'
      }`}
    >
      Tab Label
    </button>
  </div>
</div>
```

### Sidebar Navigation Item
```tsx
<Link
  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
    active
      ? 'bg-emerald-50 text-emerald-600 font-medium'
      : 'text-gray-700 hover:bg-gray-100'
  }`}
>
  <FontAwesomeIcon icon={icon} className="w-5 h-5" />
  <span>Label</span>
</Link>
```

### Primary Button
```tsx
<button className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all">
  Button Text
</button>
```

### Secondary Button
```tsx
<button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-all">
  Button Text
</button>
```

### Icon Button
```tsx
<button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all">
  <FontAwesomeIcon icon={icon} className="w-5 h-5" />
</button>
```

## 🎯 Interactive States

### Hover States
```css
/* Cards */
hover:shadow-lg transition-shadow

/* Buttons */
hover:bg-emerald-600 transition-all

/* Navigation */
hover:bg-gray-100

/* Links */
hover:text-gray-800
```

### Active States
```css
/* Navigation */
bg-emerald-50 text-emerald-600 font-medium

/* Tabs */
border-emerald-500 text-emerald-600
```

### Focus States
```css
/* Form Inputs */
focus:ring-2 focus:ring-emerald-500 focus:border-transparent

/* Buttons */
focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
```

## 📐 Layout Patterns

### Dashboard Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Stat cards */}
</div>
```

### Content Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Course/content cards */}
</div>
```

### Two-Column Layout
```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">
    {/* Main content */}
  </div>
  <div>
    {/* Sidebar content */}
  </div>
</div>
```

## 🎨 Icon Guidelines

### Size Standards
```css
/* Small icons (inline) */
w-4 h-4 = 16px

/* Standard icons */
w-5 h-5 = 20px

/* Large icons (feature) */
w-6 h-6 = 24px

/* Extra large (empty states) */
w-10 h-10 = 40px
w-16 h-16 = 64px
```

### Color Usage
```tsx
/* Primary action */
text-emerald-600

/* Information */
text-blue-600

/* Success */
text-green-600

/* Warning */
text-yellow-600

/* Error */
text-red-600

/* Neutral */
text-gray-600
```

## 🔄 Animation Guidelines

### Transitions
```css
/* Standard transition */
transition-all duration-300

/* Shadow transition */
transition-shadow

/* Color transition */
transition-colors
```

### Loading States
```tsx
<FontAwesomeIcon
  icon={faSpinner}
  className="w-12 h-12 text-emerald-500 animate-spin"
/>
```

## 📱 Responsive Breakpoints

### Tailwind Breakpoints
```css
/* Mobile first */
default: < 640px

/* Tablet */
sm: 640px
md: 768px

/* Desktop */
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Usage Pattern
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* 1 col mobile, 2 col tablet, 4 col desktop */}
</div>
```

## ✅ Do's and Don'ts

### ✅ Do
- Use emerald green for primary actions
- Maintain consistent spacing (6 units = 24px)
- Use hover states on all interactive elements
- Keep card borders subtle (gray-200)
- Use rounded-xl for cards (12px)
- Follow the grid system (1-2-3-4 columns)
- Use semantic color for status
- Keep text readable (gray-600 minimum)

### ❌ Don't
- Don't mix border radii (stick to rounded-lg or rounded-xl)
- Don't use bright colors for backgrounds
- Don't create custom hover states
- Don't skip transition animations
- Don't use inconsistent spacing
- Don't create new color variations
- Don't make icons too large or small
- Don't override the grid system

## 📋 Component Checklist

When creating a new component:
- [ ] Uses color palette from design system
- [ ] Has hover/active/focus states
- [ ] Follows spacing scale (p-4, p-6, gap-6)
- [ ] Uses standard border radius (rounded-xl)
- [ ] Has transition animations
- [ ] Is responsive (mobile-first)
- [ ] Uses semantic HTML
- [ ] Has proper TypeScript types
- [ ] Follows accessibility guidelines

## 🎯 Quick Reference

### Most Common Classes
```css
/* Layout */
.flex, .grid, .space-y-6, .gap-6

/* Spacing */
.p-6, .px-6, .py-4, .m-0

/* Colors */
.bg-white, .bg-gray-50, .bg-emerald-500
.text-gray-900, .text-gray-600, .text-emerald-600

/* Typography */
.text-2xl, .text-lg, .text-sm, .font-bold, .font-medium

/* Borders */
.border, .border-gray-200, .rounded-xl

/* Effects */
.shadow-lg, .hover:shadow-xl, .transition-all

/* Interactive */
.hover:bg-emerald-600, .hover:bg-gray-100
```

---

**Design System Version**: 3.0  
**Last Updated**: October 2025  
**Maintained by**: Elimu Space Design Team

