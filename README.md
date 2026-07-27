# Sam AI

A web chatbot with:
- Dark mode by default, with a light/dark toggle
- Background image + subtle animated particle overlay
- Voice input (click the mic and speak — uses your browser's built-in speech recognition)
- Image upload (click the icon to attach an image, e.g. a screenshot of code or an error)
- Multiple saved chats (New chat button + sidebar history)
- Multi-role assistant: coding help, customer-support-style help, and study/exam help, all in one
- Powered by **OpenRouter** (access to many models — Claude, GPT, Llama, and more — through one API)

Frontend: `public/index.html`. Backend (holds your API key safely): `api/chat.js`.

## 1. Add your own background image

Put an image file named exactly `background.jpg` inside the `public` folder
(same folder as `index.html`). Any image works — landscape orientation looks
best. This repo doesn't include one, since copyrighted anime art can't be
redistributed — use an image you have the rights to use (your own art, a
royalty-free wallpaper, an AI-generated image you made, etc.).

## 2. Set up OpenRouter

1. Sign up at openrouter.ai and create an API key (Keys page → Create Key)
2. Add some credit on the Credits page (a few dollars is enough to start; some models are free)
3. In Vercel → your project → Settings → Environment Variables, update/add:
   - `OPENROUTER_API_KEY` → your OpenRouter key
   - (optional) `OPENROUTER_MODEL` → e.g. `anthropic/claude-3.7-sonnet` for best quality, or leave unset to use the free default model
   - You can remove `ANTHROPIC_API_KEY` now, it's no longer used

## 3. Updating your existing GitHub repo

1. Go to your repo: `github.com/SAMPATH1519/AI-chatbbot`
2. Open the `public` folder → click `index.html` → click the pencil (Edit) icon → select all and replace with the new `public/index.html` content → Commit changes
3. Open the `api` folder → click `chat.js` → Edit → replace with the new `api/chat.js` content → Commit changes
4. Upload your `background.jpg` into the `public` folder (Add file → Upload files)

Vercel will automatically redeploy after you commit. Give it a minute, then refresh your live site.

## Notes
- Voice input works in Chrome/Edge; Safari/Firefox support varies.
- Image uploads only work if you pick a vision-capable model via `OPENROUTER_MODEL` (e.g. `anthropic/claude-3.7-sonnet`, `openai/gpt-4o-mini`); the free default text-only model will ignore images.
- Chat history (including any attached images) is saved in each visitor's own browser (`localStorage`), not shared between people.
