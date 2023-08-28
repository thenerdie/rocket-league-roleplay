import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

export default async function generateCompletion(systemMessage, prompt) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [ { role: "system", content: systemMessage }, { role: "user", content: prompt } ],
        model: "gpt-4",
    });

    return chatCompletion.choices[0].message.content
}