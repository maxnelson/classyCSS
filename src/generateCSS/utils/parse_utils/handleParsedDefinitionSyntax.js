import {
  lookupValueInValuesArray,
  lookupPropertyInPropertiesArray,
} from "#root/src/generateCSS/utils/parse_utils/lookupValueInValuesArray.js";
import { parsePropDefValue } from "#root/src/generateCSS/utils/parse_utils/css-grammar-parser.js";
import { customPrimitiveValuesArray } from "#root/src/generateCSS/utils/generate_utils/customPrimitiveValues.js";

export const handleParsedDefinitionSyntax = (
  propertyName,
  parsedDefinitionSyntax,
  valuesArray,
  propertiesArray,
  arrayOfFinalValues
) => {
  console.log("parsedDefinitionSyntax");
  console.log(parsedDefinitionSyntax);
  if (Array.isArray(parsedDefinitionSyntax)) {
    let compiledArray = [];
    for (let i = 0; i < parsedDefinitionSyntax.length; i++) {
      handleParsedDefinitionSyntax(
        propertyName,
        parsedDefinitionSyntax[i],
        valuesArray,
        propertiesArray,
        arrayOfFinalValues
      );
    }
  } else {
    for (let i = 0; i < Object.keys(parsedDefinitionSyntax).length; i++) {
      const currentKey = Object.keys(parsedDefinitionSyntax)[i];
      if (currentKey === "oneOf" || currentKey === "allOf") {
        const oneOfArray = parsedDefinitionSyntax[currentKey];
        for (let j = 0; j < oneOfArray.length; j++) {
          const oneOfOption = oneOfArray[j];
          if (oneOfOption.type === "keyword") {
            arrayOfFinalValues.push([oneOfOption.name]);
          } else if (oneOfOption.type === "valuespace") {
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
          } else if (oneOfOption.type === "primitive") {
            const valueNameFormatted = oneOfOption.name.replace(/-/g, "_");
            const primitiveLookup =
              customPrimitiveValuesArray[valueNameFormatted];
            for (let primitiveValue in primitiveLookup) {
              arrayOfFinalValues.push([primitiveLookup[primitiveValue]]);
            }
          } else if (oneOfOption.type === "array") {
            handleParsedDefinitionSyntax(
              propertyName,
              oneOfOption.items,
              valuesArray,
              propertiesArray,
              arrayOfFinalValues
            );
          } else if (oneOfOption["oneOf"]) {
            handleParsedDefinitionSyntax(
              propertyName,
              oneOfOption["oneOf"],
              valuesArray,
              propertiesArray,
              arrayOfFinalValues
            );
          }
        }
      } else if (currentKey === "items") {
        const arrayValueType = parsedDefinitionSyntax[currentKey];
        for (let i = 0; i < arrayValueType.length; i++) {
          const currentArrayItem = arrayValueType[i];
          handleParsedDefinitionSyntax(
            propertyName,
            currentArrayItem,
            valuesArray,
            propertiesArray,
            arrayOfFinalValues
          );
        }
      } else if (currentKey === "type") {
        if (parsedDefinitionSyntax.type === "array") {
          handleParsedDefinitionSyntax(
            propertyName,
            parsedDefinitionSyntax.items,
            valuesArray,
            propertiesArray,
            arrayOfFinalValues
          );
        }
        if (parsedDefinitionSyntax.type === "valuespace") {
          const valuespaceReturnArray = lookupValueInValuesArray(
            parsedDefinitionSyntax.name,
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
        if (parsedDefinitionSyntax.type === "primitive") {
          const valueNameFormatted = parsedDefinitionSyntax.name.replace(
            /-/g,
            "_"
          );
          const primitiveLookup =
            customPrimitiveValuesArray[valueNameFormatted];
          for (let primitiveValue in primitiveLookup) {
            arrayOfFinalValues.push([primitiveLookup[primitiveValue]]);
          }
        }
        if (parsedDefinitionSyntax.type === "propertyref") {
          const propertyRefValueResolved = lookupPropertyInPropertiesArray(
            parsedDefinitionSyntax.name,
            propertiesArray
          );
          const propertyRefValueParsed = parsePropDefValue(
            propertyRefValueResolved
          );
          handleParsedDefinitionSyntax(
            propertyName,
            propertyRefValueParsed,
            valuesArray,
            propertiesArray,
            arrayOfFinalValues
          );
        }
      }
    }
  }

  return arrayOfFinalValues;
};
