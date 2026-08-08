import NEXIFYHOST_KNOWLEDGE from "./knowledge.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openrouter/auto",
        max_tokens: 1000,
        messages: [
            {
              role: "system",
              content:
                "You are NexifyHost AI Support. Answer questions about NexifyHost using the provided knowledge.",
            },
            {
              role: "user",
              content: message,
            },
          ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "AI request failed",
      });
    }

    return res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong while contacting the AI.",
    });
  }
}