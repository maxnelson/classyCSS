import { handleArrayTypeValue } from "#root/src/generateCSS/utils/parse_utils/handleArrayTypeValue.js";
import { handleOneOfValueType } from "#root/src/generateCSS/utils/parse_utils/handleOneOfValueType.js";
import { createCSSRuleFromPropertyValue } from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";
import { handleObjectTypeValue } from "#root/src/generateCSS/utils/parse_utils/newApproach/handleObjectTypeValue.js";
export const handleParsedDefinitionSyntax = (
  propertyName,
  parsedDefinitionSyntax,
  valuesArray,
  propertiesArray
) => {
  //let arrayOfFinalValues = [];
  let arrayOfFinalValues = [["one"], ["two"], ["three"]];

  handleObjectTypeValue(
    propertyName,
    parsedDefinitionSyntax,
    valuesArray,
    propertiesArray,
    arrayOfFinalValues
  );

  //arrayOfFinalValues.push(anotherListofValues);

  let returnValue = "";
  console.log("arrayOfFinalValues");
  console.log(typeof arrayOfFinalValues);
  console.log(Array.isArray(arrayOfFinalValues));
  console.log(arrayOfFinalValues.length);
  console.log(arrayOfFinalValues);
  arrayOfFinalValues.forEach((value) => {
    returnValue += createCSSRuleFromPropertyValue(
      propertyName,
      value.join(" ")
    );
  });
  return returnValue;
};
