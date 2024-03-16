require('dotenv').config();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; // Use the environment variable for port or default to 3000

app.use(bodyParser.json());

// Predefined conversation history
// let customContext = [
//   { role: "system", content: "You are a knowledgeable assistant that provides accurate and concise answers." },
//   { role: "user", content: "What's the tallest mountain in the world?" },
//   { role: "assistant", content: "tttezteztzetzetzetzetzetzet" },
// ];

// let customContext = [
//   { role: "system", content: "You are a creative assistant that enjoys playful and imaginative responses." },
//   { role: "user", content: "What's the tallest mountain in the world?" },
//   { role: "assistant", content: "tttezteztzetzetzetzetzetzet" },
// ];


let customContext = [
  { role: "system", content: "You are an assistant knowledgeable about [XcompanyX]. You provide accurate and concise information about its activities, history, and services." },
  { role: "user", content: "What activities does the company engage in?" },
  { role: "assistant", content: "[XcompanyX] has multiple activities, such as development and design." },
  { role: "user", content: "How old is the company?" },
  { role: "assistant", content: "[XcompanyX] was founded in 1990." },
  { role: "user", content: "location of company?" },
  { role: "assistant", content: "Paris france and morocco tangier abnnd belgique bruxel" },
];

app.post('/ask', async (req, res) => {
  const userQuestion = req.body.question; // Expecting { "question": "your question here" }

  if (!userQuestion) {
    return res.status(400).send('Question is required');
  }

  const data = {
    model: "gpt-4", // Ensure you're using the correct model name
    messages: [...customContext, { role: "user", content: userQuestion }],
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const aiResponse = response.data.choices[0].message.content;
    console.log("AI Response:", aiResponse);

    // Update conversation history
    customContext.push({ role: "user", content: userQuestion });
    customContext.push({ role: "assistant", content: aiResponse });

    res.send({ response: aiResponse });
  } catch (error) {
    console.error("Error in askChatQuestion:", error.response ? error.response.data : error.message);
    res.status(500).send('Error processing your question');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
