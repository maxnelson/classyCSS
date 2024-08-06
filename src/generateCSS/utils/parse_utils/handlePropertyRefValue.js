import { parsePropDefValue } from "#root/src/generateCSS/utils/parse_utils/css-grammar-parser.js";
import { lookupPropertyInPropertiesArray } from "#root/src/generateCSS/utils/parse_utils/lookupValueInValuesArray.js";

export const handlePropertyRefValue = (
  propertyName,
  propertyRefValue,
  valuesArray,
  propertiesArray,
  fileContent
) => {
  const propertyRefValueResolved = lookupPropertyInPropertiesArray(
    propertyRefValue,
    propertiesArray
  );
  const propertyRefValueParsed = parsePropDefValue(propertyRefValueResolved);
  return propertyRefValueParsed;
};
