import { readdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import path from "path";
import { fetchJSONFromFile } from "#root/src/generateCSS/utils/fetch_utils/fetchJSONFromFile.js";
import { parseJSONFileResponseData } from "#root/src/generateCSS/utils/parse_utils/parseJSONFileResponseData.js";

export async function fetchJSON() {
  const distDirectory = path.join(global.__basedir, "dist", "css");
  const combinedDistDirectory = path.join(global.__basedir, "dist");
  readdirSync(distDirectory).forEach((file) => {
    rmSync(distDirectory + "/" + file);
  });
  const combinedFilePath = path.join(combinedDistDirectory, "combined.scss");
  writeFileSync(combinedFilePath, "", "utf-8");
  await fetchJSONFromFileAndCompileCSS("CSS");
  await fetchJSONFromFileAndCompileCSS("css-align");
  await fetchJSONFromFileAndCompileCSS("css-backgrounds");
  await fetchJSONFromFileAndCompileCSS("css-flexbox");
  await fetchJSONFromFileAndCompileCSS("css-display");
  await fetchJSONFromFileAndCompileCSS("css-ui");
  await fetchJSONFromFileAndCompileCSS("fill-stroke");
  await fetchJSONFromFileAndCompileCSS("css-position");
  await combineIntoOneFile(distDirectory);
}

const fetchJSONFromFileAndCompileCSS = async (fileName) => {
  const CSSFile = path.join(
    global.__basedir,
    "src",
    "cachedCSS",
    "css",
    fileName + ".json"
  );
  const responseDataCSSFile = await fetchJSONFromFile(CSSFile);
  parseJSONFileResponseData(responseDataCSSFile);
};

const combineIntoOneFile = async (distDirectory) => {
  const outputFile = path.join(distDirectory, "zzz.css");
  readdirSync(distDirectory, (err, files) => {
    const combinedCss = files
      .map((file) => readFileSync(path.join(distDirectory, file), "utf8"))
      .join("\n");
    writeFileSync(outputFile, combinedCss, "utf8");
    console.log(combinedCss);
  });
  console.log("SEE IF THIS FIRES");
};
