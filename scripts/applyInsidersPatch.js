/* eslint-disable */
const fs = require("fs");

// Patch package.json
const date = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
let json = require("../package.json");

json = JSON.stringify({
  ...json,
  name: `${json.name}-insiders`,
  displayName: "Tree (Insiders)",
  version: `${String(date.getFullYear())}.${date.getMonth() + 1}.${date.getDate()}${String(date.getHours()).padStart(
    2,
    "0"
  )}`,
  preview: true,
});
fs.writeFileSync("./package.json", json);
