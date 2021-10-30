import * as vscode from 'vscode';

class FoldingProvider implements vscode.FoldingRangeProvider {
	onDidChangeFoldingRanges?: vscode.Event<void> | undefined;
	provideFoldingRanges(document: vscode.TextDocument, context: vscode.FoldingContext, token: vscode.CancellationToken): vscode.ProviderResult<vscode.FoldingRange[]> {
		console.log("provideFoldingRanges update");
		return [];
	}

}

export default FoldingProvider;