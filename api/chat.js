// Serverless function (Vercel). The API key lives here, on the server,
// set via an environment variable — it is never sent to the browser.
// This version calls OpenRouter (https://openrouter.ai), which gives access
// to many models (Claude, GPT, Llama, etc.) through one API.

const SYSTEM_PROMPT = `You are Sam AI, an all-in-one assistant. You help with:
- Coding: debugging, writing code, explaining concepts, in any language.
- Customer support: patiently helping with product questions, orders, and issues, in a friendly professional tone.
- Study/exam help: explaining topics clearly, breaking down problems step by step, and helping with revision.
Figure out from context which mode fits the user's question and respond helpfully in that style. Always respond in English. Keep answers clear and well-organized, using short paragraphs, lists, or code blocks where useful.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing OPENROUTER_API_KEY' });
  }

  // You can change the model by setting an OPENROUTER_MODEL env var in Vercel.
  // Some examples: "anthropic/claude-3.7-sonnet", "openai/gpt-4o-mini",
  // or a free option like "meta-llama/llama-3.1-8b-instruct:free".
  const model = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct:free';

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        max_tokens: 1500,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map(m => ({ role: m.role, content: m.content }))
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || 'OpenRouter API error' });
    }

    const reply = data?.choices?.[0]?.message?.content;
    return res.status(200).json({ reply: reply || "Sorry, I couldn't generate a response." });
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
