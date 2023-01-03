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

        // Append a period to the file if it doesn't end with one
        if (file.slice(-1) !== ".") {
            file = file + ".";
        }

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

    public continueWriting = async (url:string, file:string) =>{
        // Prompt for GPT
        let prompt = `You are an assistant helping a user write a document. Output how the document continues, no more than 3 sentences. Output in markdown format. Do not use links.
        Use this format, replacing text in brackets with the result. Do not include the brackets in the output:
        
        Continuation in [Identified language of the document]:
        [Continuation of the document in markdown format, no more than 3 sentences.]`;

        return await this.sendToAPI(url, file, prompt);
    }

    public summarize = async (url:string, file:string) =>{
        // Prompt for GPT
        let prompt = `You are an assistant helping summarize a document. Use this format, replacing text in brackets with the result. Do not include the brackets in the output: 

        Summary in [Identified language of the document]: 
        
        [One-paragaph summary of the document using the identified language.].`;

        return await this.sendToAPI(url, file, prompt);
    }

    public findActionItems = async (url:string, file:string) =>{
        // Prompt for GPT
        let prompt = `You are an assistant helping find action items inside a document. An action item is an extracted task or to-do found inside of an unstructured document. Use this format, replacing text in brackets with the result. Do not include the brackets in the output:

        List of action items in [Identified language of the document]:
        [List of action items in the identified language, in markdown format. Prefix each line with "- []" to make it a checkbox.]`;

        return await this.sendToAPI(url, file, prompt);
    }

    public blogPost = async (url:string, file:string) =>{
        // Prompt for GPT
        let prompt = `You are an assistant helping to generate a blog post on a given topic. 
        Use this format, replacing text in brackets with the result. Do not include the brackets in the output:
        
        Blog post in [Identified language of the topic]
        
        # [Topic of the blog post]
        [Blog post body]`;

        return await this.sendToAPI(url, file, prompt);
    }

    public prosAndConsList = async (url:string, file:string) =>{
        // Prompt for GPT
        let prompt = `You are an assistant helping to generate a list of pros and cons about a topic. Use this format, replacing text in brackets with the result. Do not include the brackets in the output: 

        Pros and cons in [Identified language of the topic]: 
        
        ## ["Pros" in the identified language] 
        
        [List of 5 pros, one sentence each.] 
        
        ## ["Cons" in the identified language] 
        
        [List of 5 cons, one sentence each.]`;

        return await this.sendToAPI(url, file, prompt);
    }

    public socialMediaPost = async (url:string, file:string) =>{
        // Prompt for GPT
        let prompt = `You are an assistant helping to draft a social media post. Use this format, replacing text in brackets with the result. Do not include the brackets in the output:

        Post in [Identified language of the topic]:
        
        # [Title]
        
        [One paragraph post body] 
        
        Tags: [List of relevant #hashtags]`;

        return await this.sendToAPI(url, file, prompt);
    }


}