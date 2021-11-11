import * as vscode from "vscode";

const TREE_CHARS = ["├──", "└──"];

// TODO: This is getting rekt by the setting: workbench.editor.languageDetection being true
export function textDocumentChangeProvider(event: vscode.TextDocumentChangeEvent) {
  const { isUntitled, version } = event.document;
  const isFirstPaste = isUntitled && version <= 2;

  // console.log("isFirstPaste", isFirstPaste, "isUitite;d", isUntitled, "version", version);
  if (!isFirstPaste) {
    return;
  }

  const textDocument = event.document;
  const text = textDocument.getText();

  // test if the doc has any tree chars
  if (TREE_CHARS.some((v: string) => text.includes(v))) {
    console.log("Containers tree char, setting lang");
    vscode.languages.setTextDocumentLanguage(textDocument, "tree");
  }
}
