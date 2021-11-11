import * as vscode from "vscode";
import * as path from "path";

import FoldingProvider from "./providers/foldingProvider";
import { provideDocumentFormattingEdits} from "./providers/formattingEditProvidor";
import { provideCompletionItems } from "./providers/completionItemsProvider";

const { VSCODE_DEBUG = false } = process.env;

// TODO: where can we call this to set the tree language after inspecting the document?
// vscode.languages.setTextDocumentLanguage(document, "tree");

// when the extension is activated
export async function activate(context: vscode.ExtensionContext) {

  // TODO: just make this function like the rest :)
  const foldingProvider = new FoldingProvider();
  const provider = vscode.languages.registerFoldingRangeProvider({ language: "tree" }, foldingProvider);
  context.subscriptions.push(provider);

  const editProvidor = vscode.languages.registerDocumentFormattingEditProvider(
    { language: "tree" },
    { provideDocumentFormattingEdits }
  );
  context.subscriptions.push(editProvidor);

  const compltionProivder = vscode.languages.registerCompletionItemProvider(
    { language: "tree" },
    { provideCompletionItems },
    "|"
  );
  context.subscriptions.push(compltionProivder);

  // Open example.tree in a new window when running locally for debugging
  if (VSCODE_DEBUG) {
    const fileUrl = path.join(context.extensionPath, "src/__tests__/trees/tab-lf.tree");
    const document = await vscode.workspace.openTextDocument(fileUrl);
    vscode.window.showTextDocument(document);
  }
}
