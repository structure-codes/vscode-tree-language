import * as vscode from "vscode";

const TREE_CHARS = ["├──", "└──"];

// TODO: this only works on pasting in an "Untitled" file the first time
export function textDocumentChangeProvider(event: vscode.TextDocumentChangeEvent) {
  const { isUntitled, version } = event.document;
  const isFirstPaste = isUntitled && version <= 2;

  if (!isFirstPaste) {
    return;
  }

  const textDocument = event.document;
  const text = textDocument.getText();

  // test if the doc has any tree chars
  if (TREE_CHARS.some((v: string) => text === v)) {
    vscode.languages.setTextDocumentLanguage(textDocument, "tree");
  }
}
