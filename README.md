# Rene's Portfolio Website

A modern terminal-themed portfolio website built with SvelteKit, featuring dynamic GitHub integration and a retro aesthetic.

**Live Site:** [https://renetec.github.io](https://renetec.github.io)

## Features

- Terminal-style UI with retro aesthetics
- Dynamic GitHub stats and activity timeline
- Project showcase with automatic updates via git submodule
- Responsive design with mobile support
- Static site generation for optimal performance

## Development

### Prerequisites

- Node.js 20 or higher
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/renetec/renetec.github.io.git
cd renetec.github.io

# Initialize and update the profile submodule
git submodule update --init --recursive

# Install dependencies
npm install
```

### Development Server

Start the development server with hot-reload:

```bash
npm run dev
```

Visit `http://localhost:5173` to view the site.

### Building

Create a production build:

```bash
npm run build
```

The static files will be generated in the `build/` directory.

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
renetec.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── src/
│   ├── lib/
│   │   ├── assets/             # Static assets (fonts, images)
│   │   ├── components/         # Reusable Svelte components
│   │   ├── config/
│   │   │   └── profile/        # Git submodule for profile data
│   │   └── utils/              # Utility functions
│   ├── routes/                 # SvelteKit routes (pages)
│   │   ├── +page.svelte        # Home page
│   │   ├── github/             # GitHub stats page
│   │   ├── projects/           # Projects showcase
│   │   └── timeline/           # Activity timeline
│   ├── app.html                # HTML template
│   └── app.css                 # Global styles
├── static/                     # Static files (served as-is)
├── build/                      # Production build output
├── .nojekyll                   # Disables Jekyll on GitHub Pages
├── svelte.config.js            # SvelteKit configuration
├── vite.config.ts              # Vite configuration
└── package.json                # Project dependencies and scripts
```

## Updating Projects

Project data is managed through a git submodule located at `src/lib/config/profile`. This links to the [renetec/renetec](https://github.com/renetec/renetec) repository.

### To update project information:

1. Navigate to the submodule directory:
   ```bash
   cd src/lib/config/profile
   ```

2. Make changes to `profile.json`

3. Commit and push changes:
   ```bash
   git add profile.json
   git commit -m "Update projects"
   git push
   ```

4. Return to the main repository and update the submodule reference:
   ```bash
   cd ../../..
   git add src/lib/config/profile
   git commit -m "Update profile submodule"
   git push
   ```

The GitHub Actions workflow will automatically rebuild and deploy the site.

## Tech Stack

- **Framework:** [SvelteKit](https://kit.svelte.dev/) - Modern web framework with SSG support
- **Language:** TypeScript - Type-safe development
- **Styling:** Custom CSS with terminal theme
- **Build Tool:** Vite - Fast build and development
- **Deployment:** GitHub Pages via GitHub Actions
- **CI/CD:** GitHub Actions for automated deployment

## Adding Screenshots

To add project screenshots:

1. Add image files to `static/screenshots/` directory
2. Reference them in `profile.json` within the profile submodule:
   ```json
   {
     "projects": [
       {
         "name": "Project Name",
         "screenshot": "/screenshots/project-name.png"
       }
     ]
   }
   ```

Images in the `static/` directory are served directly at the root URL.

## Profile Configuration

The profile configuration (bio, projects, skills, etc.) is stored in a separate repository as a git submodule:

**Profile Repo:** [https://github.com/renetec/renetec](https://github.com/renetec/renetec)

This allows the same profile data to be reused across multiple platforms (portfolio site, GitHub profile README, etc.).

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch. The deployment is handled by GitHub Actions (see `.github/workflows/deploy.yml`).

### Manual Deployment

You can also trigger a manual deployment from the GitHub Actions tab by running the "Deploy to GitHub Pages" workflow.

## License

MIT License - feel free to use this as a template for your own portfolio!

## Links

- [Live Portfolio](https://renetec.github.io)
- [Profile Data Repository](https://github.com/renetec/renetec)
- [GitHub Profile](https://github.com/renetec)
