import { customPrimitiveValuesArray } from "#root/src/generateCSS/utils/generate_utils/customPrimitiveValues.js";
import { getCombinations } from "#root/src/generateCSS/utils/parse_utils/getCombinations.js";
import { handleValuespaceValue } from "#root/src/generateCSS/utils/parse_utils/handleValuespaceValue.js";
import { createCSSRuleFromPropertyValue } from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";
import { handlePropertyRefValue } from "#root/src/generateCSS/utils/parse_utils/handlePropertyRefValue.js";
import { handleOneOfValueType } from "#root/src/generateCSS/utils/parse_utils/handleOneOfValueType.js";
import { lookupValueInValuesArray } from "#root/src/generateCSS/utils/parse_utils/lookupValueInValuesArray.js";
import { parsePropDefValue } from "#root/src/generateCSS/utils/parse_utils/css-grammar-parser.js";
import { handleParsedDefinitionSyntax } from "#root/src/generateCSS/utils/parse_utils/newApproach/handleParsedDefinitionSyntax.js";

export const handleArrayTypeValue = (
  propertyName,
  propertyValueArrayObject,
  JSONValuesArray,
  propertiesArray,
  arrayOfFinalValues
) => {
  console.log("lets try this out");
  console.log("propertyValueArrayObject");
  console.log(propertyValueArrayObject);
  if (propertyValueArrayObject.items.type === "valuespace") {
    const valuespaceObject = lookupValueInValuesArray(
      propertyValueArrayObject.items.name,
      JSONValuesArray
    );
    console.log(valuespaceObject);
    let parsedDefinitionSyntax = parsePropDefValue(valuespaceObject);
    console.log(parsedDefinitionSyntax);

    let parsedDefinitionSyntaxValues = handleParsedDefinitionSyntax(
      propertyName,
      parsedDefinitionSyntax,
      JSONValuesArray,
      propertiesArray,
      arrayOfFinalValues
    );
  }

  /*
  arrayOfFinalValues.push(["four"]);
  arrayOfFinalValues.push(["five"]);
  arrayOfFinalValues.push(["six seven"]);
  
  let someNewVar = getCombinations(arrayOfFinalValues);
  console.log("someNewVar");
  console.log(someNewVar);
  arrayOfFinalValues.push(someNewVar);
  */
  return arrayOfFinalValues;
};
