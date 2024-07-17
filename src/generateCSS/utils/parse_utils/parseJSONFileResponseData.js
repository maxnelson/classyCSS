import { parsePropDefValue } from "#root/src/generateCSS/utils/parse_utils/css-grammar-parser.js";
import {
  createCSSRuleFromPropertyValue,
  createCSSRuleFromCustomPrimitiveValue,
} from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";
import { createFileAndAppendCSSRules } from "#root/src/generateCSS/utils/generate_utils/createFileAndAppendCSSRules.js";
import {
  lookupValueInValuesArray,
  lookupPropertyInPropertiesArray,
} from "#root/src/generateCSS/utils/parse_utils/lookupValueInValuesArray.js";
import { customPrimitiveValuesArray } from "#root/src/generateCSS/utils/generate_utils/customPrimitiveValues.js";

export function parseJSONFileResponseData(responseData) {
  const propertiesArray = responseData.properties;
  const valuesArray = responseData.values;
  for (let index = 0; index < propertiesArray.length; index++) {
    let fileContent = "";
    const propertyName = propertiesArray[index].name;
    const propertyValueJoinedString = propertiesArray[index].value;
    if (propertyValueJoinedString !== undefined && propertyName === "gap") {
      let parsedValueObject = parsePropDefValue(propertyValueJoinedString);
      console.log(propertyName);
      console.log(parsedValueObject);
      if (parsedValueObject) {
        fileContent += handleParsedValueObject(
          propertyName,
          parsedValueObject,
          valuesArray,
          propertiesArray,
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
  propertiesArray,
  fileContent
) => {
  let CSSRuleStrings = "";
  if (parsedValueObject?.type === "array") {
    console.log("placeholder for function to handle array type value");
    CSSRuleStrings += handleArrayValueType(
      propertyName,
      parsedValueObject.items,
      valuesArray,
      propertiesArray,
      fileContent
    );
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
      CSSRuleStrings += handleArrayValueType(
        propertyName,
        oneOfOptionValue.items,
        valuesArray,
        propertiesArray,
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
  propertiesArray,
  fileContent
) => {
  let CSSRuleStrings = "";
  let classNameRunningValue = [];
  if (Array.isArray(propertyValueArray)) {
    for (let [index, arrayObjectItem] of propertyValueArray.entries()) {
      classNameRunningValue.push([]);
      if (arrayObjectItem.type === "keyword") {
        classNameRunningValue.push(arrayObjectItem.name);
      }
      if (arrayObjectItem.type === "propertyref") {
        const propertyRefValueParsed = handlePropertyRefValue(
          propertyName,
          arrayObjectItem.name,
          valuesArray,
          propertiesArray,
          fileContent
        );

        for (let combinatorType in propertyRefValueParsed) {
          if (combinatorType === "oneOf") {
            let oneOfArray = propertyRefValueParsed[combinatorType];
            for (let oneOfItem of oneOfArray) {
              //console.log(oneOfItem);

              if (oneOfItem.type === "keyword") {
                classNameRunningValue[index].push(oneOfItem.name);
              }
              if (oneOfItem.type === "primitive") {
                //console.log("primitive type here!");
                let oneOfItemNameFormatted = oneOfItem.name.replace(/-/g, "_");
                let primitiveLookup =
                  customPrimitiveValuesArray[oneOfItemNameFormatted];
                for (let primitiveValue in primitiveLookup) {
                  classNameRunningValue[index].push(
                    primitiveLookup[primitiveValue]
                  );
                }
              }
            }
          }
        }
        console.log(classNameRunningValue);
      }
      if (arrayObjectItem.type === "valuespace") {
        CSSRuleStrings += handleValuespaceValue(
          propertyName,
          arrayObjectItem.name,
          valuesArray,
          propertiesArray,
          fileContent
        );
      }
    }
    if (classNameRunningValue.length > 0) {
      let classNameRunningValueFormatted = classNameRunningValue.join(" ");
      CSSRuleStrings += createCSSRuleFromPropertyValue(
        propertyName,
        classNameRunningValueFormatted
      );
    }
  } else {
    console.log("see if this fires");
    if (propertyValueArray.items?.length > 0) {
      for (let arrayObjectItem of propertyValueArray.items) {
        if (arrayObjectItem.type === "valuespace") {
          CSSRuleStrings += handleValuespaceValue(
            propertyName,
            arrayObjectItem.name,
            valuesArray,
            propertiesArray,
            fileContent
          );
        }
      }
    } else {
      console.log("no longer an array, needs parsing");
      console.log(propertyValueArray);
      if (propertyValueArray.type === "valuespace") {
        CSSRuleStrings += handleValuespaceValue(
          propertyName,
          propertyValueArray.name,
          valuesArray,
          propertiesArray,
          fileContent
        );
      }
    }
  }
  fileContent += CSSRuleStrings;
  return fileContent;
};

const handlePropertyRefValue = (
  propertyName,
  propertyRefValue,
  valuesArray,
  propertiesArray,
  fileContent
) => {
  console.log("propertyRefValue");
  console.log(propertyRefValue);
  const propertyRefValueResolved = lookupPropertyInPropertiesArray(
    propertyRefValue,
    propertiesArray
  );
  const propertyRefValueParsed = parsePropDefValue(propertyRefValueResolved);
  return propertyRefValueParsed;
};

const handleValuespaceValue = (
  propertyName,
  valueName,
  valuesArray,
  propertiesArray,
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
      propertiesArray,
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
