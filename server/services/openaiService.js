const { Configuration, OpenAIApi } = require('openai');
const { OpenAI } = require("openai");
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const getAIResponse = async (chatHistory, personalityTraits,friend) => {

    try {
        // Use the createChatCompletion method
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Or another model like 'gpt-4'
            messages: [
                { role: 'system', content: `You are a good friend of the user with following personality traits: ${personalityTraits} and your details are: ${friend}, chat according to your personality traits with the user and try to make conseversation intresting and according to your personality traits make the coversation make the response small and human redable and intresting, remove the 'yourname:' from the response` },
                { role: 'user', content: chatHistory }
            ],
            max_tokens: 150,
            temperature: 0.7,
        });

        console.log('API Response:', response.choices[0].message.content.trim()); // Check the response here
        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generating AI response:', error); // This will catch any errors from the API call
        return 'Sorry, I couldn’t think of anything.';
    }
};


module.exports = { getAIResponse };
