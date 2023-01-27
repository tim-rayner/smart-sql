import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export const requestSQL = async (prompt: string) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.3,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    return response.data.choices[0].text;
  } catch (err) {
    throw new Error("err");
  }
};
