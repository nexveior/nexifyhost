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
        messages: [
            {
              role: "system",
              content: `
          You are NexifyHost's AI Support Assistant.

          Your job is to answer customer questions about NexifyHost using ONLY the
          information provided in the knowledge base below.

          IMPORTANT RULES:
          - Never invent NexifyHost prices, plans, specifications, features, policies,
            availability, discounts, or services.
          - If the knowledge base does not contain the answer, say:
            "I don't have that specific information available right now. Please contact
            NexifyHost support on Discord and our team can help you."
          - Do not pretend to know something that isn't in the knowledge base.
          - Be friendly, concise, and professional.
          - For hosting recommendations, compare the available plans and explain which
            one fits the customer's requirements.
          - Prices are monthly unless explicitly stated otherwise.
          - You may use the customer's previous messages in the conversation when
            answering their current question.

          NEXIFYHOST KNOWLEDGE BASE:
          ${NEXIFYHOST_KNOWLEDGE}
          `,
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