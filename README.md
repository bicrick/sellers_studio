# Sellers Studio Website

A beautiful, responsive website for Sellers Studio, a design studio specializing in wedding and event invitations, inspired by elegant design aesthetics and modern web practices.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern Aesthetics**: Clean, elegant design with soft color palette
- **Smooth Animations**: Subtle scroll animations and interactive elements
- **SEO Friendly**: Semantic HTML structure and proper meta tags
- **Fast Loading**: Minimal dependencies and optimized code
- **Contact Form**: Full-featured inquiry form with email integration

## Pages

- **Home** (`index.html`): Main landing page with hero section, services preview, featured projects, testimonials, and designer introduction
- **About** (`about.html`): Detailed information about Sadie, her design philosophy, and comprehensive service descriptions
- **Services** (`services.html`): Complete overview of all services, process, and pricing information
- **Portfolio** (`portfolio.html`): Gallery of work showcasing different project categories
- **Inquiry** (`inquiry.html`): Comprehensive contact form for potential clients
- **Thank You** (`thank-you.html`): Confirmation page after form submission

## Design Inspiration

This website draws inspiration from the Katherine Jezek Design website, featuring:
- Elegant typography combining Playfair Display and Inter fonts
- Soft, muted color palette with sage green accents
- Decorative elements like butterflies for visual interest
- Clean grid layouts and plenty of white space
- Professional photography placeholders

## Technologies Used

- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **Vanilla JavaScript**: Smooth scrolling and interactive elements
- **Google Fonts**: Professional typography
- **Formspree**: Form handling for the inquiry form
- **No external dependencies**: Fast loading and easy hosting

## Contact Form Setup

The inquiry form is configured to send emails to `sadie@sellersstudio.com` using Formspree. To activate:

1. **Sign up for Formspree** at [formspree.io](https://formspree.io)
2. **Create a new form** and get your form endpoint
3. **Update the form action** in `inquiry.html`:
   ```html
   <form class="inquiry-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. **Test the form** by submitting it once to activate

## Deployment to GitHub Pages

### Option 1: Using GitHub Web Interface

1. **Create a new repository** on GitHub
2. **Upload files** using the GitHub web interface:
   - Drag and drop all files (`index.html`, `about.html`, `services.html`, `portfolio.html`, `inquiry.html`, `thank-you.html`, `styles.css`, `script.js`, `README.md`)
3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Save

### Option 2: Using Git Commands

```bash
# Clone or initialize your repository
git init
git remote add origin https://github.com/yourusername/your-repo-name.git

# Add and commit files
git add .
git commit -m "Initial commit: Sellers Studio website"

# Push to GitHub
git push -u origin main

# Enable GitHub Pages in repository settings
```

### Option 3: Using GitHub Desktop

1. **Create new repository** in GitHub Desktop
2. **Copy files** to the repository folder
3. **Commit and push** to GitHub
4. **Enable GitHub Pages** in repository settings

## Customization

### Content Updates

1. **Replace placeholder text** with actual content
2. **Update contact information** in the footer
3. **Add real images** by replacing placeholder divs with `<img>` tags
4. **Modify colors** in the CSS variables section

### Adding Images

Replace placeholder divs with actual images:

```html
<!-- Replace this: -->
<div class="placeholder-image hero-placeholder"></div>

<!-- With this: -->
<img src="path/to/your/image.jpg" alt="Description" class="hero-image">
```

### Color Customization

Main colors used in the design:
- Primary text: `#5a5a5a`
- Headings: `#3d3d3d` and `#7a7a7a`
- Accent: `#b8a992`
- Background: `#fdfcfa`
- Green gradient: `#a8b5a0` to `#c4d4ba`

## File Structure

```
sellers-studio-website/
├── index.html          # Main landing page
├── about.html          # About page
├── services.html       # Services page
├── portfolio.html      # Portfolio gallery
├── inquiry.html        # Contact form
├── thank-you.html      # Form confirmation page
├── styles.css          # All styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Services Offered

Based on the content, Sellers Studio offers:

### Events
- Wedding stationery suites
- Birthday party designs
- Corporate event materials
- Holiday celebrations
- Baby showers & bridal showers

### Invitations
- Save the dates
- Wedding invitations
- RSVP cards & reply sets
- Reception cards
- Digital invitations

### Party Goods
- Place cards & escort cards
- Table numbers & names
- Menus & bar signage
- Programs & ceremony signage
- Welcome bags & favors

### Bespoke Paper
- Holiday cards & gifts
- Birth announcements
- Thank you notes
- Personal stationery
- Custom business materials

## Performance

- **Minimal dependencies**: Only Google Fonts and Formspree loaded externally
- **Optimized CSS**: Efficient selectors and minimal redundancy
- **Compressed images**: Use WebP format when possible for better performance
- **Clean code**: Well-organized and commented for easy maintenance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is designed for Sellers Studio. Please respect intellectual property rights when using this code.

---

**Live Demo**: Your GitHub Pages URL will be: `https://yourusername.github.io/repository-name`

For questions or support, please open an issue in the repository. 