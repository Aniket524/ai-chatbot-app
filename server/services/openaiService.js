const { Configuration, OpenAIApi } = require('openai');
const { OpenAI } = require("openai");
const dotenv = require('dotenv');

dotenv.config();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Function to get AI responses based on chat history and personality traits
// const getAIResponse = async (chatHistory, personalityTraits) => {
//     console.log('the chat funtion called')
//     console.log(chatHistory)
//     console.log(personalityTraits)
//     console.log('test')
//     const prompt = `You are an AI assistant that simulates a conversation. The user has the following personality traits: ${personalityTraits.join(", ")}.Based on this personality, you should respond accordingly. Here is the conversation history:\n\n${chatHistory}\nUser:`;
//     console.log(prompt);
    
//     try {
//         const response = await openai.createCompletion({
//             model: 'text-davinci-003',  // Use the most suitable model
//             prompt,
//             max_tokens: 150,
//             temperature: 0.7,
//         });

//         console.log(response)
//         return response.data.choices[0].text.trim();
//     } catch (error) {
//         console.error('Error generating AI response:', error);
//         return 'Sorry, I couldn’t think of anything.';
//     }
// };

const getAIResponse = async (chatHistory, personalityTraits,friend) => {
    console.log('The chat function was called'); // This will confirm if the function is entered.
    console.log('Chat History:', chatHistory);
    console.log('Personality Traits:', personalityTraits);
    console.log('Before prompt creation');

    // const prompt = `You are an AI assistant that simulates a conversation. The user has the following personality traits: ${personalityTraits.join(", ")}, just chat nicely with the user`;
    // const prompt = `You are the AI Agent`
    // console.log('Prompt:', prompt); // Check if the prompt is generated correctly

    // try {
    //     console.log('Before API call');
    //     const response = await openai.createCompletion({
    //         model: 'text-davinci-003',  // Use the most suitable model
    //         prompt,
    //         max_tokens: 150,
    //         temperature: 0.7,
    //     });

    //     console.log('API Response:', response); // Check API response here
    //     return response.data.choices[0].text.trim();
    // } catch (error) {
    //     console.error('Error generating AI response:', error); // This will catch any errors from the API call
    //     return 'Sorry, I couldn’t think of anything.';
    // }

    try {
        // Use the createChatCompletion method
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Or another model like 'gpt-4'
            messages: [
                { role: 'system', content: `You are a good friend of the user with following personality traits: ${personalityTraits} and your details are: ${friend}, chat goodly with the user and try to make conseversation intresting and according to your personality traits make the coversation make the response small and human redable and intresting` },
                { role: 'user', content: chatHistory }
            ],
            max_tokens: 150,
            temperature: 0.7,
        });

        console.log('API Response:', response); // Check the response here
        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generating AI response:', error); // This will catch any errors from the API call
        return 'Sorry, I couldn’t think of anything.';
    }
};


module.exports = { getAIResponse };
