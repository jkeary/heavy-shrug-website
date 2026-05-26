# Heavy Shrug — Band Website

React/Vite frontend for [heavyshrug.com](https://heavyshrug.com).

## Stack

- **Frontend**: React + Vite, styled-components
- **Hosting**: Vercel (auto-deploys from GitHub)
- **Audio & artwork**: Cloudflare R2
- **Contact form**: Formspree

## Local development

```bash
npm install
npm run dev
```

Site runs at `http://localhost:5173`.

## Deploying updates

Vercel watches the GitHub repo and deploys automatically on every push. The workflow is:

```bash
git add -A
git commit -m "describe what you changed"
git push
```

Vercel detects the push, builds the site, and deploys in ~30 seconds.

## Adding new images

Drop the JPG or PNG into `src/assets/images/`, then run:

```bash
npm run images
```

This converts everything to WebP at max 1920px wide and deletes the originals. Then update the import in `src/variables.jsx` to point to the new `.webp` file, commit, and push.

## Adding new songs

Audio files live on Cloudflare R2, not in this repo. To add a new track:

1. **Tag the MP3** with proper ID3 metadata (title, album, year, embedded artwork)
2. **Upload the MP3** to the `music/` folder in the R2 bucket
3. **Run the track generator** locally — this reads the new file, extracts metadata and artwork:
   ```bash
   npm run tracks
   ```
4. **Upload the new artwork** (written to `public/artwork/`) to the `artwork/` folder in R2
5. **Commit and push** — Vercel deploys the updated track list:
   ```bash
   git add -A
   git commit -m "add [song name]"
   git push
   ```

## Project structure

```
frontend/
├── public/              # Static assets (favicon, etc.)
├── scripts/
│   └── generate-tracks.js   # Reads MP3 metadata, writes src/tracks.json
├── src/
│   ├── assets/          # Fonts and images (bundled by Vite)
│   ├── components/      # Navbar, Footer, MusicPlayer, etc.
│   ├── pages/           # Home, About, Contact
│   ├── tracks.json      # Auto-generated track list (commit this file)
│   └── variables.jsx    # Central export for images, bios, social links
└── package.json
```

## Updating site content

| What | Where |
|------|-------|
| Bio text | `src/variables.jsx` — `shortBio` and `longBio` |
| Social links | `src/variables.jsx` — `links` array |
| Photos | `src/assets/images/` — update import in `variables.jsx` |
| Colors / fonts | `src/App.jsx` — `GlobalStyle` CSS variables |
