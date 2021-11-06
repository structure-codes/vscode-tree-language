import * as vscode from "vscode";
import FoldingProvider from "./foldingProvider";
import * as path from "path";

const { VSCODE_DEBUG = false } = process.env;

export async function activate(context: vscode.ExtensionContext) {
  const foldingProvider = new FoldingProvider();
  const provider = vscode.languages.registerFoldingRangeProvider({ language: "tree" }, foldingProvider);
  context.subscriptions.push(provider);

  // Open example.tree in a new window when running locally for debugging
  if (VSCODE_DEBUG) {
    const fileUrl = path.join(context.extensionPath, "example.tree");
    const document = await vscode.workspace.openTextDocument(fileUrl);
    vscode.window.showTextDocument(document);
  }
}
