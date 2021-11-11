/* eslint-disable */
const fs = require("fs");

// Patch package.json
const date = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
let json = require("../package.json");

const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours();

const jobId = process.env.GITHUB_JOB;
const version = `${year}.${month}.${day}${hour}-${jobId}`;

json = JSON.stringify({
  ...json,
  name: `${json.name}-insiders`,
  displayName: "Tree (Insiders)",
  version,
  preview: true,
});
fs.writeFileSync("./package.json", json);
