import { parsePropDefValue } from "#root/src/generateCSS/utils/parse_utils/css-grammar-parser.js";
import { createFileAndAppendCSSRules } from "#root/src/generateCSS/utils/generate_utils/createFileAndAppendCSSRules.js";
import { generateFileContent } from "#root/src/generateCSS/utils/parse_utils/generateFileContent.js";

export function parseJSONFileResponseData(responseData) {
  const propertiesArray = responseData.properties;
  const valuesArray = responseData.values;
  for (let index = 0; index < propertiesArray.length; index++) {
    const propertyName = propertiesArray[index].name;
    const propertyValueDefinitionSyntax = propertiesArray[index].value;
    if (
      propertyValueDefinitionSyntax !== undefined &&
      propertyName !== "font-weight" &&
      propertyName !== "clip" &&
      propertyName !== "content" &&
      propertyName !== "font-family"
    ) {
      let parsedDefinitionSyntax = parsePropDefValue(
        propertyValueDefinitionSyntax
      );
      console.log(propertyName);
      if (parsedDefinitionSyntax) {
        var fileContent = generateFileContent(
          propertyName,
          parsedDefinitionSyntax,
          valuesArray,
          propertiesArray
        );
      }
      createFileAndAppendCSSRules(propertyName, fileContent);
    }
  }
}
