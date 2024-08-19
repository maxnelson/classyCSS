import { handleArrayTypeValue } from "#root/src/generateCSS/utils/parse_utils/handleArrayTypeValue.js";
import { handleOneOfTypeValue } from "#root/src/generateCSS/utils/parse_utils/newApproach/handleOneOfTypeValue.js";
import { createCSSRuleFromPropertyValue } from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";

export const handleObjectTypeValue = (
  propertyName,
  parsedDefinitionSyntax,
  valuesArray,
  propertiesArray,
  arrayOfFinalValues
) => {
  console.log("see what the deal is 2");
  console.log("parsedDefinitionSyntax");
  console.log(typeof parsedDefinitionSyntax);
  console.log(parsedDefinitionSyntax);
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
  return arrayOfFinalValues;
};
