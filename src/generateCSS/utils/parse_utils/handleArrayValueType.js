import { customPrimitiveValuesArray } from "#root/src/generateCSS/utils/generate_utils/customPrimitiveValues.js";
import { getCombinations } from "#root/src/generateCSS/utils/parse_utils/getCombinations.js";
export const handleArrayValueType = (
  propertyName,
  propertyValueArray,
  valuesArray,
  propertiesArray,
  fileContent
) => {
  let CSSRuleStrings = "";
  let classNameRunningValue = [];
  console.log("handleArrayValueType");
  console.log(propertyValueArray);
  if (Array.isArray(propertyValueArray)) {
    for (let [index, arrayObjectItem] of propertyValueArray.entries()) {
      classNameRunningValue.push([]);
      if (arrayObjectItem.type === "keyword") {
        classNameRunningValue[index].push(arrayObjectItem.name);
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
              if (oneOfItem.type === "keyword") {
                classNameRunningValue[index].push(oneOfItem.name);
              }
              if (oneOfItem.type === "primitive") {
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
  } else {
    if (propertyValueArray.items?.length > 0) {
      for (let [index, arrayObjectItem] of propertyValueArray.items.entries()) {
        console.log("arrayObjectItem");
        console.log(arrayObjectItem);
        classNameRunningValue.push([]);
        if (arrayObjectItem.type === "valuespace") {
          CSSRuleStrings += handleValuespaceValue(
            propertyName,
            arrayObjectItem.name,
            valuesArray,
            propertiesArray,
            fileContent
          );
        }
        if (arrayObjectItem.type === "array") {
          for (let arrayItem in arrayObjectItem.items) {
            classNameRunningValue.push([]);
            console.log(arrayItem);
          }
          console.log("A DISTINCT MESSAGE");
          console.log(arrayObjectItem.items);
        } else {
          for (let combinatorType in arrayObjectItem) {
            if (combinatorType === "oneOf") {
              let oneOfArray = arrayObjectItem[combinatorType];
              for (let oneOfItem of oneOfArray) {
                if (oneOfItem.type === "keyword") {
                  classNameRunningValue[index].push(oneOfItem.name);
                }
                if (oneOfItem.type === "primitive") {
                  let oneOfItemNameFormatted = oneOfItem.name.replace(
                    /-/g,
                    "_"
                  );
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
  console.log(classNameRunningValue);
  const combinations = getCombinations(classNameRunningValue);
  combinations.forEach((combination) => {
    CSSRuleStrings += createCSSRuleFromPropertyValue(
      propertyName,
      combination.join(" ")
    );
  });
  fileContent += CSSRuleStrings;
  return fileContent;
};
