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
  addDefaultValue(arrayOfFinalValues, "initial");
  addDefaultValue(arrayOfFinalValues, "inherit");
  addDefaultValue(arrayOfFinalValues, "unset");
  arrayOfFinalValues = [
    ...new Map(
      arrayOfFinalValues.map((arr) => [JSON.stringify(arr), arr])
    ).values(),
  ];
  arrayOfFinalValues.forEach((value) => {
    returnValue += createCSSRuleFromPropertyValue(
      propertyName,
      value.join(" ")
    );
  });
  return returnValue;
};

const addDefaultValue = (arrayOfFinalValues, defaultValue) => {
  const containsValue = arrayOfFinalValues.some((innerArray) => {
    innerArray.includes(defaultValue);
  });
  if (!containsValue) {
    arrayOfFinalValues.push([defaultValue]);
  }
};
