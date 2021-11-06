import { nanoid } from "nanoid";

// Use a unique index so that it won't conflict with any file names
export const INDEX_NAME = nanoid();

const getNumberOfTabs = (line: string) => {
  return (line.match(/\t/g) || []).length;
};

const getTabChar = (tree: string) => {
  // Search for the first child in the tree and extract the tab character from there
  const treeLines = tree.split(/\r|\r\n|\n/);
  const childRegex = /│?(.+)(├──|└──)/;
  const firstChild = treeLines.find(line => line.match(childRegex));
  const match = firstChild?.match(childRegex);
  return match?.[1];
};

export const treeStringToJson = (tree: string) => {
  const elements = new Set();
  let prevLine = "";
  const path: string[] = [];
  
  const tabChar = getTabChar(tree);
  if (!tabChar) {
    console.error("Unable to parse tab character");
    return;
  }
  
  // replace whatever tabChar is used with \t in memory to make parsing easier
  const treeFormatted = tree.replace(new RegExp(tabChar, "g"), '\t');

  // look for line breaks that works on all platforms
  treeFormatted.split(/\r|\r\n|\n/).forEach((line, index) => {
    const prevPrefix = prevLine.split(" ")[0];
    const prevNumTabs = getNumberOfTabs(prevPrefix);
    const prefix = line.split(" ")[0];
    const numTabs = getNumberOfTabs(prefix);
    const filename: string = line.substr(prefix.length).trim();
    // Pop a certain number of elements from path
    const popCount = numTabs <= prevNumTabs ? prevNumTabs - numTabs + 1 : 0;
    Array(popCount)
      .fill("pop")
      .forEach(() => path.pop());

    /* 
      EXAMPLE OF REDUCER FUNCTION
        For each element in path, return elements[pathItem]
        The result is the branch in elements for the current path
        path = [ "src/", "Home/"]
        elements = { 
          "src/": { 
            "Home/": {} 
          }
        }
        iter1 = elements["src/"]
        iter2 = elements["src/"]["Home/"]
        curr = {}
    */
    const current: any = path.reduce(
      (branch: any, filename: string) => branch[filename],
      elements
    );
    current[filename] = { [INDEX_NAME]: index  };
    prevLine = line;
    path.push(filename);
  });
  return elements;
};