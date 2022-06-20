// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	//	for(let i = 0; i < editors.length; i++) {
	//		console.log("test");
	//		get full document path
	//		console.log(editors[i].document.fileName);
	//	}



	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "simscroll" is now active!');
	context.subscriptions.push(vscode.window.onDidChangeTextEditorVisibleRanges(
		({ textEditor, visibleRanges }) => { console.log(visibleRanges[0].start.line); })
	);

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

		//get full document path
		//			console.log(editors[i].document.fileName);
		console.log("len: " + critEditors.length);

		for (let i = 0; i < critEditors.length; i++) {
			console.log(critEditors[i].document.fileName);
		}
		context.subscriptions.push(disposable);
	}
	);

}
// this method is called when your extension is deactivated
export function deactivate() { }
