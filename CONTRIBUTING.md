# Contributing to Atlas

`main` is the live site (GitHub Pages publishes it within minutes). Only the owner merges into `main`.

1. Work on your own branch: `ren`, `claude-code` or `codex` (or `<your-name>/<topic>` from it). Never push to `main`.
2. When a change is ready, open a pull request into `main` and describe what changed in plain words. Add screenshots for any visual change (phone size, and laptop size if the layout changed).
3. Do not merge your own pull request. The owner reviews it and merges it after approval. Merging publishes.
4. Every changed asset needs a new `?v=` tag in `index.html` so browsers do not serve the old file.
5. Never put secrets in the repo: no admin PIN, passwords, tokens, service keys or recovery codes. The Supabase publishable key already in the code is public by design.
6. Do not change database functions, schema or policies from code or a pull request. Those changes need the owner's explicit approval.
7. Keep the phone layout working. Test at about 390px wide before you open a pull request.
