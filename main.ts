import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, Vault} from 'obsidian';
import { PromptModal } from 'PromptModal';
import {ChatGPT} from './ChatGPT';

// Remember to rename these classes and interfaces!

interface ObsidianAISettings {
	apiKey: string;
}

export const DEFAULT_SETTINGS: ObsidianAISettings = {
	apiKey: 'sk-XXXXXXXXX'
}

export default class ObsidianAI extends Plugin {
	settings: ObsidianAISettings;
	obsidianAI: ChatGPT;

	async onload() {
		await this.loadSettings();

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Obsidian AI Enabled');

		//TODO: Add different descriptions for each command
		// Just sends the text of the document to the AI
		this.addCommand({
			id: 'ask-question',
			name: 'Ask a question (sends the document text to the AI)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) { 
					console.log();
					
					let fileContents = this.app.vault.cachedRead(activeView.file);
					let response = this.obsidianAI.ask(await fileContents);
					console.log(editor.getSelection());
					editor.replaceSelection(await response || "");
				}
			}
		});
		// Adds more text to an existing document
		this.addCommand({
			id: 'help-me-write',
			name: 'Help Me Write (write more content to the document)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					
					new PromptModal(this.app, "Help Me Write", "What would you like to write about? \n For example, '5 reasons why we should hire a dedicated designer'", this.obsidianAI.helpMeWrite, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});
		// Continues writing the document using the existing text - Promptless
		this.addCommand({
			id: 'continue-writing',
			name: 'Continue Writing (AI continues based on existing text - propmtless))',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) { 
					
					let fileContents = this.app.vault.cachedRead(activeView.file);
					// Call the corresponding prompt
					let response = this.obsidianAI.continueWriting(await fileContents);
					console.log(editor.getSelection());
					editor.replaceSelection(await response || "");
				}
			}
		});
		// Adds 10 ideas to the document
		this.addCommand({
			id: 'brainstorm-ideas',
			name: 'Brainstorm Ideas (10 ideas based on the topic)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					new PromptModal(this.app, "Brainstorm Ideas", "What would you like to brainstorm about? \n For example, '10 ways to throw a birthday party'", this.obsidianAI.brainstormIdeas, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});
		// Summarizes the current document - Promptless
		this.addCommand({
			id: 'summarize',
			name: 'Summarize (based on existing text - propmtless))',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) { 
					
					let fileContents = this.app.vault.cachedRead(activeView.file);
					// Call the corresponding prompt
					let response = this.obsidianAI.summarize(await fileContents);
					console.log(editor.getSelection());
					editor.replaceSelection(await response);
				}
			}
		});
		// Finds action items in the current document - Promptless
		this.addCommand({
			id: 'find-action-items',
			name: 'Find action items (based on existing text - propmtless))',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) { 
					
					let fileContents = this.app.vault.cachedRead(activeView.file);
					// Call the corresponding prompt
					let response = this.obsidianAI.findActionItems(await fileContents);
					console.log(editor.getSelection());
					editor.replaceSelection(await response || "");
				}
			}
		});
		// Finds action items in the current document - Promptless
		this.addCommand({
			id: 'find-action-items',
			name: 'Find action items (based on existing text - propmtless))',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) { 
					
					let fileContents = this.app.vault.cachedRead(activeView.file);
					// Call the corresponding prompt
					let response = this.obsidianAI.findActionItems(await fileContents);
					console.log(editor.getSelection());
					editor.replaceSelection(await response || "");
				}
			}
		});
		// Write a blog post about the given topic
		this.addCommand({
			id: 'blog-post',
			name: 'Blog Post (Write a blog post about the given topic)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					
					new PromptModal(this.app, "Blog Post", "What should the blog post be about? \n For example, 'the benefits of practicing mindfulness and meditation'", this.obsidianAI.blogPost, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});
		// Write list of 5 pros and 5 cons about the given topic
		this.addCommand({
			id: 'pros-and-cons-list',
			name: 'Pros and Cons List (Write 5 pros and 5 cons list about the given topic)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					
					new PromptModal(this.app, "Pros and Cons List", "What should the blog post be about? \n For example, 'the benefits of practicing mindfulness and meditation'", this.obsidianAI.prosAndConsList, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});
		// Write social media post about the given topic
		this.addCommand({
			id: 'social-media-post',
			name: 'Social Media Post (Write a social media post about the given topic)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					
					new PromptModal(this.app, "Social Media Post", "What should the blog post be about? \n For example, 'the benefits of practicing mindfulness and meditation'", this.obsidianAI.socialMediaPost, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});
		// Write an outline about the given topic
		this.addCommand({
			id: 'outline',
			name: 'Outline (Write an outline about the given topic)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					
					new PromptModal(this.app, "Outline", "What do you want to make an outline for? \n For example, 'a detailed step-by-step process for getting into university'", this.obsidianAI.outline, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});
		// Write a creative story about the given topic
		this.addCommand({
			id: 'creative-story',
			name: 'Creative story (Write a creative story about the given topic)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					
					new PromptModal(this.app, "Creative story", "What kind of story would you like to create? \n For example, 'A sci-fi adventure about a team of astronauts exploring a new planet'", this.obsidianAI.creativeStory, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});
		// Write a poem about the given topic
		this.addCommand({
			id: 'poem',
			name: 'Poem (Write a poem about the given topic)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					
					new PromptModal(this.app, "Poem", "What type of poem would you like to write? \n For example, a sonnet, haiku, free verse, or limerick. Consider what subject or theme you want to explore in your poem and what emotions or images you want to convey to your reader.", this.obsidianAI.poem, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});
		// Write a essay about the given topic
		this.addCommand({
			id: 'essay',
			name: 'Essay (Write a Essay about the given topic)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					
					new PromptModal(this.app, "Essay", "What would you like to write your essay about? \n For example, 'The impact of social media on mental health'", this.obsidianAI.essay, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});
		// Write a meeting agenda about the given topic
		this.addCommand({
			id: 'meeting-agenda',
			name: 'Meeting agenda (Write a meeting agenda about the given topic)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					
					new PromptModal(this.app, "Meeting agenda", "What would you like to include in the meeting agenda? \n For example, 'Project update, review of goals, and team building exercise'.", this.obsidianAI.meetingAgenda, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});
		// Write a press release about the given topic
		this.addCommand({
			id: 'press-release',
			name: 'Press release (Write a press release about the given topic)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					
					new PromptModal(this.app, "Press release", "What would you like to create a press release about? \n For example, 'new product launch'", this.obsidianAI.pressRelease, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});
		// Write a job description about the given topic
		this.addCommand({
			id: 'job-description',
			name: 'Job description (Write a job description about the given topic)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					
					new PromptModal(this.app, "Job description", "What type of job description do you want to create? \n For example, 'Marketing Manager for a tech startup'", this.obsidianAI.jobDescription, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});
		// Write a sales email about the given topic
		this.addCommand({
			id: 'sales-email',
			name: 'Sales email (Write a sales email about the given topic)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					
					new PromptModal(this.app, "Sales email", "What would you like to write in your sales email? \n For example, 'An introduction to your product or service and how it can solve the recipient's problem'", this.obsidianAI.salesEmail, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});
		// Write a recruiting email about the given topic
		this.addCommand({
			id: 'recruiting-email',
			name: 'Recruiting email (Write a recruiting email about the given topic)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {

					new PromptModal(this.app, "Recruiting email", "What position are you recruiting for? \n For example, 'Marketing Manager position at ABC Inc.'", this.obsidianAI.recruitingEmail, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});
		// Improve a given piece of writing
		this.addCommand({
			id: 'improve-writing',
			name: 'Improve writing (Improve a given piece of writing - promptless)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) { 
					
					let fileContents = this.app.vault.cachedRead(activeView.file);
					// Call the corresponding prompt
					let response = this.obsidianAI.improveWriting(await fileContents);
					console.log(editor.getSelection());
					editor.replaceSelection(await response || "");
				}
			}
		});
		// Fix spelling and grammar for a given piece of writing
		this.addCommand({
			id: 'fix-speaking-grammar',
			name: 'Fix speaking and grammar (Fix spelling and grammar for a given piece of writing - promptless)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) { 
					
					let fileContents = this.app.vault.cachedRead(activeView.file);
					// Call the corresponding prompt
					let response = this.obsidianAI.fixSpellingAndGrammar(await fileContents);
					console.log(editor.getSelection());
					editor.replaceSelection(await response || "");
				}
			}
		});
		// Explain a given piece of text
		this.addCommand({
			id: 'explain-this',
			name: 'Explain this text (Explain the given piece of text - promptless)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) { 
					
					let fileContents = this.app.vault.cachedRead(activeView.file);
					// Call the corresponding prompt
					let response = this.obsidianAI.explainThis(await fileContents);
					console.log(editor.getSelection());
					editor.replaceSelection(await response || "");
				}
			}
		});
		// Make the given text longer
		this.addCommand({
			id: 'make-longer',
			name: 'Make longer (Make the given text longer - promptless)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) { 
					
					let fileContents = this.app.vault.cachedRead(activeView.file);
					// Call the corresponding prompt
					let response = this.obsidianAI.makeLonger(await fileContents);
					console.log(editor.getSelection());
					editor.replaceSelection(await response || "");
				}
			}
		});
		// Make the given text shorter
		this.addCommand({
			id: 'make-shorter',
			name: 'Make shorter (Make the given text shorter - promptless)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) { 
					
					let fileContents = this.app.vault.cachedRead(activeView.file);
					// Call the corresponding prompt
					let response = this.obsidianAI.makeShorter(await fileContents);
					console.log(editor.getSelection());
					editor.replaceSelection(await response || "");
				}
			}
		});
		// Rewrite the given text using simpler language
		this.addCommand({
			id: 'use-simpler-language',
			name: 'Use simpler language (Rewrite the given text using simpler language - promptless)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					new PromptModal(this.app, "Make longer", "TODO", this.obsidianAI.useSimplerLanguage, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new ObsidianAISettingTab(this.app, this));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		this.obsidianAI = new ChatGPT(this.settings.apiKey);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class ObsidianAISettingTab extends PluginSettingTab {
	plugin: ObsidianAI;

	constructor(app: App, plugin: ObsidianAI) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for Obsidian AI.'});

		new Setting(containerEl)
			.setName('OpenAI API Key')
			.setDesc('Get it from https://platform.openai.com/account/api-keys')
			.addText(text => text
				.setPlaceholder('API Key')
				.setValue(this.plugin.settings.apiKey)
				.onChange(async (value) => {
					this.plugin.settings.apiKey = value;
					await this.plugin.saveSettings();
				}));
	}
}
