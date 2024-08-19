import { parsePropDefValue } from "#root/src/generateCSS/utils/parse_utils/css-grammar-parser.js";
import { createFileAndAppendCSSRules } from "#root/src/generateCSS/utils/generate_utils/createFileAndAppendCSSRules.js";
import { handleParsedDefinitionSyntax } from "#root/src/generateCSS/utils/parse_utils/newApproach/handleParsedDefinitionSyntax.js";

export function parseJSONFileResponseData(responseData) {
  const propertiesArray = responseData.properties;
  const valuesArray = responseData.values;
  for (let index = 0; index < propertiesArray.length; index++) {
    const propertyName = propertiesArray[index].name;
    const propertyValueDefinitionSyntax = propertiesArray[index].value;
    if (
      propertyValueDefinitionSyntax !== undefined &&
      //propertyName !== "font-weight" &&
      propertyName === "margin" &&
      propertyName !== "font-weight"
    ) {
      let parsedDefinitionSyntax = parsePropDefValue(
        propertyValueDefinitionSyntax
      );
      console.log(propertyName);
      console.log(parsedDefinitionSyntax);
      if (parsedDefinitionSyntax) {
        var fileContent = handleParsedDefinitionSyntax(
          propertyName,
          parsedDefinitionSyntax,
          valuesArray,
          propertiesArray
        );
      }
      /*
      if (parsedDefinitionSyntax) {
        fileContent += handleParsedDefinitionSyntax(
          propertyName,
          parsedDefinitionSyntax,
          valuesArray,
          propertiesArray,
          fileContent
        );
      }
      */
      createFileAndAppendCSSRules(propertyName, fileContent);
    }
  }
}
