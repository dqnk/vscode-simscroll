// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) { //	for(let i = 0; i < editors.length; i++) {
	//		console.log("test");
	//		get full document path
	//		console.log(editors[i].document.fileName);
	//	}
	let correspondingLinesHighlight: vscode.TextEditorDecorationType | undefined



	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "simscroll" is now active!');
	context.subscriptions.push(vscode.window.onDidChangeTextEditorVisibleRanges(
		({ textEditor, visibleRanges }) => {
			let editors = vscode.window.visibleTextEditors;
			let currEditor = vscode.window.activeTextEditor;
			let critEditors = [];
			for (let i = 0; i < editors.length; i++) {
				if (editors[i].document.fileName === currEditor?.document.fileName && editors[i] !== currEditor) {
					critEditors.push(editors[i]);
				}
			}


			//console.log(visibleRanges[0].start.line);
			for (let i = 0; i < critEditors.length; i++) {
				//console.log(critEditors[i].document.fileName);
				vscode.window.showTextDocument(critEditors[i].document,
					{
						viewColumn: currEditor?.viewColumn,
						//						selection: new vscode.Range(new vscode.Position(visibleRanges[0].start.line, 0),
						//							new vscode.Position(visibleRanges[0].end.line, 0))
					}
				);
				critEditors[i].revealRange(new vscode.Range(new vscode.Position(visibleRanges[0].start.line, 0), new vscode.Position(visibleRanges[0].end.line, 0)));
				console.log(critEditors.length);
			}
			//	vscode.window.onDidChangeTextEditorSelection(({ selections, textEditor }) => {
			//		correspondingLinesHighlight?.dispose();
			//		correspondingLinesHighlight = vscode.window.createTextEditorDecorationType({ backgroundColor: new vscode.ThemeColor('editor.inactiveSelectionBackground') })
			//		vscode.window.visibleTextEditors
			//			.filter(editor => editor !== textEditor && editor.document.uri.scheme !== 'output')
			//			.forEach((scrolledEditor) => {
			//				scrolledEditor.setDecorations(
			//					correspondingLinesHighlight!,
			//					selections.map(selection => new vscode.Range(selection.anchor, selection.end)
			//					));
			//			});
			//	});
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

		//get full document path
		//			console.log(editors[i].document.fileName);
		//console.log("len: " + critEditors.length);

		for (let i = 0; i < critEditors.length; i++) {
			//console.log(critEditors[i].document.fileName);
		}
		context.subscriptions.push(disposable);
	}
	);

}
// this method is called when your extension is deactivated
export function deactivate() { }
