const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const content = `やっべ、ChatGPT API試してたらもう9時過ぎてた！一応9時が始業時刻なんだけど、どうしたらいいかな？`;
console.log(content);

(async () => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content }],
  });
  console.log(response.data.choices[0].message.content);
})();
