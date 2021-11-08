import * as vscode from "vscode";
import { INDEX_NAME, treeStringToJson } from "./tree";
import { TreeType } from "./types/treeType";

class FoldingProvider implements vscode.FoldingRangeProvider {
  onDidChangeFoldingRanges?: vscode.Event<void> | undefined;

  provideFoldingRanges(document: vscode.TextDocument): vscode.ProviderResult<vscode.FoldingRange[]> {
    const getLastNode = (branch: TreeType) => {
      const indexes: Array<number> = [];
      // Get the last line number that is a child of the given branch
      const getIndexes = (branch: TreeType) => {
        if (Object.values(branch).length === 1) {
          indexes.push(branch[INDEX_NAME]);
        } else {
          Object.values(branch).forEach((child) => {
            getIndexes(child);
          });
        }
      };
      getIndexes(branch);
      return Math.max(...indexes);
    };

    const ranges = new Array<vscode.FoldingRange>();
    const getRanges = (branch: TreeType) => {
      const children = Object.values(branch);
      // Each branch stores its line index in addition to children, so if there is only 1 child it is the branch's index
      if (children.length == 1) return;
      const startIndex = branch[INDEX_NAME];
      const endIndex = getLastNode(branch);
      ranges.push(new vscode.FoldingRange(startIndex, endIndex, vscode.FoldingRangeKind.Region));
      children.forEach((child) => {
        // The child is either the branch's line index or an Object with more children to parse
        if (typeof child === "number") return;
        getRanges(child);
      });
    };

    const tree: TreeType = treeStringToJson(document.getText());
    if (!tree) return ranges;
    Object.values(tree).forEach((branch: TreeType) => {
      getRanges(branch);
    });

    return ranges;
  }
}

export default FoldingProvider;
