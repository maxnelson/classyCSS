import { parsePropDefValue } from "#root/src/generateCSS/utils/parse_utils/css-grammar-parser.js";
import {
  createCSSRuleFromPropertyValue,
  createCSSRuleFromCustomPrimitiveValue,
} from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";
import { createFileAndAppendCSSRules } from "#root/src/generateCSS/utils/generate_utils/createFileAndAppendCSSRules.js";
import { lookupValueInValuesArray } from "#root/src/generateCSS/utils/parse_utils/lookupValueInValuesArray.js";
import { customPrimitiveValuesArray } from "#root/src/generateCSS/utils/generate_utils/customPrimitiveValues.js";

export function parseJSONFileResponseData(responseData) {
  const propertiesArray = responseData.properties;
  const valuesArray = responseData.values;
  for (let index = 0; index < propertiesArray.length; index++) {
    let fileContent = "";
    const propertyName = propertiesArray[index].name;
    const propertyValueJoinedString = propertiesArray[index].value;
    if (
      propertyValueJoinedString !== undefined &&
      propertyName === "align-items"
    ) {
      let parsedValueObject = parsePropDefValue(propertyValueJoinedString);
      if (parsedValueObject) {
        fileContent += handleParsedValueObject(
          propertyName,
          parsedValueObject,
          valuesArray,
          fileContent
        );
      }
      createFileAndAppendCSSRules(propertyName, fileContent);
    }
  }
}

const handleParsedValueObject = (
  propertyName,
  parsedValueObject,
  valuesArray,
  fileContent
) => {
  console.log(propertyName);
  let CSSRuleStrings = "";
  if (parsedValueObject?.type === "array") {
    console.log("placeholder for function to handle array type value");
  } else {
    for (let combinatorType in parsedValueObject) {
      if (combinatorType === "oneOf") {
        CSSRuleStrings += handleOneOfTypeValue(
          propertyName,
          parsedValueObject[combinatorType],
          valuesArray,
          fileContent
        );
      }
    }
  }

  fileContent += CSSRuleStrings;
  return fileContent;
};

const handleOneOfTypeValue = (
  propertyName,
  oneOfArray,
  valuesArray,
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
      CSSRuleStrings += handleArrayValueType(
        propertyName,
        oneOfOptionValue.items,
        valuesArray,
        fileContent
      );
    }
  }
  fileContent += CSSRuleStrings;
  return fileContent;
};

const handleArrayValueType = (
  propertyName,
  propertyValueArray,
  valuesArray,
  fileContent
) => {
  let CSSRuleStrings = "";
  let classNameRunningValue = [];
  if (Array.isArray(propertyValueArray)) {
    for (let arrayObjectItem of propertyValueArray) {
      if (arrayObjectItem.type === "valuespace") {
        CSSRuleStrings += handleValuespaceValue(
          propertyName,
          arrayObjectItem.name,
          valuesArray,
          fileContent
        );
      }
    }
  } else {
    for (let arrayObjectItem of propertyValueArray.items) {
      console.log(arrayObjectItem);
      if (arrayObjectItem.type === "valuespace") {
        CSSRuleStrings += handleValuespaceValue(
          propertyName,
          arrayObjectItem.name,
          valuesArray,
          fileContent
        );
      }
    }
  }
  fileContent += CSSRuleStrings;
  return fileContent;
};

const handleValuespaceValue = (
  propertyName,
  valueName,
  valuesArray,
  fileContent
) => {
  let CSSRuleStrings = "";
  const valuespaceValueObject = lookupValueInValuesArray(
    valueName,
    valuesArray
  );
  if (valuespaceValueObject.length !== 0) {
    let formattedList = valuespaceValueObject.join(" | ");
    let parsedValueObject = parsePropDefValue(formattedList);
    CSSRuleStrings += handleParsedValueObject(
      propertyName,
      parsedValueObject,
      valuesArray,
      fileContent
    );
    fileContent += CSSRuleStrings;
    return fileContent;
  }
};

const handlePrimitiveValueType = (propertyName, valueName) => {
  let CSSRuleStrings = "";
  const valueNameFormatted = valueName.replace(/-/g, "_");
  const primitiveLookup = customPrimitiveValuesArray[valueNameFormatted];
  for (let primitiveValue in primitiveLookup) {
    const CSSRuleString = createCSSRuleFromCustomPrimitiveValue(
      propertyName,
      primitiveValue,
      primitiveLookup[primitiveValue]
    );
    CSSRuleStrings += CSSRuleString;
  }
  return CSSRuleStrings;
};
