import { App, Modal, Setting } from 'obsidian';
import {Spinner} from 'spin.js';

var opts = {
    lines: 15, // The number of lines to draw
    length: 33, // The length of each line
    width: 2, // The line thickness
    radius: 10, // The radius of the inner circle
    scale: 1, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    speed: 0.5, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-default', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#755be1', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    zIndex: 2000000000, // The z-index (defaults to 2e9)
    className: 'spinner', // The CSS class to assign to the spinner
    position: 'absolute', // Element positioning
};

export class PromptModal extends Modal{
    userInput: string;
    AIresult: string | undefined;
    modalTitle: string;
    placeholder: string;
    callback:  (prompt: string) => Promise<string | undefined>;
    onSubmit: (result: string) => void;

    constructor(app: App, modalTitle: string, placeholder: string, callback: (prompt: string) => Promise<string | undefined>, onSubmit: (result: string) => void){
        super(app);
        this.modalTitle = modalTitle;
        this.placeholder = placeholder;
        this.callback = callback;
        this.onSubmit = onSubmit;
    }

    onOpen(){
        const {contentEl} = this;

        contentEl.createEl('h2', {text: this.modalTitle});

        new Setting(contentEl)
            .setName('Prompt')
            .setDesc('The prompt for Chat GPT')
            .addTextArea(text => text
                .setPlaceholder(this.placeholder)
                .setValue(this.userInput)
                .onChange(async (value) => {
                    this.userInput = value;
                }));

        contentEl.createEl('button', {text: 'Submit'}).addEventListener('click', () => {
            // TODO: Remove the prompt section
            // Add a loading message
            contentEl.createEl('h2', {text: 'Loading...'});
            // Add a loading spinner
            let spinner = new Spinner(opts).spin(contentEl);

            // Send the prompt to ChatGPT
            this.callback(this.userInput).then(async (result) => {
                this.AIresult = await result;
                // Remove the loading message
                contentEl.removeChild(contentEl.lastChild!);
                // Remove the loading spinner
                spinner.stop();

                // Update the result section with the result
                contentEl.createEl('h2', {text: 'Result: '+this.userInput});
                new Setting(contentEl)
                    .setName('Result')
                    .setDesc('The result from ChatGPT')
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
                
                //TODO: Some day implement this
                // Add a button called "Try again" that sends the prompt to GPT-3 again
                // contentEl.createEl('button', {text: 'Try again'}).addEventListener('click', () => {
                //     this.onSubmit(this.AIresult!);
                //     this.close();
                // });

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