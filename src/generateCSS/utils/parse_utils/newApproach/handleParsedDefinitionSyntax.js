import { handleArrayTypeValue } from "#root/src/generateCSS/utils/parse_utils/handleArrayTypeValue.js";
import { handleOneOfTypeValue } from "#root/src/generateCSS/utils/parse_utils/newApproach/handleOneOfTypeValue.js";
import { createCSSRuleFromPropertyValue } from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";

export const handleParsedDefinitionSyntax = (
  propertyName,
  parsedDefinitionSyntax,
  valuesArray,
  propertiesArray,
  arrayOfFinalValues
) => {
  console.log("handleParsedDefinitionSyntax");
  console.log(parsedDefinitionSyntax);
  if (Array.isArray(parsedDefinitionSyntax)) {
    console.log("WE GOT AN ARRAY");
  } else {
    for (let combinatorType in parsedDefinitionSyntax) {
      if (combinatorType === "oneOf") {
        handleOneOfTypeValue(
          propertyName,
          parsedDefinitionSyntax[combinatorType],
          valuesArray,
          propertiesArray,
          arrayOfFinalValues
        );
      }
    }
  }
  return arrayOfFinalValues;
};
