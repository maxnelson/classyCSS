import { handleArrayTypeValue } from "#root/src/generateCSS/utils/parse_utils/handleArrayTypeValue.js";
import { handleOneOfValueType } from "#root/src/generateCSS/utils/parse_utils/handleOneOfValueType.js";
import { createCSSRuleFromPropertyValue } from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";

export const InputParsedDefinitionSyntax_OutputAllCSSRules = (
  propertyName,
  parsedValueObject,
  valuesArray,
  propertiesArray,
  fileContent
) => {
  //This should be the function that calls the handleParsedDefinitionSyntax
  //It should be the function where we create the array of arrays that gets passed into the lower
  //level functions.
  //It should be the function where the arrays are returned and combined into CSS Rules
};
