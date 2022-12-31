//import fetch from 'node-fetch';
import { requestUrl, RequestUrlParam } from "obsidian";

export class ChatGPT{
    // Test request
    params: RequestUrlParam = {
        url: "http://localhost:8080/api/ask",
        method: "POST",
        headers: {
            'Authorization': 'adminkey',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: '{"content": "What are you?"}'
    }

    private sendToAPI = async (url:string, file: string, prompt: string) => {
        // Set the URL
        this.params.url = url;

        // Remove newlines, tabs, and quotes from the file and prompt
        file = file.replace(/(\r\n|\n|\r|\t|")/gm, " ");
        prompt = prompt.replace(/(\r\n|\n|\r|\t|")/gm, " ");

        // Set the body
        this.params.body = `{"content": "${file} ${prompt}"}`;

        console.log(this.params.body);

        try {
            const response = await requestUrl(this.params);

            if (response.status !== 200) {
                throw new Error("i've fallen and i can't get up");
            }

            const data = await response.json;
            console.log(data);
            // Prepend a newline to the response
            let result = `\n${data.content}`;
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    public helpMeWrite = async (url:string, file:string) =>{
        // Prompt for GPT
        let prompt = `You are an assistant helping a user write more content in a document based on a prompt. Output in markdown format. Do not use links. Do not include literal content from the original document.
Use this format, replacing text in brackets with the result. Do not include the brackets in the output: 
Output in [Identified language of the document]: 
[Output based on the prompt, in markdown format.]`;

        return await this.sendToAPI(url, file, prompt);
    }

    public ask = async (url:string, file:string) =>{
        // Prompt for GPT
        let prompt = ""

        return await this.sendToAPI(url, file, prompt);
    }

    public brainstormIdeas = async (url:string, file:string) =>{
        // Prompt for GPT
        let prompt = `You are an assistant helping brainstorm a list of ideas inside a document.
        Use this format, replacing text in brackets with the result. Do not include the brackets in the output:
        10 ideas based on the topic, in [Identified language of the prompt]:
        
        - [Idea 1]
        - [Idea 2]
        - [Idea 3]
        - [Idea 4]
        - [Idea 5]
        - [Idea 6]
        - [Idea 7]
        - [Idea 8]
        - [Idea 9]
        - [Idea 10]`;

        return await this.sendToAPI(url, file, prompt);
    }

}