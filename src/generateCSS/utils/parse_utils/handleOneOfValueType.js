import { createCSSRuleFromPropertyValue } from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";
import { handleValuespaceValue } from "#root/src/generateCSS/utils/parse_utils/handleValuespaceValue.js";
import {
  handlePrimitiveValueType,
  handlePrimitiveValueType2,
} from "#root/src/generateCSS/utils/parse_utils/handlePrimitiveValueType.js";
import { handleArrayTypeValue } from "#root/src/generateCSS/utils/parse_utils/handleArrayTypeValue.js";

export const handleOneOfValueType2 = (
  propertyName,
  oneOfArray,
  valuesArray,
  propertiesArray,
  fileContent
) => {
  let CSSRuleStrings = "";
  for (let oneOfOptionValue of oneOfArray) {
    if (oneOfOptionValue.type === "keyword") {
      CSSRuleStrings += createCSSRuleFromPropertyValue(
        propertyName,
        oneOfOptionValue.name
      );
    }
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
      CSSRuleStrings += handlePrimitiveValueType(
        propertyName,
        oneOfOptionValue.name
      );
    }
    if (oneOfOptionValue.type === "array") {
      CSSRuleStrings += handleArrayTypeValue(
        propertyName,
        oneOfOptionValue,
        valuesArray,
        propertiesArray,
        fileContent
      );
    }
  }
  fileContent += CSSRuleStrings;
  return fileContent;
};

export const handleOneOfValueType = (
  propertyName,
  oneOfArray,
  valuesArray,
  propertiesArray,
  fileContent
) => {
  let CSSRuleStrings = "";
  let arrayOfValues = [];
  for (let oneOfOptionValue of oneOfArray) {
    if (oneOfOptionValue.type === "keyword") {
      CSSRuleStrings += createCSSRuleFromPropertyValue(
        propertyName,
        oneOfOptionValue.name
      );
    }
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
    if (oneOfOptionValue.type === "array") {
      arrayOfValues = handleArrayTypeValue(
        propertyName,
        oneOfOptionValue,
        valuesArray,
        propertiesArray,
        fileContent
      );
    }
  }
  //fileContent += CSSRuleStrings;
  //console.log("arrayOfValues");
  //console.log(typeof arrayOfValues);
  //console.log(arrayOfValues);
  return arrayOfValues;
};
