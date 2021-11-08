import { treeStringToJson } from "../tree";
import * as fs from "fs";
import * as path from "path";


const dirPath = path.join(__dirname, "trees");
const trees = fs.readdirSync(dirPath);
trees.forEach(file => {
  const tree = fs.readFileSync(path.join(dirPath, file)).toString();
  test('can read tree file', () => {
    expect(typeof treeStringToJson(tree)).toBe("object");
    // Number of parents
    expect(Object.values(treeStringToJson(tree)).length).toBe(3);
  });
});