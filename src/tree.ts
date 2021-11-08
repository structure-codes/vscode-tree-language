import { nanoid } from "nanoid";

// Use a unique index so that it won't conflict with any file names
export const INDEX_NAME = nanoid();
const EOL_MATCH = /\r?\n/;

/**
 * Scans a line of text for tab chars
 * @param line 
 * @returns Number of tabs in the line
 */
const getNumberOfTabs = (line: string): number => {
  return (line.match(/\t/g) || []).length;
};

/**
 * Get's the tab char based on the first child tree item
 * @param text 
 * @returns A character that represents the tab char
 */
const getTabChar = (text: string): string | null => {
  // Search for the first child in the tree and extract the tab character from there
  const treeLines = text.split(EOL_MATCH);
  const childRegex = /│?(.+)(├──|└──)/;
  const firstChild = treeLines.find(line => line.match(childRegex));
  const match = firstChild?.match(childRegex);
  return match?.[1] || null;
};

/**
 * Converts a tree string output to a json object
 * @param {String} text
 * @returns JSON object representing the tree
 */
export const treeStringToJson = (text: string) => {
  const elements = new Set();
  let prevLine = "";
  const path: string[] = [];
  
  const tabChar = getTabChar(text);
  if (!tabChar) {
    console.error("Unable to parse tab character");
    return {};
  }
  
  // replace whatever tabChar is used with \t in memory to make parsing easier
  const treeFormatted = text.replace(new RegExp(tabChar, "g"), '\t');

  // look for line breaks that works on all platforms
  treeFormatted.split(EOL_MATCH).forEach((line, index) => {
    const isTreeFormat = line.match(/^(\t+)?(│|├──|└──|\t)+ .+/);
    if (!isTreeFormat) return {};
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