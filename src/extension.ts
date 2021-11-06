import * as vscode from "vscode";
import FoldingProvider from "./foldingProvider";
import * as path from "path";
import * as fs from "fs";
import * as util from "util";

const readFile = util.promisify(fs.readFile);
const { VSCODE_DEBUG = false } = process.env;

export async function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("extension.tree.reload", () => {
    vscode.window.showInformationMessage("TREE RELOAD");
  });
  context.subscriptions.push(disposable);

  // handle folding provider setup
  const foldingProvider = new FoldingProvider();
  const provider = vscode.languages.registerFoldingRangeProvider({ language: "tree" }, foldingProvider);
  context.subscriptions.push(provider);

  // open new file with tree lang file when VSCODE_DEBUG is set
  if (VSCODE_DEBUG) {
    const fileUrl = path.join(context.extensionPath, "example.tree");
    const exampleFile = await readFile(fileUrl.toString());
    const document = await vscode.workspace.openTextDocument({
      language: "tree",
      content: exampleFile.toString(),
    });
    vscode.window.showTextDocument(document);
  }
}
