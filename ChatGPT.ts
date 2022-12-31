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
    public makePostRequest = async (url:string) =>{
        try {
            const response = await requestUrl(this.params);

            if (response.status !== 200) {
                throw new Error("i've fallen and i can't get up");
            }

            const data = await response.json;
            console.log(data);
            return data.content;
        } catch (error) {
            console.error(error);
        }
    }

    public helpMeWrite = async (file:string) =>{
        // Prompt for GPT
        let prompt = `You are an assistant helping a user write more content in a document based on a prompt. Output in markdown format. Do not use links. Do not include literal content from the original document.
Use this format, replacing text in brackets with the result. Do not include the brackets in the output: 
Output in [Identified language of the document]: 
[Output based on the prompt, in markdown format.]`;

        // Remove newlines, tabs, and quotes from file string
        file = file.replace(/(\r\n|\n|\r|\t|")/gm, " ");
        
        // Remove newlines, tabs, and quotes from file string
        prompt = prompt.replace(/(\r\n|\n|\r|\t|")/gm, " ");

        // Create the request data
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

    public ask = async (file:string) =>{
        // Remove newlines, tabs, and quotes from file string
        file = file.replace(/(\r\n|\n|\r|\t|")/gm, " ");

        // Create the request data
        this.params.body = `{"content": "${file}"}`;

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

    public brainstormIdeas = async (file:string) =>{
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

        // Remove newlines, tabs, and quotes from file string
        file = file.replace(/(\r\n|\n|\r|\t|")/gm, " ");
        
        // Remove newlines, tabs, and quotes from file string
        prompt = prompt.replace(/(\r\n|\n|\r|\t|")/gm, " ");

        // Create the request data
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

}