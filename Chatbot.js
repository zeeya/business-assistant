// Chatbot.js
const { OpenAI } = require('openai');

class Chatbot {
    constructor(apiKey) {
        this.openai = new OpenAI({ apiKey });
    }

    async askQuestion(prompt) {
        try {
            const response = await this.openai.completions.create({
                model: "gpt-3.5-turbo", // Using the specified model
                prompt: prompt,
                temperature: 0.7,
                max_tokens: 150,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });
            console.log("API Response:", response); // Log the raw response for debugging

            // Adjusted access based on typical response structure
            if (response && response.data && response.data.choices && response.data.choices.length > 0) {
                return response.data.choices[0].text.trim();
            } else {
                console.error('Unexpected response structure:', response);
                return "I'm sorry, I couldn't process that request.";
            }
        } catch (error) {
            console.error('Error in askQuestion:', error);
            throw error;
        }
    }
}

module.exports = Chatbot;
