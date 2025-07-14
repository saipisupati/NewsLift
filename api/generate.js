// api/generate.js
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Export the handler directly
module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { text, tone } = req.body;
  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    const prompt = `Transform the following content into a polished newsletter in a ${tone} tone:\n\n${text}`;
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 800,
      temperature: 0.7,
    });
    res.status(200).json({ newsletter: completion.data.choices[0].text.trim() });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Generation failed" });
  }
};

