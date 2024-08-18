import { handleArrayTypeValue } from "#root/src/generateCSS/utils/parse_utils/handleArrayTypeValue.js";
import { handleOneOfValueType } from "#root/src/generateCSS/utils/parse_utils/handleOneOfValueType.js";
import { createCSSRuleFromPropertyValue } from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";

export const handleParsedDefinitionSyntax = (
  propertyName,
  parsedValueObject,
  valuesArray,
  propertiesArray,
  fileContent
) => {
  let CSSRuleStrings = "";
  let arrayOfValues = [];
  if (parsedValueObject?.type === "array") {
    console.log("CHECK IF THIS FIRES AT SOME POINT");
    CSSRuleStrings += handleArrayTypeValue(
      propertyName,
      parsedValueObject,
      valuesArray,
      propertiesArray,
      fileContent
    );
  } else {
    for (let combinatorType in parsedValueObject) {
      if (combinatorType === "oneOf") {
        let oneOfValueTypeValues = handleOneOfValueType(
          propertyName,
          parsedValueObject[combinatorType],
          valuesArray,
          propertiesArray,
          fileContent
        );
        arrayOfValues.push(oneOfValueTypeValues);
      }
    }
  }
  arrayOfValues.forEach((value) => {
    CSSRuleStrings += createCSSRuleFromPropertyValue(
      propertyName,
      value.join(" ")
    );
  });
  console.log("CSSRULESTRINGS");
  console.log(CSSRuleStrings);

  fileContent += CSSRuleStrings;
  return fileContent;
};
