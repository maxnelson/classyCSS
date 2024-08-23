import { parsePropDefValue } from "#root/src/generateCSS/utils/parse_utils/css-grammar-parser.js";
import { createFileAndAppendCSSRules } from "#root/src/generateCSS/utils/generate_utils/createFileAndAppendCSSRules.js";
import { generateFileContent } from "#root/src/generateCSS/utils/parse_utils/generateFileContent.js";

export function parseJSONFileResponseData(responseData) {
  const propertiesArray = responseData.properties;
  const valuesArray = responseData.values;
  for (let index = 0; index < propertiesArray.length; index++) {
    const propertyName = propertiesArray[index].name;
    const propertyValueDefinitionSyntax = propertiesArray[index].value;
    const CSS2ExclusionList = [
      "font-weight",
      "clip",
      "content",
      "font-family",
      "display",
      "visibility",
      "cursor",
      "background-color",
      "position",
    ];
    const CSS3ExclusionList = [
      "fill",
      "fill-opacity",
      "stroke",
      "stroke-opacity",
    ];
    if (
      propertyValueDefinitionSyntax !== undefined &&
      !(
        responseData.spec.title === "CSS 2" &&
        CSS2ExclusionList.includes(propertyName)
      ) &&
      !(
        responseData.spec.title === "CSS Fill and Stroke Module Level 3" &&
        CSS3ExclusionList.includes(propertyName)
      )
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
