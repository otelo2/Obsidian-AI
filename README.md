# Obsidian AI
## A shameless rip-off of [Notion AI](https://www.notion.so/product/ai)
I made this because I got jealous of Notion's AI feature. 
### YOU NEED TO USE YOUR OWN API KEY

# Usage
There are two types of commands: promptless and prompted.
## Prompted 
Prompted commands don't require you to select any text, as you give the text you want in a new window that opens when you run the command. 

## Promptless 
Promptless commands require you to select text: You select the text you want, run the promptless command, and the plugin will use the selected text as the prompt.

# FAQ
## How does it work?
It uses [ChatGPT](https://chat.openai.com/chat)

## How do install it?
1. Create plugins folder in obsidian
2. Create a folder called obsidian-ai in the .obsidian directory of your vault 
3. Add main.js, manifest.json, and styles.css to the recently created folder
    - Get the main.js, manifest.json and styles.css from the releases tab
    - Your route should look like: {your_vault}/.obsidian/plugins/obsidian-ai/{the three files here}
4. Turn on community plugins
5. If you don't see the plugin restart obsidian
6. Turn on the plugin
7. Go to the settings page of the plugin
8. Type the API key in the field
9. Restart your vault
10. Open the command pallette (ctrl + p) and write "Obsidian AI" to see a list of the available commands

## Will Notion come after you?
I don't think so. I'm not using their API. I'm using [ChatGPT](https://chat.openai.com/chat) and paying for their API. I'm just using the same name as Notion's AI feature.
That last line was created by GitHub Copilot. In all honestly I have no clue and rest assured I'll remove this if Notion comes after me.

## Will OpenAI come after you?
Nope, I'm using (and paying for) their API.

## I did X and it broke/didn't work
Yeah I didn't test this much. If you want it fixed open an issue or a PR.

## Will it work on mobile?
It really should but I'm not sure. Let me know.

## Plans for the future?
Add more commands, improve the UI and UX because it sucks for now.

## Privacy concerns
You will be sending either the whole content of your current note or whatever you select to OpenAI chat API, be mindful of that 

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
- [x] Improve writing
- [x] Fix spelling and grammar
- [x] Explain this
- [x] Make longer
- [x] Make shorter
- [x] Use simpler language
### Missing:
Either because I don't have the "original" prompt or because I don't know how they work/if there are already above.
It probably won't work the same as Notions AI feature but I can mess around and find prompts that work 
- [ ] Translate
- [ ] Help me edit
- [ ] Help me write


# Credits
TODO: Add credits correctly because I hate not giving proper credit to people
- https://github.com/sw-yx/ai-notes/blob/main/Resources/Notion%20AI%20Prompts.md
- https://lspace.swyx.io/p/reverse-prompt-eng
