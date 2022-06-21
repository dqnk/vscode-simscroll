// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { text } from 'stream/consumers';
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) { //	for(let i = 0; i < editors.length; i++) {
	//	let critEditors: vscode.TextEditor[];
	let toggle = 0;
	let currFile = vscode.window.activeTextEditor?.document.fileName;

	context.subscriptions.push(vscode.window.onDidChangeTextEditorVisibleRanges(
		({ textEditor, visibleRanges }) => {
			//toggle
			if (!toggle) { return; }
			// if you scroll in an inactive editor
			if (textEditor !== vscode.window.activeTextEditor) {
				return;
			}
			// if you edit a different file
			if (textEditor.document.fileName !== currFile) { return; }

			let critEditors = [];

			//currEditor would have to be recalculated in many cases such as other windows being closed
			//therefore it is just recalculated every time
			let currEditor = vscode.window.activeTextEditor;
			let allEditors = vscode.window.visibleTextEditors;
			let editors = [];
			for (let i = 0; i < allEditors.length; i++) {
				if (allEditors[i].document.fileName === currEditor.document.fileName) {
					editors.push(allEditors[i]);
				}
			}

			let currEditorIndex = 0;
			for (let i = 0; i < editors.length; i++) {
				if (editors[i].document.fileName === currEditor?.document.fileName) {
					critEditors.push(editors[i]);
					if (editors[i] === currEditor) {
						currEditorIndex = i;
					}
				}
			}

			let height = visibleRanges[0].end.line - visibleRanges[0].start.line;
			let anchor = visibleRanges[0].start.line - height * currEditorIndex;

			for (let i = 0; i < critEditors.length; i++) {
				if (critEditors[i] === currEditor) {
					anchor += height;
					continue;
				}
				vscode.window.showTextDocument(critEditors[i].document,
					{
						viewColumn: currEditor?.viewColumn,
					}
				);
				critEditors[i].revealRange(new vscode.Range(new vscode.Position(anchor, 0), new vscode.Position(anchor + height, 0)));
				anchor += height;
				console.log(critEditors.length);
			}
		}));



	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let enable = vscode.commands.registerCommand('simscroll.enableSimScroll', () => {
		toggle = 1;
		currFile = vscode.window.activeTextEditor?.document.fileName;
	}
	);
	let disable = vscode.commands.registerCommand('simscroll.disableSimScroll', () => { toggle = 0; });

}
// this method is called when your extension is deactivated
export function deactivate() { }
