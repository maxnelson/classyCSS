import { customPrimitiveValuesArray } from "#root/src/generateCSS/utils/generate_utils/customPrimitiveValues.js";
import { getCombinations } from "#root/src/generateCSS/utils/parse_utils/getCombinations.js";
import { handleValuespaceValue } from "#root/src/generateCSS/utils/parse_utils/handleValuespaceValue.js";
import { createCSSRuleFromPropertyValue } from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";
import { handlePropertyRefValue } from "#root/src/generateCSS/utils/parse_utils/handlePropertyRefValue.js";
import { handleOneOfValueType } from "#root/src/generateCSS/utils/parse_utils/handleOneOfValueType.js";
import { lookupValueInValuesArray } from "#root/src/generateCSS/utils/parse_utils/lookupValueInValuesArray.js";
import { parsePropDefValue } from "#root/src/generateCSS/utils/parse_utils/css-grammar-parser.js";
import { handleParsedDefinitionSyntax } from "#root/src/generateCSS/utils/parse_utils/handleParsedDefinitionSyntax.js";

export const handleArrayTypeValue = (
  propertyName,
  propertyValueArrayObject,
  JSONValuesArray,
  propertiesArray,
  fileContent
) => {
  let propertyValueArrayItems = propertyValueArrayObject.items;
  let CSSRuleStrings = "";
  let runningListOfFinalValues = [];
  var oneOfArray;
  if (propertyValueArrayItems.type === "valuespace") {
    const valuespaceObject = lookupValueInValuesArray(
      propertyValueArrayItems.name,
      JSONValuesArray
    );
    let parsedDefinitionSyntax = parsePropDefValue(valuespaceObject);
    let parsedDefinitionSyntaxValues = handleParsedDefinitionSyntax(
      propertyName,
      parsedDefinitionSyntax,
      JSONValuesArray,
      propertiesArray,
      fileContent
    );
    let parsedDefinitionSyntaxValuesFormatted =
      parsedDefinitionSyntaxValues.split(",");
    runningListOfFinalValues.push([]);
    for (let item of parsedDefinitionSyntaxValuesFormatted) {
      runningListOfFinalValues[0].push(item);
    }
  }
  if (propertyValueArrayItems?.length > 0) {
    for (let [index, arrayObjectItem] of propertyValueArrayItems.entries()) {
      runningListOfFinalValues.push([]);
      if (arrayObjectItem.type === "array") {
        oneOfArray = arrayObjectItem.items["oneOf"];
      } else {
        oneOfArray = arrayObjectItem["oneOf"];
      }

      for (let oneOfOptionValue of oneOfArray) {
        if (oneOfOptionValue.type === "keyword") {
          runningListOfFinalValues[index].push(oneOfOptionValue.name);
        }
        if (oneOfOptionValue.type === "valuespace") {
        }
        if (oneOfOptionValue.type === "primitive") {
          let oneOfItemNameFormatted = oneOfOptionValue.name.replace(/-/g, "_");
          let primitiveLookup =
            customPrimitiveValuesArray[oneOfItemNameFormatted];
          for (let primitiveValue in primitiveLookup) {
            runningListOfFinalValues[index].push(
              primitiveLookup[primitiveValue]
            );
          }
        }
        if (oneOfOptionValue.type === "array") {
        }
      }
    }
  }
  console.log("RUNNINGLISTOFFINALVALUES");
  console.log(runningListOfFinalValues);
  const combinations = getCombinations(runningListOfFinalValues);
  //console.log("COMBINATIONS");
  //console.log(combinations);
  /*
  combinations.forEach((combination) => {
    CSSRuleStrings += createCSSRuleFromPropertyValue(
      propertyName,
      combination.join(" ")
    );
  });
  
  fileContent += CSSRuleStrings;
  */
  //console.log(fileContent);
  //if (propertyValueArrayObject.maxItems) {}
  return combinations;
};
