# 🖼️ Quick Image Reference Guide

## 📁 Asset Locations & Usage

### Avatar Images
**Location:** `src/assets/avatars/`

| File | Used For | Current Usage |
|------|----------|---------------|
| `amina.jpg` | Female testimonials | Amina Hassan (Register, Carousel) |
| `grace.jpg` | Female testimonials | Grace Kilimo (Register), Rhobi Kilongo (Carousel) |
| `ibrahim.jpg` | Male testimonials | Fadhil Athuman Katunzi (Carousel) |
| `joseph.jpg` | Male testimonials | John Mwangi (Register), Leonard Sebeo & Joseph Mwangi (Carousel) |

### Course Images
**Location:** `src/assets/`

| File | Used For | Current Usage |
|------|----------|---------------|
| `course-business.jpg` | Business/entrepreneurship courses | CourseGrid samples |
| `course-digital.jpg` | Digital literacy courses | CourseGrid samples |
| `course-finance.jpg` | Financial literacy courses | CourseGrid samples |
| `course1.png` - `course5.png` | Various course types | Available for use |
| `hero-image.jpg` | Hero sections | Available for use |

### Public Gallery
**Location:** `public/gallery/`

| File | Used For | Current Usage |
|------|----------|---------------|
| `banner-img.png` | **Course card fallback** | EnrolledCourseCard, InstructorCourseCard |
| `about-img1.png` | About page imagery | Available for use |
| `enroll-student-img6.png` | Enrollment sections | Available for use |
| `Mask Group.png` | Design elements | Available for use |
| `206A7572.jpg` | Gallery photos | Available for use |

### Blog Images
**Location:** `src/assets/blog/`

| File | Content Type |
|------|-------------|
| `business-startup.jpg` | Business content |
| `mpesa-tips.jpg` | Financial/tech content |
| `web-development.jpg` | Tech content |

---

## 🔧 How to Use

### Import Avatar
```typescript
import aminaAvatar from '@/assets/avatars/amina.jpg';
```

### Import Course Image
```typescript
import courseDigital from '@/assets/course-digital.jpg';
```

### Reference Public Gallery
```tsx
<img src="/gallery/banner-img.png" alt="Course banner" />
```

---

## ✅ All Placeholders Removed

- ❌ `/placeholder.svg` → **Deleted**
- ❌ `/placeholder-avatar.jpg` → **Replaced with real avatars**
- ❌ `avatar: "placeholder"` → **Replaced with imports**

---

**Quick Reference Created:** October 10, 2025

