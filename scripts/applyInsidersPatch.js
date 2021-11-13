/* eslint-disable */
const fs = require("fs");

// Patch package.json
const date = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
let json = require("../package.json");

const year = date.getFullYear();
const month = date.getMonth() + 1;

const timestamp = Math.floor(Date.now() / 1000);
const version = `${year}.${month}.${timestamp}`;

json = JSON.stringify({
  ...json,
  name: `${json.name}-insiders`,
  displayName: "Tree (Insiders)",
  version,
  preview: true,
});
fs.writeFileSync("./package.json", json);
