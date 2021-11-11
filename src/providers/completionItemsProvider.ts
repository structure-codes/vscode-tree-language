
import * as vscode from "vscode";

// This is how we can provide intellisense/autocomplete

export function provideCompletionItems(
  document: vscode.TextDocument,
  position: vscode.Position,
  token: vscode.CancellationToken
): Promise<vscode.CompletionItem[]> {
  const items: Array<vscode.CompletionItem> = [];

  // items.push(new vscode.CompletionItem("├──", vscode.CompletionItemKind.Text));
  return Promise.resolve(items);
}
