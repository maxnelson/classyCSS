import { createCSSRuleFromPropertyValue } from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";
import { handleValuespaceValue } from "#root/src/generateCSS/utils/parse_utils/handleValuespaceValue.js";
import {
  handlePrimitiveValueType,
  handlePrimitiveValueType2,
} from "#root/src/generateCSS/utils/parse_utils/handlePrimitiveValueType.js";
import { handleArrayTypeValue } from "#root/src/generateCSS/utils/parse_utils/newApproach/handleArrayTypeValue.js";

export const handleOneOfTypeValue = (
  propertyName,
  oneOfTypeValue,
  valuesArray,
  propertiesArray,
  arrayOfFinalValues
) => {
  console.log("oneOfTypeValue");
  console.log(oneOfTypeValue);
  for (let oneOfTypeValueOption of oneOfTypeValue) {
    console.log("oneOfTypeValueOption");
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
    if (oneOfOptionValue.type === "primitive") {
      arrayOfValues.push(
        handlePrimitiveValueType2(propertyName, oneOfOptionValue.name)
      );
    }
    */
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
