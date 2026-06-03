# AGENTS.md

## Project
Frontend for a multiplayer 24 Points Game built with React and TypeScript.

## Goals
- Improve UI clarity and UX polish
- Keep existing gameplay logic intact
- Keep code maintainable
- Prefer incremental improvements over rewrites

## Frontend rules
- Do not change backend API contracts unless explicitly requested
- Preserve current route structure
- Prefer small reusable components
- Avoid adding new dependencies unless clearly justified
- Handle loading, empty, and error states for user-facing screens
- Keep TypeScript types explicit and clean
- Favor readable code over clever abstractions

## Quality checks
- Build should pass
- Avoid regressions on:
  - home page
  - mode selection
  - rooms page
  - single-player page
  - multiplayer page
- Summarize changed files and rationale after each task