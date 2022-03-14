import * as vscode from "vscode";

const TREE_CHARS = ["├──", "└──"];

export async function textDocumentChangeProvider(event: vscode.TextDocumentChangeEvent) {
  const { isUntitled, version } = event.document;
  const isFirstPaste = isUntitled && version <= 2;

  // this will abort if it's not the first paste
  if (!isFirstPaste) {
    return;
  }

  const textDocument = event.document;

  // TODO: this should be optimized to only parse the first x lines as well as only look maybe 5-10 chars over?
  // so maybe a get range 0-50 and then grab only the first 5-10 chars to scan
  const text = textDocument.getText();

  // get the editor config
  const wsConfig = vscode.workspace.getConfiguration("workbench.editor");

  // get current value
  const autoFormatDefault = wsConfig.get("languageDetection");

  // test if the doc has any tree chars
  if (TREE_CHARS.some((v: string) => text.includes(v))) {
    console.log("Tree language was detected, disabled autoformat then enabling syntax highlighting");
    
    // disable auto format
    await wsConfig.update("languageDetection", false, vscode.ConfigurationTarget.Global);
    console.log("Disabled autoformat...");
    console.log("setTextDocumentLanguage start...");
    await vscode.languages.setTextDocumentLanguage(textDocument, "tree");
    console.log("setTextDocumentLanguage end...");

    // HACK: reset to users default after 500ms
    setTimeout(async() => { 
      console.log("Reset autoformat start...");
      await wsConfig.update("languageDetection", autoFormatDefault, vscode.ConfigurationTarget.Global);
      console.log("Reset autoformat end...");
    }, 500);     
    
  }
}
