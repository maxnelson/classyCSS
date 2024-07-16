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
      propertyName !== "font-weight"
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
  console.log(parsedValueObject);
  let CSSRuleStrings = "";
  let combinatorType;
  let propertyValueObjectCollection;
  if (parsedValueObject.type === "array") {
    CSSRuleStrings += handleParsedValueObject(
      propertyName,
      parsedValueObject.items,
      valuesArray,
      fileContent
    );
  } else if (Array.isArray(parsedValueObject)) {
    for (let i = 0; i < parsedValueObject.length; i++) {
      CSSRuleStrings += handleParsedValueObject(
        propertyName,
        parsedValueObject[i],
        valuesArray,
        fileContent
      );
    }
  } else {
    for (combinatorType in parsedValueObject) {
      if (combinatorType === "oneOf") {
        propertyValueObjectCollection = parsedValueObject[combinatorType];
        console.log(propertyValueObjectCollection);
        for (propertyValueObject in propertyValueObjectCollection) {
          console.log("We should see this firing!");
          console.log(propertyValueObjectCollection[propertyValueObject]);
          CSSRuleStrings += handleParsedValueObject(
            propertyName,
            propertyValueObjectCollection[propertyValueObject],
            valuesArray,
            fileContent
          );
        }
      } else if (combinatorType === "allOf") {
        propertyValueObjectCollection = parsedValueObject[combinatorType];
        for (propertyValueObject in propertyValueObjectCollection) {
          CSSRuleStrings += handleParsedValueObject(
            propertyName,
            propertyValueObjectCollection[propertyValueObject],
            valuesArray,
            fileContent
          );
        }
      } else {
        CSSRuleStrings += handleParsedValueObjectItem(
          propertyName,
          parsedValueObject,
          valuesArray,
          fileContent
        );
      }
    }
  }
  fileContent += CSSRuleStrings;
  return fileContent;
};

const handleParsedValueObjectItem = (
  propertyName,
  parsedValueObjectItem,
  valuesArray,
  fileContent
) => {
  //console.log(parsedValueObjectItem);
  let CSSRuleStrings = "";
  if (parsedValueObjectItem.type === "keyword") {
    CSSRuleStrings += createCSSRuleFromPropertyValue(
      propertyName,
      parsedValueObjectItem.name
    );
  } else if (parsedValueObjectItem.type === "valuespace") {
    console.log("see how many times this fires");
    CSSRuleStrings += handleValuespaceValue(
      propertyName,
      parsedValueObjectItem.name,
      valuesArray,
      fileContent
    );
  } else if (parsedValueObjectItem.type === "array") {
    CSSRuleStrings += handleParsedValueObjectItem(
      propertyName,
      parsedValueObjectItem.items,
      valuesArray
    );
  } else if (parsedValueObjectItem.type === "primitive") {
    CSSRuleStrings += handlePrimitiveValueType(
      propertyName,
      parsedValueObjectItem
    );
  } else {
  }
  fileContent += CSSRuleStrings;
  return fileContent;
};

const handlePrimitiveValueType = (propertyName, valueObject) => {
  let CSSRuleStrings = "";
  const primitiveLookup = customPrimitiveValuesArray[valueObject.name];
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

const handleValuespaceValue = (
  propertyName,
  valueName,
  valuesArray,
  fileContent
) => {
  console.log("handleValuespaceValue");
  let CSSRuleStrings = "";
  const valuespaceValueObject = lookupValueInValuesArray(
    valueName,
    valuesArray
  );
  if (valuespaceValueObject.length !== 0) {
    console.log("see if this even fires at all");
    const parsedValueObject = handleParsedValueObject(
      propertyName,
      valuespaceValueObject,
      valuesArray,
      fileContent
    );
    //CSSRuleStrings += parsedValueObject;
  } else {
    const primitiveLookup = customPrimitiveValuesArray[valueName];
    console.log(primitiveLookup);
  }

  fileContent += CSSRuleStrings;
  return fileContent;
};
