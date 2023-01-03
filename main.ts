import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, Vault} from 'obsidian';
import { PromptModal } from 'PromptModal';
import {ChatGPT} from './ChatGPT';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	url: string;
	apikey: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	url: 'http://localhost:8080/api/ask',
	apikey: 'adminkey'
}

export default class ObsidianAI extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is a notice!');
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// Just sends the text of the document to the AI
		this.addCommand({
			id: 'ask-question',
			name: 'Ask a question (sends the document text to the AI)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) { 
					console.log(this.settings.url);
					let obsidianAPI = new ChatGPT();
					let fileContents = this.app.vault.cachedRead(activeView.file);
					let response = obsidianAPI.ask(this.settings.url, await fileContents);
					console.log(editor.getSelection());
					editor.replaceSelection(await response || "");
				}
			}
		});
		// Adds more text to an existing document
		this.addCommand({
			id: 'help-me-write',
			name: 'Help me write (write more content to the document)',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					let obsidianAPI = new ChatGPT();
					new PromptModal(this.app, "Help Me Write", "What would you like to write about? \n For example, '5 reasons why we should hire a dedicated designer'", this.settings.url, obsidianAPI.helpMeWrite, (result) => {
						editor.replaceSelection(result || "");
					}).open();
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
					let obsidianAPI = new ChatGPT();
					new PromptModal(this.app, "Test Prompt modal", "What would you like to write about? \n For example, '5 reasons why we should hire a dedicated designer'", this.settings.url, obsidianAPI.brainstormIdeas, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});
		// Adds a command that uses the PromptModal
		this.addCommand({
			id: 'test-prompt-modal',
			name: 'Test Prompt Modal',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					let obsidianAPI = new ChatGPT();
					new PromptModal(this.app, "Test Prompt modal", "What would you like to write about? \n For example, '5 reasons why we should hire a dedicated designer'", this.settings.url, obsidianAPI.helpMeWrite, (result) => {
						editor.replaceSelection(result || "");
					}).open();
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new ObsidianAISettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
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
			.setName('URL')
			.setDesc('The URL for the API')
			.addText(text => text
				.setPlaceholder('http://localhost:8080/api/ask')
				.setValue(this.plugin.settings.url)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.url = value;
					await this.plugin.saveSettings();
				}));
		new Setting(containerEl)
			.setName('Port')
			.setDesc('API Key')
			.addText(text => text
				.setPlaceholder('adminkey')
				.setValue(this.plugin.settings.apikey)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.apikey = value;
					await this.plugin.saveSettings();
				}));
	}
}
