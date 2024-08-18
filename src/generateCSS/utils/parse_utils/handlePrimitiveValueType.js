import { customPrimitiveValuesArray } from "#root/src/generateCSS/utils/generate_utils/customPrimitiveValues.js";
import { createCSSRuleFromCustomPrimitiveValue } from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";

export const handlePrimitiveValueType = (propertyName, valueName) => {
  let CSSRuleStrings = "";
  const valueNameFormatted = valueName.replace(/-/g, "_");
  const primitiveLookup = customPrimitiveValuesArray[valueNameFormatted];
  for (let primitiveValue in primitiveLookup) {
    const CSSRuleString = createCSSRuleFromCustomPrimitiveValue(
      propertyName,
      primitiveValue,
      primitiveLookup[primitiveValue]
    );
    CSSRuleStrings += CSSRuleString;
  }
  return CSSRuleStrings;
};

export const handlePrimitiveValueType2 = (propertyName, valueName) => {
  let arrayOfValues = [];
  const valueNameFormatted = valueName.replace(/-/g, "_");
  const primitiveLookup = customPrimitiveValuesArray[valueNameFormatted];
  for (let primitiveValue in primitiveLookup) {
    arrayOfValues.push(primitiveLookup[primitiveValue]);
  }
  return arrayOfValues;
};
