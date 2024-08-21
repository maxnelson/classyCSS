import { createCSSRuleFromPropertyValue } from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";
import { handleValuespaceValue } from "#root/src/generateCSS/utils/parse_utils/handleValuespaceValue.js";
import { handleArrayTypeValue } from "#root/src/generateCSS/utils/parse_utils/newApproach/handleArrayTypeValue.js";
import { handlePrimitiveTypeValue } from "#root/src/generateCSS/utils/parse_utils/newApproach/handlePrimitiveTypeValue.js";

export const handleOneOfTypeValue = (
  propertyName,
  oneOfTypeValue,
  valuesArray,
  propertiesArray,
  arrayOfFinalValues
) => {
  //console.log("handleOneOfTypeValue");
  //console.log(oneOfTypeValue);
  for (let oneOfTypeValueOption of oneOfTypeValue) {
    console.log("handleOneOfTypeValueOption");
    console.log(oneOfTypeValueOption);
    if (oneOfTypeValueOption.type === "keyword") {
      arrayOfFinalValues.push([oneOfTypeValueOption.name]);
    }
    /*
    if (oneOfOptionValue.type === "valuespace") {
      CSSRuleStrings += handleValuespaceValue(
        propertyName,
        oneOfOptionValue.name,
        valuesArray,
        propertiesArray,
        fileContent
      );
    }
      */
    if (oneOfTypeValueOption.type === "primitive") {
      let arrayOfPrimitiveRefValues = handlePrimitiveTypeValue(
        propertyName,
        oneOfTypeValueOption.name
      );
      for (let primitiveValue of arrayOfPrimitiveRefValues) {
        arrayOfFinalValues.push(primitiveValue);
      }
    }
    if (oneOfTypeValueOption.type === "array") {
      handleArrayTypeValue(
        propertyName,
        oneOfTypeValueOption,
        valuesArray,
        propertiesArray,
        arrayOfFinalValues
      );
    }
  }
  return arrayOfFinalValues;
};
