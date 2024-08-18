import { parsePropDefValue } from "#root/src/generateCSS/utils/parse_utils/css-grammar-parser.js";
import { lookupValueInValuesArray } from "#root/src/generateCSS/utils/parse_utils/lookupValueInValuesArray.js";
import { handleParsedDefinitionSyntax } from "#root/src/generateCSS/utils/parse_utils/handleParsedDefinitionSyntax.js";
export const handleValuespaceValue = (
  propertyName,
  valueName,
  valuesArray,
  propertiesArray,
  fileContent
) => {
  let CSSRuleStrings = "";
  const valuespaceValueObject = lookupValueInValuesArray(
    valueName,
    valuesArray
  );
  if (valuespaceValueObject?.length > 0) {
    let formattedList = valuespaceValueObject.join(" | ");
    let parsedValueObject = parsePropDefValue(formattedList);
    CSSRuleStrings += handleParsedDefinitionSyntax(
      propertyName,
      parsedValueObject,
      valuesArray,
      propertiesArray,
      fileContent
    );
    fileContent += CSSRuleStrings;
    return fileContent;
  } else {
    return "";
  }
};
