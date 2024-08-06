import { createCSSRuleFromPropertyValue } from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";
import { handleValuespaceValue } from "#root/src/generateCSS/utils/parse_utils/handleValuespaceValue.js";
import { handlePrimitiveValueType } from "#root/src/generateCSS/utils/parse_utils/handlePrimitiveValueType.js";
import { handleArrayValueType } from "#root/src/generateCSS/utils/parse_utils/handleArrayValueType.js";

export const handleOneOfValueType = (
  propertyName,
  oneOfArray,
  valuesArray,
  propertiesArray,
  fileContent
) => {
  let CSSRuleStrings = "";
  for (let oneOfOptionValue of oneOfArray) {
    if (oneOfOptionValue.type === "keyword") {
      CSSRuleStrings += createCSSRuleFromPropertyValue(
        propertyName,
        oneOfOptionValue.name
      );
    }
    if (oneOfOptionValue.type === "valuespace") {
      CSSRuleStrings += handleValuespaceValue(
        propertyName,
        oneOfOptionValue.name,
        valuesArray,
        propertiesArray,
        fileContent
      );
    }
    if (oneOfOptionValue.type === "primitive") {
      CSSRuleStrings += handlePrimitiveValueType(
        propertyName,
        oneOfOptionValue.name
      );
    }
    if (oneOfOptionValue.type === "array") {
      CSSRuleStrings += handleArrayValueType(
        propertyName,
        oneOfOptionValue.items,
        valuesArray,
        propertiesArray,
        fileContent
      );
    }
  }
  fileContent += CSSRuleStrings;
  return fileContent;
};
