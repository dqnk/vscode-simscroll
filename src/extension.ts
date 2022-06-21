// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { text } from 'stream/consumers';
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) { //	for(let i = 0; i < editors.length; i++) {
	//	let critEditors: vscode.TextEditor[];

	context.subscriptions.push(vscode.window.onDidChangeTextEditorVisibleRanges(
		({ textEditor, visibleRanges }) => {
			if (textEditor !== vscode.window.activeTextEditor) {
				return;
			}

			let editors = vscode.window.visibleTextEditors;
			let currEditor = vscode.window.activeTextEditor;
			let critEditors = [];
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
	let disposable = vscode.commands.registerCommand('simscroll.toggleSimScroll', () => {
		let editors = vscode.window.visibleTextEditors;
		let currEditor = vscode.window.activeTextEditor;
		let critEditors = [];
		for (let i = 0; i < editors.length; i++) {
			if (editors[i].document.fileName === currEditor?.document.fileName) {
				critEditors.push(editors[i]);
			}
		}
		context.subscriptions.push(disposable);
	}
	);

}
// this method is called when your extension is deactivated
export function deactivate() { }
