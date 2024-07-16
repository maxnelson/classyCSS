import fs from "fs";

export async function fetchJSONFromFile(inputFile) {
  let responseData;
  try {
    responseData = JSON.parse(fs.readFileSync(inputFile, "utf8"));
  } catch (error) {
    console.error("Error fetching CSS properties data:", error);
    return null;
  }
  return responseData;
}
