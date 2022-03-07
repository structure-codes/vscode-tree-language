import * as vscode from "vscode";
import { TreeType, treeStringToJson } from "@structure-codes/utils";

const getLastNode = (branch: TreeType) => {
  const indexes: Array<number> = [];
  // Get the last line number that is a child of the given branch
  const getIndexes = (branch: TreeType) => {
    if (branch.children.length === 0) indexes.push(branch._index);
    branch.children.forEach((child) => {
      getIndexes(child);
    });
  };
  getIndexes(branch);
  return Math.max(...indexes);
};

export function provideFoldingRanges(document: vscode.TextDocument): vscode.ProviderResult<vscode.FoldingRange[]> {
  const tree: TreeType[] = treeStringToJson(document.getText());
  const ranges = new Array<vscode.FoldingRange>();
  if (tree.length === 0) return ranges;

  const getRanges = (branch: TreeType) => {
    const startIndex = branch._index;
    const endIndex = getLastNode(branch);
    ranges.push(new vscode.FoldingRange(startIndex, endIndex, vscode.FoldingRangeKind.Region));
    branch.children.forEach((leaf) => {
      getRanges(leaf);
    });
  };

  tree.forEach((branch: TreeType) => {
    getRanges(branch);
  });

  return ranges;
}
