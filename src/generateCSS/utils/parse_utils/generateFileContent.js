import { createCSSRuleFromPropertyValue } from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";
import { handleParsedDefinitionSyntax } from "#root/src/generateCSS/utils/parse_utils/handleParsedDefinitionSyntax.js";
export const generateFileContent = (
  propertyName,
  parsedDefinitionSyntax,
  valuesArray,
  propertiesArray
) => {
  let arrayOfFinalValues = [];
  handleParsedDefinitionSyntax(
    propertyName,
    parsedDefinitionSyntax,
    valuesArray,
    propertiesArray,
    arrayOfFinalValues
  );
  let returnValue = "";
  arrayOfFinalValues.forEach((value) => {
    returnValue += createCSSRuleFromPropertyValue(
      propertyName,
      value.join(" ")
    );
  });
  return returnValue;
};
