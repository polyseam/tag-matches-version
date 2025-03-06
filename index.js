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

function run() {
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

    const failOnMismatch = !(core.getInput("fail-on-mismatch") === "false");

    const data = parseData(pathToData);

    if (data[key] === tagWithoutPrefix) {
      core.setOutput("matches", true);
    } else if (failOnMismatch) {
      core.setFailed(
        `${pathToData}[${key}] does not match tag ${tagWithoutPrefix}`,
      );
    }

    core.setOutput("matches", false);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
