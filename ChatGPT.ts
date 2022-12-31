//import fetch from 'node-fetch';
import { requestUrl, RequestUrlParam } from "obsidian";

export class ChatGPT{
    // Make a method
    public pleaseWork = async (url:string) =>{
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
    // Make a method
    public makeRequest = async (url:string) =>{
        const settings = {
            method: 'POST',
            headers: {
                'Authorization': 'adminkey',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: '{"content": "What are you?"}'
        };
        try {
            const response = await fetch(url, settings);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    public sendRequest(){
        fetch('http://localhost:8080/api/ask', {
            method: 'POST',
            headers: {
                'Authorization': 'adminkey',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: '{"content": "What are you?"}'
        }).then(res => res.json())
        .then(json => console.log(json));
}

params: RequestUrlParam = {
    url: "http://localhost:8080/api/ask",
    method: "POST",
    headers: {
        'Authorization': 'adminkey',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: '{"content": "What are you?"}'
}
}