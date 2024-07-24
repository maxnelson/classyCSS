import { handleArrayValueType } from "#root/src/generateCSS/utils/parse_utils/handleArrayValueType.js";
import { handleOneOfValueType } from "#root/src/generateCSS/utils/parse_utils/handleOneOfValueType.js";

export const handleParsedValueObject = (
  propertyName,
  parsedValueObject,
  valuesArray,
  propertiesArray,
  fileContent
) => {
  console.log("handleParsedValueObject");
  console.log(parsedValueObject);
  let CSSRuleStrings = "";
  if (parsedValueObject?.type === "array") {
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
        CSSRuleStrings += handleOneOfValueType(
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
