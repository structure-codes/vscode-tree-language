import * as vscode from "vscode";
import treeStringToJson from "./tree";

class FoldingProvider implements vscode.FoldingRangeProvider {
  onDidChangeFoldingRanges?: vscode.Event<void> | undefined;
  provideFoldingRanges(
    document: vscode.TextDocument,
    context: vscode.FoldingContext,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.FoldingRange[]> {
    const getLastNode = (branch: Record<string, any>) => {
      const indexes: Array<number> = [];
      const getIndexes = (branch: Record<string, any>) => {
        if (Object.values(branch).length === 1) {
          indexes.push(branch.__index);
        } else {
          Object.values(branch).forEach(child => {
            getIndexes(child);
          });
        }
      };
      getIndexes(branch);
      return Math.max(...indexes);
    };

    const ranges = new Array<vscode.FoldingRange>();
    const getRanges = (branch: Record<string, any>) => {
      const children = Object.values(branch);
      if (children.length == 1) return; 
      const startIndex = branch.__index;
      const endIndex = getLastNode(branch);
      ranges.push(new vscode.FoldingRange(startIndex, endIndex, vscode.FoldingRangeKind.Region));
      children.forEach((child) => {
        getRanges(child);
      });
    };
    
    const tree = treeStringToJson(document.getText());
    Object.values(tree).forEach(branch => {
      getRanges(branch);
    });

    return ranges;
  }
}

export default FoldingProvider;
