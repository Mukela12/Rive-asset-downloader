# Rive Asset Exporter

A free, client-side web tool for extracting images, fonts, and audio from [Rive](https://rive.app) animation files. No uploads required — everything runs in your browser.

**Live site:** [rive-asset-downloader.vercel.app](https://rive-asset-downloader.vercel.app)

## Features

- **Drag & drop** — Drop a `.riv` file or browse to select one
- **Live preview** — Play and interact with animations directly in the browser
- **Inspect** — Browse artboards, animations, state machines, and inputs
- **Export** — Download individual assets or batch export as a ZIP with organized folders and a manifest

### Supported asset types

| Type | Examples |
|-------|---------|
| Images | Embedded graphics |
| Fonts | Embedded typography |
| Audio | Embedded sound files |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the tool locally.

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [Rive React Runtime](https://www.npmjs.com/package/@rive-app/react-canvas)
- [Tailwind CSS](https://tailwindcss.com)
- [JSZip](https://stuk.github.io/jszip/) for batch export
- [Vercel Analytics](https://vercel.com/analytics)

## License

MIT
