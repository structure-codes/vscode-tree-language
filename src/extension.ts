import * as vscode from 'vscode';
import FoldingProvider from './foldingProvider';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('extension.tree.reload', () => {
		vscode.window.showInformationMessage('TREE RELOAD');
	});
	context.subscriptions.push(disposable);

	// handle folding provider
	const foldingProvider = new FoldingProvider();
	vscode.languages.registerFoldingRangeProvider({ language: "tree", scheme: "file" }, foldingProvider);

}