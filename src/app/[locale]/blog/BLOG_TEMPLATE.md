# Blog Post Template

This template helps you create new SEO-optimized blog posts for Coffi. Follow these steps:

## 1. Create the folder structure
```bash
mkdir -p src/app/[locale]/blog/your-post-slug-en
mkdir -p src/app/[locale]/blog/your-post-slug-es
```

## 2. Create layout.tsx files
Copy the layout.tsx from existing blog posts and update the blogData object with:

### Required Fields:
- `slug`: URL-friendly identifier (different for EN/ES)
- `title`: Post title in both languages
- `description`: Meta description in both languages  
- `keywords`: SEO keywords array for both languages
- `publishDate`: Publication date (YYYY-MM-DD)
- `lastModified`: Last update date (YYYY-MM-DD)
- `readingTime`: Estimated reading time
- `category`: Post category
- `author`: Author info with name and URL

### SEO Best Practices for Keywords:

#### English Keywords should include:
- Primary topic keywords
- Location-specific terms: "Medellín", "Colombia", "El Poblado", "Laureles" 
- Workspace terms: "coworking", "work-friendly", "remote work", "digital nomad"
- Coffi brand terms: "Coffi", "workspace finder"
- User intent keywords: "best", "guide", "tips", "how to"

#### Spanish Keywords should include:
- Términos principales del tema
- Ubicación específica: "Medellín", "Colombia", "El Poblado", "Laureles"
- Términos de espacios: "coworking", "trabajo remoto", "nómadas digitales"
- Marca Coffi: "Coffi", "espacios de trabajo"
- Intención del usuario: "mejor", "guía", "tips", "cómo"

## 3. Create page.tsx files
- Import BlogStructuredData component
- Add blogData object (same as layout)
- Wrap component in fragment with BlogStructuredData
- Use semantic HTML structure with proper headings (h1, h2, h3)
- Include internal links to other Coffi pages
- Add relevant images with alt text
- Use schema.org markup for articles

## 4. Update sitemap.ts
Add your new blog post to the `blogPosts` array:
```typescript
{
  en: '/blog/your-english-slug',
  es: '/blog/your-spanish-slug'
}
```

## 5. Update blog index page
Add your post to the `blogPosts` array in `src/app/[locale]/blog/page.tsx`

## SEO Optimization Checklist:

### Technical SEO:
- ✅ Unique meta titles under 60 characters
- ✅ Meta descriptions 150-160 characters
- ✅ Canonical URLs set correctly
- ✅ Hreflang tags for language versions
- ✅ Open Graph and Twitter meta tags
- ✅ Structured data (Article, FAQ, Breadcrumb)
- ✅ Internal linking to relevant pages
- ✅ Mobile-responsive design
- ✅ Fast loading images (optimized)

### Content SEO:
- ✅ H1 tag with primary keyword
- ✅ H2/H3 subheadings with related keywords
- ✅ Keyword density 1-2% (natural usage)
- ✅ Internal links to relevant Coffi pages
- ✅ External links to authoritative sources
- ✅ Alt text for all images
- ✅ Content length 1500+ words for comprehensive coverage
- ✅ Local SEO keywords (Medellín, Colombia neighborhoods)

### User Experience:
- ✅ Clear navigation back to main site
- ✅ Related articles suggestions
- ✅ Social sharing buttons
- ✅ Reading time indicator
- ✅ Clean, readable typography
- ✅ Logical content flow
- ✅ Call-to-action to main Coffi app

## Content Ideas for Future Posts:

### Workspace Guides:
- "Best Coworking Spaces in El Poblado: 2025 Guide"
- "Work-Friendly Cafés in Laureles: Local's Guide"
- "24/7 Workspaces in Medellín for Night Owls"
- "Budget-Friendly Workspaces: Under $10/day in Medellín"
- "Luxury Coworking: Premium Spaces in Medellín"

### Digital Nomad Tips:
- "Digital Nomad Guide to Medellín: Everything You Need to Know"
- "Best Neighborhoods in Medellín for Remote Workers"
- "Medellín Internet Speed Guide: Where to Find the Fastest WiFi"
- "Cost of Living Guide for Digital Nomads in Medellín"
- "Networking Events for Digital Nomads in Medellín"

### Productivity & Lifestyle:
- "How to Stay Productive in Tropical Weather"
- "Building Routine as a Digital Nomad in Medellín"
- "Spanish for Digital Nomads: Essential Phrases"
- "Colombian Coffee Culture: A Nomad's Guide"
- "Exploring Medellín on Weekends: Quick Escapes"

Remember: Each post should provide genuine value to digital nomads and remote workers while naturally incorporating your target keywords and linking back to the main Coffi platform.
