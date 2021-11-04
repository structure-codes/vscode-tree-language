import * as vscode from "vscode";
import FoldingProvider from "./foldingProvider";
import * as path from "path";
import * as fs from "fs";
import * as util from "util";

const readFile = util.promisify(fs.readFile);

// Can't get the env to be passed successfully from launch.json
// so for now just comment below line before publishing
const { DEBUG } = process.env;

export async function activate(context: vscode.ExtensionContext) {
  const foldingProvider = new FoldingProvider();
  const provider = vscode.languages.registerFoldingRangeProvider({ language: "tree" }, foldingProvider);
  context.subscriptions.push(provider);

  if (DEBUG) {
    // open new file with tree lang file when VSCODE_DEBUG_MODE is set
    const fileUrl = path.join(context.extensionPath, "example.tree");
    const exampleFile = await readFile(fileUrl.toString());
    const document = await vscode.workspace.openTextDocument({
      language: "tree",
      content: exampleFile.toString(),
    });
    vscode.window.showTextDocument(document);
  }
}
