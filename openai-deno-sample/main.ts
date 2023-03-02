import { Configuration, OpenAIApi } from "npm:openai";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const { OPENAI_API_KEY } = config();

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const content =
  "ちょっとしたCLIを作る際に、NodeとDenoどちらの方が便利か、ミルクボーイ風に教えてください。";
console.log(content);

const response = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content }],
});

console.log(response.data.choices[0].message?.content);
