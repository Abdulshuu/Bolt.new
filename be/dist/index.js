import dotenv from 'dotenv';
dotenv.config();
import { OpenRouter } from '@openrouter/sdk';
import * as models from '@openrouter/sdk/models';
import { EventStream } from '@openrouter/sdk/lib/event-streams';
import { getSystemPrompt } from './prompts.js';
import express from 'express';
import { BASE_PROMPT } from './prompts.js';
const PORT = 8000;
const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
    // httpReferer: '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
    // appTitle: '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
});
const app = express();
app.use(express.json());
app.post('/template', (req, res) => {
    let prompt = req.body.prompt;
    console.log(prompt);
    //deciding which stack to make the app in 
    async function getStack() {
        const stream = await openrouter.chat.send({
            chatRequest: {
                model: "poolside/laguna-m.1:free",
                messages: [
                    { role: "user", content: prompt },
                    {
                        role: "developer", content: "only give response in word analyzing if user is asking to make website in node or react and it should only be one word "
                    }
                ],
                stream: false,
            }
        });
        if ("choices" in stream) {
            const content = stream.choices[0]?.message?.content;
            console.log(content);
            return content;
        }
        // let response = "";
        // for await (const chunk of stream) {
        //     console.log(chunk)
        //     const content = chunk.choices[0]?.delta?.content;
        //     if (content) {
        //         response += content;
        //         process.stdout.write(content);
        //     }
        //     //     // Usage information comes in the final chunk
        //     //     if (chunk.usage) {
        //     //         console.log("\nReasoning tokens:", chunk.usage.completionTokensDetails?.reasoningTokens);
        //     //     }
        // }
        // console.log(response)
    }
    getStack();
});
async function main() {
    const stream = await openrouter?.chat?.send({
        chatRequest: {
            model: "tencent/hy3:free",
            messages: [
                { role: "system", content: getSystemPrompt() },
                {
                    role: "user",
                    content: "You are a helpful coding assistant. Only respond with code, no explanations."
                },
                {
                    role: "user",
                    content: "build a todo app"
                }
            ],
            stream: true,
        }
    });
    let response = "";
    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
            response += content;
            process.stdout.write(content);
        }
        // Usage information comes in the final chunk
        if (chunk.usage) {
            console.log("\nReasoning tokens:", chunk.usage.completionTokensDetails?.reasoningTokens);
        }
    }
}
// main()
app.listen(PORT, () => {
    console.log("server on PORT", PORT);
});
//# sourceMappingURL=index.js.map