import * as vscode from "vscode";

// will find the first T and check for the next line to have a match
const FOLDING_START = "├──|└──";

// TODO: end segment
const FOLDING_END = "└──";

class FoldingProvider implements vscode.FoldingRangeProvider {
	onDidChangeFoldingRanges?: vscode.Event<void> | undefined;
	provideFoldingRanges(
		document: vscode.TextDocument,
		context: vscode.FoldingContext,
		token: vscode.CancellationToken
	): vscode.ProviderResult<vscode.FoldingRange[]> {
		const ranges = new Array<vscode.FoldingRange>();
    const startMatches: Array<{index: number, tabCount: number}> = [];
		for (let index = 0; index < document.lineCount && !token.isCancellationRequested; index++) {
			const lineText = document.lineAt(index).text;
      const startMatch = lineText.match(FOLDING_START);
      const endMatch = lineText.match(FOLDING_END);
      if (endMatch) {
        console.log("found endMatch at line", index+1);
        const startMatch = startMatches.pop();
        // if there is any previously found starts
        if (startMatch) {
          const { index: startIndex, tabCount: startTabCount }  = startMatch;
          const endTabCount = (lineText.match(/\t/g) || []).length;
          // TODO: fix dis
          // if (startTabCount === endTabCount) {
          //   ranges.push(new vscode.FoldingRange(startIndex, index, vscode.FoldingRangeKind.Region));
          // } else {
          //   startMatches.push(startMatch);
          // }
          ranges.push(new vscode.FoldingRange(startIndex, index, vscode.FoldingRangeKind.Region));
        }
      }
			if (startMatch) {
        if (index + 1 < document.lineCount) {
          const line1TabCount = (lineText.match(/\t/g) || []).length;
          const nextLineText = document.lineAt(index + 1).text;
          const line2TabCount = (nextLineText.match(/\t/g) || []).length;
          // If tabCounts are different, this is a start marker
          if (line1TabCount < line2TabCount) {    
            console.log("found startMatch at line", index+1);
            startMatches.push({index, tabCount: line1TabCount});
          }
        }
			}
		}
		return ranges;
	}
}

export default FoldingProvider;
