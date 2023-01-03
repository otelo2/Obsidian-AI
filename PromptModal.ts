import { App, Modal, Setting } from 'obsidian';
import { ChatGPT } from './ChatGPT';

export class PromptModal extends Modal{
    userInput: string;
    AIresult: string | undefined;
    modalTitle: string;
    placeholder: string;
    url: string;
    obsidianAI: ChatGPT;
    callback:  (url: string, prompt: string) => Promise<string | undefined>;
    onSubmit: (result: string) => void;

    constructor(app: App, modalTitle: string, placeholder: string, url: string, callback: (url: string, prompt: string) => Promise<string | undefined>, onSubmit: (result: string) => void){
        super(app);
        this.modalTitle = modalTitle;
        this.placeholder = placeholder;
        this.url = url;
        this.callback = callback;
        this.onSubmit = onSubmit;
        this.obsidianAI = new ChatGPT();
    }

    onOpen(){
        const {contentEl} = this;

        contentEl.createEl('h2', {text: this.modalTitle});

        new Setting(contentEl)
            .setName('Prompt')
            .setDesc('The prompt for GPT-3')
            .addTextArea(text => text
                .setPlaceholder(this.placeholder)
                .setValue(this.userInput)
                .onChange(async (value) => {
                    console.log('Prompt: ' + value);
                    this.userInput = value;
                }));

        contentEl.createEl('button', {text: 'Submit'}).addEventListener('click', () => {
            // TODO: Remove the prompt section
            
            // Add a loading message
            contentEl.createEl('h2', {text: 'Loading...'});
            // Send the prompt to GPT-3
            this.callback(this.url, this.userInput).then(async (result) => {
                this.AIresult = await result;
                // Remove the loading message
                contentEl.removeChild(contentEl.lastChild!);
                // Update the result section with the result
                contentEl.createEl('h2', {text: 'Result: '+this.userInput});
                new Setting(contentEl)
                    .setName('Result')
                    .setDesc('The result from GPT-3')
                    .addTextArea(text => text
                        .setPlaceholder('Result')
                        .setValue(this.AIresult!)
                        .setDisabled(true)
                        .onChange(async (value) => {
                            console.log('Result: ' + value);
                            this.userInput = value;
                        }));
                // Add a button to keep the result that closes the modal and returns the result
                contentEl.createEl('button', {text: 'Keep'}).addEventListener('click', () => {
                    this.onSubmit("# "+this.userInput);
                    this.onSubmit(this.AIresult!);
                    this.close();
                });
                
                // Add a button called "Try again" that sends the prompt to GPT-3 again
                contentEl.createEl('button', {text: 'Try again'}).addEventListener('click', () => {
                    // This is probably broken TODO: Fix this
                    this.onSubmit(this.AIresult!);
                    this.close();
                });

                // Add a button called "Discard" that closes the modal and returns an empty string
                contentEl.createEl('button', {text: 'Discard'}).addEventListener('click', () => {
                    this.onSubmit('');
                    this.close();
                });
            });
        
        });

    }

    onClose(){
        let {contentEl} = this;
        contentEl.empty();
    }


}