import { lookupValueInValuesArray } from "#root/src/generateCSS/utils/parse_utils/lookupValueInValuesArray.js";
import { parsePropDefValue } from "#root/src/generateCSS/utils/parse_utils/css-grammar-parser.js";
import { customPrimitiveValuesArray } from "#root/src/generateCSS/utils/generate_utils/customPrimitiveValues.js";

export const handleParsedDefinitionSyntax = (
  propertyName,
  parsedDefinitionSyntax,
  valuesArray,
  propertiesArray,
  arrayOfFinalValues
) => {
  //console.log(parsedDefinitionSyntax);
  for (let i = 0; i < Object.keys(parsedDefinitionSyntax).length; i++) {
    const currentKey = Object.keys(parsedDefinitionSyntax)[i];
    if (currentKey === "oneOf") {
      const oneOfArray = parsedDefinitionSyntax[currentKey];
      for (let j = 0; j < oneOfArray.length; j++) {
        const oneOfOption = oneOfArray[j];
        if (oneOfOption.type === "keyword") {
          arrayOfFinalValues.push([oneOfOption.name]);
        }
        if (oneOfOption.type === "valuespace") {
          const valuespaceReturnArray = lookupValueInValuesArray(
            oneOfOption.name,
            valuesArray
          );
          const valuespaceParsedDefinitionSyntax = parsePropDefValue(
            valuespaceReturnArray
          );
          handleParsedDefinitionSyntax(
            propertyName,
            valuespaceParsedDefinitionSyntax,
            valuesArray,
            propertiesArray,
            arrayOfFinalValues
          );
        }
        if (oneOfOption.type === "primitive") {
          console.log(oneOfOption.name);
          const valueNameFormatted = oneOfOption.name.replace(/-/g, "_");
          const primitiveLookup =
            customPrimitiveValuesArray[valueNameFormatted];
          for (let primitiveValue in primitiveLookup) {
            arrayOfFinalValues.push([primitiveLookup[primitiveValue]]);
          }
        } else {
        }
      }
    }
  }

  return arrayOfFinalValues;
};
