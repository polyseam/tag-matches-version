const core = require("@actions/core");
const fs = require("fs");
const path = require("path");
const jsonc = require("jsonc-parser");
const yaml = require("yaml");

function parseData(pathToData) {
  const absPath = path.join(process.env.GITHUB_WORKSPACE, pathToData);
  const data = fs.readFileSync(absPath, "utf8");
  if (pathToData.endsWith(".yaml") || pathToData.endsWith(".yml")) {
    return yaml.parse(data);
  }
  return jsonc.parse(data);
}

try {
  // eg. package.json
  const pathToData = core.getInput("file-path");
  // eg. version
  const key = core.getInput("key");
  // eg. v
  const tagPrefix = core.getInput("tag-prefix");
  // eg 1.0.0
  const tagWithoutPrefix = process.env.GITHUB_REF.replace(
    `refs/tags/${tagPrefix}`,
    "",
  );
  const data = parseData(pathToData);
  core.setOutput("matches", data[key] === tagWithoutPrefix);
} catch (error) {
  core.setFailed(error.message);
}
