# Pineapple AI beta

This version connects the study tutor, notes, practice questions, test, topic list, flashcards, explanation, chat, and study plan modes to OpenAI, Google Gemini, and Anthropic Claude. Students only see Pineapple. The server chooses a provider based on the task and material length, then automatically tries another configured provider when it detects a temporary outage or a recognized rate/quota limit. It accepts pasted material and `.txt`/`.md` files. PDF and image understanding are not connected yet.

## Run locally

1. Install Node.js 20 or newer.
2. In this folder, set any provider keys you have: `OPENAI_API_KEY`, `GEMINI_API_KEY`, and/or `ANTHROPIC_API_KEY`. More than one is needed for provider failover. Never paste a key into `index.html` or share it in a chat.
3. Run `npm start` and open `http://localhost:4173`.

The app reads keys only on the server. The browser sends study text to the app server, which forwards it to the automatically selected provider. OpenAI requests use `store: false`; avoid entering sensitive or private information.

## Deploy

Deploy this folder with a host that supports Netlify Functions. Set the site's base/publish directory to `outputs` (or deploy this folder as the site root), then add the provider keys you want to use as private environment variables in the host dashboard and redeploy. Optional: set `OPENAI_MODEL`, `GEMINI_MODEL`, or `CLAUDE_MODEL` to select a different model enabled for your API project.

Do not use a static-only upload for the AI version: the `/api/tutor` function must be deployed as well. Keep the key out of the ZIP and source files. A public beta endpoint can incur API usage charges; turn it off or restrict access until you are ready to share it.
