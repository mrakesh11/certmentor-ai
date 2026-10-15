# CertMentor AI — Frontend

React 19 + Vite 7 single-page app for the CertMentor AI learning workspace (currently the AWS Cloud Practitioner CLF-C02 track).

See the [project README](../README.md) for the full overview, features, and the latest change log.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

CloudMentor AI talks to a locally running [Ollama](https://ollama.com) instance on `http://localhost:11434`. Pull a model first, e.g. `ollama pull llama3.2`, or the assistant will report that it is offline.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest suite |
| `npm run questions:*` | Question-bank content pipeline (see `../scripts/question-data`) |

## Layout

```
src/
├── components/   Shared UI (Navbar, CloudMentor, ThemeToggle, architecture diagrams)
├── pages/        Route screens (Dashboard, Learn, TopicLesson, PracticeQuestions, Flashcards, CheatsheetViewer)
├── lib/          Pure logic (progress, nextStep, curriculum, answers, ollama, theme)
├── styles/       Design system — tokens.css → base.css → components.css
└── data/         Generated question + manifest data
```

## Theming and scaling

- Theme preference (`light` / `dark` / `system`) is stored under `aws_clf_theme_v1` and applied by `ThemeProvider` / `useTheme`.
- A fluid root `font-size` in `src/styles/base.css` scales the entire UI with the viewport. Prefer `rem` for new sizes so they scale too; keep `px` only for borders, shadows, blur, and media-query breakpoints.

## Conventions

- Keep components and pages consistent with the existing structure, naming, and CSS patterns.
- Run `npm run lint`, `npm run test`, and `npm run build` before considering a change complete.
