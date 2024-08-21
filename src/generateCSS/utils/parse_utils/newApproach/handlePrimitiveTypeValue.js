import { customPrimitiveValuesArray } from "#root/src/generateCSS/utils/generate_utils/customPrimitiveValues.js";
import { createCSSRuleFromCustomPrimitiveValue } from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";

export const handlePrimitiveTypeValue = (propertyName, valueName) => {
  let arrayOfValues = [];
  const valueNameFormatted = valueName.replace(/-/g, "_");
  const primitiveLookup = customPrimitiveValuesArray[valueNameFormatted];
  for (let primitiveValue in primitiveLookup) {
    arrayOfValues.push(primitiveLookup[primitiveValue]);
  }
  return arrayOfValues;
};
