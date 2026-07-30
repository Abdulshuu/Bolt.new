import dotenv from 'dotenv'
dotenv.config()
import { OpenRouter } from '@openrouter/sdk';
import * as models from '@openrouter/sdk/models';
import { EventStream } from '@openrouter/sdk/lib/event-streams';
import { getSystemPrompt } from './prompts.js';
import express from 'express'
import { BASE_PROMPT } from './prompts.js'
import { basePrompt as nodeBasePrompt } from './defaults/node.js'
import { basePrompt as reactBasePrompt } from './defaults/react.js'
const PORT = 8000


const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
    // httpReferer: '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
    // appTitle: '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
});

const app = express()


app.use(express.json())

// app.post('/template', (req, res) => {

//     let prompt = req.body.prompt

//     console.log(prompt)

//     //deciding which stack to make the app in 

//     async function getStack() {
//         const stream = await openrouter.chat.send({
//             chatRequest: {
//                 model: "poolside/laguna-m.1:free",
//                 models: ["first model ", "second model", "third model "],
//                 messages: [
//                     { role: "user", content: prompt },
//                     {
//                         role: "developer", content: "only give response in word analyzing if user is asking to make website in node or react and it should only be one word "
//                     }
//                 ],
//                 stream: false as const,
//             }
//         });

//         if ("choices" in stream) {
//             let content = stream.choices[0]?.message?.content;
//             if (content && typeof content == 'string') {
//                 content = content.toLowerCase().replace(/\s/g, '')
//                 // console.log(content);


//                 if (content == "react") {
//                     res.json({
//                         prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
//                         uiPrompts: [reactBasePrompt]
//                     })
//                     return;
//                 }

//                 if (content === "node") {
//                     res.json({
//                         prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
//                         uiPrompts: [nodeBasePrompt]
//                     })
//                     return;
//                 } else {
//                     res.status(400).json({
//                         msg: 'stack not found'
//                     })
//                     return
//                 }





//             }
//         }



//     }

//     getStack()

// })






async function main() {

    const stream = await openrouter?.chat?.send({
        chatRequest: {
            model: "inclusionai/ling-3.0-flash:free",
            messages: [
                { role: "system", content: getSystemPrompt() },
                {
                    role: "developer",
                    content: "You are a helpful coding assistant. Only respond with code, no explanations."
                },
                {
                    role: "user",
                    content: "build a todo app"
                }
            ],
            stream: true,
        }
    }) as EventStream<models.ChatStreamChunk>;

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


main()

// app.post('/chat', async (req, res) => {

//     let chat = req.body.chat
//     //chat is a array of 3 objects on the first 2 indexes it contains the object containing the artifact (default files of either react or node ) and one second index it should contain object with base prompt to create a clean website based on if its from react 

//     // const messages = [
//     //     { role: "user", content: stack === "react" ? REACT_BASE_PROMPT : NODE_BASE_PROMPT }, // message 1
//     //     { role: "user", content: STYLE_INSTRUCTIONS }, // message 2, matches this doc exactly
//     //     { role: "user", content: userPrompt } // message 3, the real request
//     // ];

//     const stream = await openrouter.chat.send({
//         chatRequest: {
//             model: "poolside/laguna-m.1:free",
//             messages: [
//                 { role: "user", content: messages },
//                 // {
//                 //     role: "developer", content: ""
//                 // }
//             ],
//             system: getSystemPrompt(),
//             stream: true,
//         }
//     }) as EventStream<models.ChatStreamChunk>




// })

app.listen(PORT, () => {
    console.log("server on PORT", PORT)
})