const Groq = require("groq-sdk")
const { sendSuccess, sendError } = require("../utils/resFormatter");
const aiTipModel = require("../models/aiTip.model");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getGroqChatCompletion(prompt) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "allam-2-7b",
  });
}


const aiSuggestionController = async (req, res) => {
  try {
    const { cfhId } = req.params;
    if (cfhId) {
      const savedTip = await aiTipModel.findOne({ cfhId });

      if (savedTip) {
        return sendSuccess(res, true, 200, "Successfull get ai tip. from saved tip", savedTip);
      }
    }

    const { totalEmission, categoryEmission, categoryBreakdown, categoryTips } =
      req.body;

    const prompt =`
          ---

          ## **✨ Refined Prompt (Use This Version)**

          You are an expert environmental analyst who explains carbon footprint data in a simple, engaging, human-friendly way.
          Use emojis where helpful, keep sentences short, and avoid long paragraphs.

          Below is a user's monthly carbon footprint record from my app **EcoTrack**.

          Your task is to generate:

          ---

          ### **1. 🌍 Overall Summary (2–3 short sentences)**

          Explain what their footprint says about their lifestyle in very simple words.

          ### **2. 📊 Category Insights (Short + Structured)**

          For each category:

          * ✅ What’s going well
          * ⚠️ What needs improvement
          * 💡 Why this category matters

          Keep each category very concise.

          ### **3. 🌱 Key Strengths (3–5 bullets)**

          List good habits based on the data.

          ### **4. 🔥 Major Emission Drivers (Top 2–3)**

          Highlight the biggest contributors.

          ### **5. 💚 Personalized Tips (6–10 short, actionable tips)**

          Make sure all tips are practical and based on their actual data.
          No made-up numbers.

          ### **6. ✔️ Do’s & ❌ Don’ts**

          Simple bullet list.

          ### **7. 🚀 Motivation Note**

          1 short, positive, encouraging line.

          ---

          ### **Style Rules**

          * Keep everything **short, clean, and human**.
          * Use light emojis for clarity (not too many).
          * No made-up stats — only infer from given data.
          * Tone must be **encouraging, friendly, and non-judgmental**.
          * Response must feel **simple, structured, and easy to read**.

          ---

          ### **DATA:**

            "totalEmission": ${totalEmission},
            "categoryEmission": ${categoryEmission},
            "categoryBreakdown": ${categoryBreakdown},
            "categoryTips": ${categoryTips}

          ---

    `;

    const chatCompletion = await getGroqChatCompletion(prompt)


    const aiTip = await aiTipModel.create({ tipText: chatCompletion.choices[0]?.message?.content || "", cfhId });

    sendSuccess(res, true, 200, "Successfull ai response from ai", aiTip);
  } catch (error) {
    sendError(res, false, 400, "Error on generating ai response", error);
    console.log(error);
  }
};

module.exports = { aiSuggestionController };
