import { treeStringToJson } from "@structure-codes/utils";
import * as fs from "fs";
import * as path from "path";

const dirPath = path.join(__dirname, "trees");
const trees = fs.readdirSync(dirPath);
trees.forEach((file) => {
  const treeString = fs.readFileSync(path.join(dirPath, file)).toString();
  test(`can read tree file: ${file}`, () => {
    const tree = treeStringToJson(treeString);
    expect(typeof tree).toBe("object");
    // Sample excerpt of object being used in testing
    // tree = {
    //   "functions": {
    //     "index": "2342fdsedf32",
    //   },
    //   "src": {
    //     "index": "2342fdsedf32",
    //   },
    //   "static": {
    //     "index": "2342fdsedf32",
    //   },
    // };

    // Number of parents
    const children: string[] = Object.keys(tree);
    expect(children.length).toBe(3);
    const lastChild: string = children[2];
    expect(lastChild).toBe("static");
  });
});
