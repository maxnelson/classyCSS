import { readdirSync, rmSync } from "fs";
import path from "path";
import { fetchJSONFromFile } from "#root/src/generateCSS/utils/fetch_utils/fetchJSONFromFile.js";
import { parseJSONFileResponseData } from "#root/src/generateCSS/utils/parse_utils/parseJSONFileResponseData.js";

export async function fetchJSON() {
  const distDirectory = path.join(global.__basedir, "dist", "css");
  readdirSync(distDirectory).forEach((file) => {
    rmSync(distDirectory + "/" + file);
  });
  //await fetchJSONFromFileAndCompileCSS("CSS");
  await fetchJSONFromFileAndCompileCSS("css-align");
  await fetchJSONFromFileAndCompileCSS("css-backgrounds");
  await fetchJSONFromFileAndCompileCSS("css-flexbox");
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
