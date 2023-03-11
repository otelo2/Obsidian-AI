//import fetch from 'node-fetch';
import { requestUrl, RequestUrlParam } from "obsidian";
import { DEFAULT_SETTINGS } from "main";

export class ChatGPT{
    openai: any;
    apiKey: string;
    constructor(apiKeyParam: string) {
        this.apiKey = apiKeyParam;
    }

    public async createCompletion(params = {}) {
        const params_ = { ...params };
        const result = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params_)
        });
        const stream = result.body
        const output = await this.fetchStream(stream);
        console.log("normal: "+output.choices[0].message.content);
        return output.choices[0].message.content
    }

    public async fetchStream(stream: any) {
        const reader = stream.getReader();
        let charsReceived = 0;
        const li = document.createElement("li");
        const result = await reader.read().then(
            function processText({ done,  value }: { done: boolean, value: any }) {
                if (done) {
                    return li.innerText;
                }
                // value for fetch streams is a Uint8Array
                charsReceived += value.length;
                const chunk = value;
                li.appendChild(document.createTextNode(chunk));
                return reader.read().then(processText);
            });
        const list = result.split(",")
        const numList = list.map((item: string) => {
            return parseInt(item)
        })
        const text = String.fromCharCode(...numList);
        const response = JSON.parse(text)
        return response
    }

    private sendToAPI = async (file: string, prompt: string) => {
        // Remove newlines, tabs, and quotes from the file and prompt
        file = file.replace(/(\r\n|\n|\r|\t|")/gm, " ");
        prompt = prompt.replace(/(\r\n|\n|\r|\t|")/gm, " ");

        // Append a period to the file if it doesn't end with one
        if (file.slice(-1) !== ".") {
            file = file + ".";
        }

        try {
            return await this.createCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {"role": "system", "content": `"${prompt}"`},
                    {"role": "user", "content": `"${file}"`}],
            });
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

        return await this.sendToAPI(file, prompt);
    }

    public ask = async (file:string) =>{
        // Prompt for GPT
        let prompt = ""

        return await this.sendToAPI(file, prompt);
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

        return await this.sendToAPI(file, prompt);
    }

    public continueWriting = async (file:string) =>{
        // Prompt for GPT
        let prompt = `You are an assistant helping a user write a document. Output how the document continues, no more than 3 sentences. Output in markdown format. Do not use links.
        Use this format, replacing text in brackets with the result. Do not include the brackets in the output:
        
        Continuation in [Identified language of the document]:
        [Continuation of the document in markdown format, no more than 3 sentences.]`;

        return await this.sendToAPI(file, prompt);
    }

    public summarize = async (file:string) =>{
        // Prompt for GPT
        let prompt = `You are an assistant helping summarize a document. Use this format, replacing text in brackets with the result. Do not include the brackets in the output: 

        Summary in [Identified language of the document]: 
        
        [One-paragaph summary of the document using the identified language.].`;

        return await this.sendToAPI(file, prompt);
    }

    public findActionItems = async (file:string) =>{
        // Prompt for GPT
        let prompt = `You are an assistant helping find action items inside a document. An action item is an extracted task or to-do found inside of an unstructured document. Use this format, replacing text in brackets with the result. Do not include the brackets in the output:

        List of action items in [Identified language of the document]:
        [List of action items in the identified language, in markdown format. Prefix each line with "- []" to make it a checkbox.]`;

        return await this.sendToAPI(file, prompt);
    }

    public blogPost = async (file:string) =>{
        // Prompt for GPT
        let prompt = `You are an assistant helping to generate a blog post on a given topic. 
        Use this format, replacing text in brackets with the result. Do not include the brackets in the output:
        
        Blog post in [Identified language of the topic]
        
        # [Topic of the blog post]
        [Blog post body]`;

        return await this.sendToAPI(file, prompt);
    }

    public prosAndConsList = async (file:string) =>{
        // Prompt for GPT
        let prompt = `You are an assistant helping to generate a list of pros and cons about a topic. Use this format, replacing text in brackets with the result. Do not include the brackets in the output: 

        Pros and cons in [Identified language of the topic]: 
        
        ## ["Pros" in the identified language] 
        
        [List of 5 pros, one sentence each.] 
        
        ## ["Cons" in the identified language] 
        
        [List of 5 cons, one sentence each.]`;

        return await this.sendToAPI(file, prompt);
    }

    public socialMediaPost = async (file:string) =>{
        // Prompt for GPT
        let prompt = `You are an assistant helping to draft a social media post. Use this format, replacing text in brackets with the result. Do not include the brackets in the output:

        Post in [Identified language of the topic]:
        
        # [Title]
        
        [One paragraph post body] 
        
        Tags: [List of relevant #hashtags]`;

        return await this.sendToAPI(file, prompt);
    }

    public outline = async (file:string) =>{
        
        let prompt = `You are an assistant helping to draft an outline for a document. Use this format, replacing text in brackets with the result. Do not include the brackets in the output: 

        Outline in [Identified language of the topic]: 
        
        # [Title of document] 
        [Bulleted list outline of document, in markdown format]`

        return await this.sendToAPI(file, prompt);
    }

    public creativeStory = async (file:string) =>{
        
        let prompt = `You are an assistant helping to write a creative story. Use this format, replacing text in brackets with the result. Do not include the brackets in the output: 

        Story in [Identified language of the topic]: 
        
        # [Title of story] 
        [First 5 paragraphs of story]`

        return await this.sendToAPI(file, prompt);
    }

    public poem = async (file:string) =>{
        
        let prompt = `You are an assistant helping to write a poem. Use this format, replacing text in brackets with the result. Do not include the brackets in the output: 

        Poem in [Identified language of the topic]: 
        
        # [Title of poem] 
        [Poem, at least 4 lines]`

        return await this.sendToAPI(file, prompt);
    }

    public essay = async (file:string) =>{
        
        let prompt = `You are an assistant helping to write an essay. 
        Use this format, replacing text in brackets with the result. Do not include the brackets in the output: 
        
        Essay in [Identified language of the topic]:
        
          # [Essay title]
          
          [Introduction paragraph]
          
          ## [Name of topic 1]
          
          [Paragraph about topic 1]
          
          ## [Name of topic 2]
          
          [Paragraph about topic 2]
          
          ## [Name of topic 3]
          
          [Paragraph about topic 3]
          
          ## ['Conclusion', in the identified language of the topic]
          
          [Conclusion paragraph]`

        return await this.sendToAPI(file, prompt);
    }

    public meetingAgenda = async (file:string) =>{
        
        let prompt = `You are an assistant helping to write a meeting agenda. 
        Use this format, replacing text in brackets with the result. Do not include the brackets in the output: 
        
        Meeting agenda in [Identified language of the topic]: 
        
        # [Meeting name] 
        
        [Introduction paragraph about the purpose and goals of the meeting] 
        
        [Bulleted list of at least 3 topics, in markdown format. Make sure to include details for each topic.]`

        return await this.sendToAPI(file, prompt);
    }

    public pressRelease = async (file:string) =>{
        
        let prompt = `You are an assistant helping to draft a press release. Use this format, replacing text in brackets with the result. Do not include the brackets in the output: 

        Press release in [Identified language of the topic]: 
        
        # [Press release headline] 
        [Press release body, in markdown format.] `

        return await this.sendToAPI(file, prompt);
    }

    public jobDescription = async (file:string) =>{
        
        let prompt = `You are an assistant helping to draft a job description. Use this format, replacing text in brackets with the result. Do not include the brackets in the output: 

        Job description in [Identified language of the prompt]: 
        
        # [Job title] 
        
        ## ["Overview", in the identified language] 
        
        [Overview of job, one paragraph] 
        
        ## ["Responsibilities", in the identified language] 
        
        [Bulleted list of at least 3 key responsibilities] 
        
        ## ["Qualificataions", in the identified language] 
        
        [Bulleted list of at least 3 key qualifications]`

        return await this.sendToAPI(file, prompt);
    }

    public salesEmail = async (file:string) =>{
        
        let prompt = `You are an assistant helping to draft a personalized sales email. Use this format, replacing text in brackets with the result. Do not include the brackets in the output:

        Output in [Identified language of the prompt]: 
        
        # [Sales email title] 
        [Sales email subject] 
        
        [Sales email body]`

        return await this.sendToAPI(file, prompt);
    }

    public recruitingEmail = async (file:string) =>{
        
        let prompt = `You are an assistant helping to draft a personalized recruiting email. Use this format, replacing text in brackets with the result. Do not include the brackets in the output:
  
        Recruiting email in [Identified language of the notes]:
            
        # [Recruiting email title]
          
            [Recruiting email subject] [Recruiting email body]`

        return await this.sendToAPI(file, prompt);
    }
}