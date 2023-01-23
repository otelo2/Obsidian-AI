# Obsidian AI
## A shameless rip-off of [Notion AI](https://www.notion.so/product/ai)
I made this because I got jealous of Notion's AI feature. 

# FAQ
## How does it work?
It uses [ChatGPT](https://chat.openai.com/chat)

## How do I use it?
1. Install the plugin
2. Follow the installation instructions of [ChatGPT API Server](https://github.com/ChatGPT-Hackers/ChatGPT-API-server) and [ChatGPT API Agent](https://github.com/ChatGPT-Hackers/ChatGPT-API-agent)
3. Start the ChatGPT API Server and Agent in your localhost in port 8080 (I plan to make this configurable in the future)
4. Create a new note
5. Open the command palette and type `Obsidian AI: ` to see the available commands

## Will Notion come after you?
I don't think so. I'm not using their API. I'm using [ChatGPT](https://chat.openai.com/chat) which is a free API (for now). I'm just using the same name as Notion's AI feature.
That last line was created by GitHub Copilot. In all honestly I have no clue and rest assured I'll remove this if Notion comes after me.

## Will OpenAI come after you?
Ehhh maybe? I doubt it. I'd guess it's against their EULA to use ChatGPT as an API but who was time to read EULAs?

## What will you do once ChatGPT is no longer free?
I WON'T make this a paid plugin. I want it to be able to use different GPT-3 APIs (OpenAI, GPT-J, etc.).
That won't happen as long as I don't want to pay for an API key (and I hate paying) so if you have a spare key and for some crazy reason liked this plugin, please contact me.

## I did X and it broke/didn't work
Yeah I didn't test this much. If you want it fixed open an issue or a PR.

## Will it work on mobile?
I guess. You can edit the endpoint in the settings to point to your server instead of localhost and it should work well.
But honestly I have no clue. This is my first plugin so I have no clue if mobile needs special attention.

## Plans for the future?
Once ChatGPT is no longer free, I plan to add different configurations to let you use different GPT-3 APIs. 
I want it for you to host your own endpoint or use a public one. Once that is done I might try to upload it to the community plugins repo but that assumes I don't get sued by Notion or OpenAI. Or that I don't get bored of this.

## What is implemented? What is missing?
### Implemented:
These are the ones that I got from https://github.com/sw-yx/ai-notes/blob/main/Resources/Notion%20AI%20Prompts.md and watching videos on Notion AI.
- [x] Help Me Write
- [x] Continue Writing (promptless)
- [x] Brainstorm Ideas
- [x] Summarize (promptless)
- [x] Find Action Items (promptless)
- [x] Blog Post
- [x] Pros and Cons List
- [x] Social Media Post
- [x] Outline
- [x] Creative Story
- [x] Poem
- [x] Essay
- [x] Meeting Agenda
- [x] Press Release
- [x] Job Description
- [x] Sales Email
- [x] Recruiting Email
### Missing:
Either because I don't have the "original" prompt or because I don't know how they work/if there are already above.
- [ ] Improve writing
- [ ] Fix spelling and grammar
- [ ] Summarize
- [ ] Translate
- [ ] Explain this
- [ ] Make longer
- [ ] Make shorter
- [ ] Find action items
- [ ] Use simpler language
- [ ] Help me edit
- [ ] Help me write
- [ ] Continue writing


# Credits
TODO: Add credits correctly because I hate not giving proper credit to people
- https://github.com/sw-yx/ai-notes/blob/main/Resources/Notion%20AI%20Prompts.md
- https://lspace.swyx.io/p/reverse-prompt-eng
- https://github.com/ChatGPT-Hackers/ChatGPT-API-server
- https://github.com/ChatGPT-Hackers/ChatGPT-API-agent
