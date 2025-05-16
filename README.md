# Rockpeach Landing Page

A modern, responsive landing page for Rockpeach, built with React, TypeScript, Tailwind CSS, and Framer Motion. This project showcases Rockpeach's services, projects, and contact information with a focus on professional design and smooth user experience.

## Features

- **Fully responsive**: Optimized for both mobile and desktop.
- **Modern UI**: Clean, professional look with custom branding and beautiful gradients.
- **Animated navigation**: Smooth scroll to sections when clicking navbar links.
- **Project carousel**: Interactive, auto-playing project showcase using Swiper.js.
- **Process section**: Highlights the workflow in a visually appealing way.
- **Contact & Footer**: Easy-to-find contact info and social links.
- **Custom favicon**: SVG with gradient and bold/italic "R".

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Swiper.js](https://swiperjs.com/) (for project carousel)

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   ```
3. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

- `src/components/` — All main React components (Navbar, Hero, About, Projects, Process, Contact, Footer)
- `src/data/` — Data for projects and process steps
- `src/types/` — TypeScript interfaces
- `public/` — Static assets (logo, favicon)
- `index.html` — Main HTML entry point

## Customization

- **Projects:**
  - Edit `src/data/projects.ts` to change project titles, descriptions, images, and types.
- **Process steps:**
  - Edit `src/data/process.ts` for workflow steps.
- **Branding:**
  - Replace `public/rockpeach-logo.svg` and `public/rockpeach-favicon.svg` as needed.
- **Colors & Styles:**
  - Adjust Tailwind config or component classes for custom colors and fonts.

## Deployment

You can deploy this project to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

1. **Build for production:**
   ```sh
   npm run build
   ```
2. **Preview production build:**
   ```sh
   npm run preview
   ```
3. **Deploy the `dist/` folder** to your preferred hosting.

## GitHub Authentication Note

GitHub no longer supports password authentication for git operations. Use a [personal access token](https://github.com/settings/tokens) or [SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) for pushing/pulling code.

## License

This project is for demonstration and internal use. Contact Rockpeach for commercial licensing or collaboration.
