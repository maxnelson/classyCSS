import { handleArrayValueType } from "#root/src/generateCSS/utils/parse_utils/handleArrayValueType.js";
import { handleOneOfTypeValue } from "#root/src/generateCSS/utils/parse_utils/handleOneOfTypeValue.js";

export const handleParsedValueObject = (
  propertyName,
  parsedValueObject,
  valuesArray,
  propertiesArray,
  fileContent
) => {
  let CSSRuleStrings = "";
  if (parsedValueObject?.type === "array") {
    console.log("placeholder for function to handle array type value");
    CSSRuleStrings += handleArrayValueType(
      propertyName,
      parsedValueObject.items,
      valuesArray,
      propertiesArray,
      fileContent
    );
  } else {
    for (let combinatorType in parsedValueObject) {
      if (combinatorType === "oneOf") {
        CSSRuleStrings += handleOneOfTypeValue(
          propertyName,
          parsedValueObject[combinatorType],
          valuesArray,
          propertiesArray,
          fileContent
        );
      }
    }
  }

  fileContent += CSSRuleStrings;
  return fileContent;
};
