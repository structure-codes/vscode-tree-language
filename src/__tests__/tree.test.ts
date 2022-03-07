import { treeStringToJson } from "@structure-codes/utils";
import * as fs from "fs";
import * as path from "path";

const dirPath = path.join(__dirname, "trees");
const trees = fs.readdirSync(dirPath);
trees.forEach((file) => {
  const treeString = fs.readFileSync(path.join(dirPath, file)).toString();
  test(`can read tree file: ${file}`, () => {
    const tree = treeStringToJson(treeString);

    // Number of parents
    expect(tree.length).toBe(3);
    const lastChild: string = tree[2].name;
    expect(lastChild).toBe("static");
  });
});
