const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

console.log(process.env.OPENAI_API_KEY);
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

(async () => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Chat GPTについて教えて。",
    temperature: 0,
    max_tokens: 100,
  });
  console.log(response.data.choices[0].text);
})();
