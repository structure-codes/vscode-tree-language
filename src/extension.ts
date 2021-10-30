import * as vscode from "vscode";
import FoldingProvider from "./foldingProvider";
import * as path from "path";
import * as fs from "fs";
import * as util from "util";

const readFile = util.promisify(fs.readFile);

console.log(process.env);
const { DEBUG = true } = process.env;

export async function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("extension.tree.reload", () => {
    vscode.window.showInformationMessage("TREE RELOAD");
  });
  context.subscriptions.push(disposable);

  // handle folding provider setup
  const foldingProvider = new FoldingProvider();
  const provider = vscode.languages.registerFoldingRangeProvider({ language: "tree" }, foldingProvider);
  context.subscriptions.push(provider);

  // open new file with tree lang file when VSCODE_DEBUG_MODE is set
  const fileUrl = path.join(context.extensionPath, "example.tree");
  const exampleFile = await readFile(fileUrl.toString());

  console.log("debug", DEBUG);
  if (DEBUG) {
    vscode.window.showInformationMessage("Starting in debug so showign you a tree");
    const document = await vscode.workspace.openTextDocument({
      language: "tree",
      content: exampleFile.toString(),
    });
    vscode.window.showTextDocument(document);
  }
}
