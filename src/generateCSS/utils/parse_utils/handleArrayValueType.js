import { customPrimitiveValuesArray } from "#root/src/generateCSS/utils/generate_utils/customPrimitiveValues.js";
import { getCombinations } from "#root/src/generateCSS/utils/parse_utils/getCombinations.js";
import { handleValuespaceValue } from "#root/src/generateCSS/utils/parse_utils/handleValuespaceValue.js";
import { createCSSRuleFromPropertyValue } from "#root/src/generateCSS/utils/generate_utils/createCSSRuleFromPropertyValue.js";
import { handlePropertyRefValue } from "#root/src/generateCSS/utils/parse_utils/handlePropertyRefValue.js";
import { handleOneOfValueType } from "#root/src/generateCSS/utils/parse_utils/handleOneOfValueType.js";

export const handleArrayValueType = (
  propertyName,
  propertyValueArray,
  valuesArray,
  propertiesArray,
  fileContent
) => {
  let CSSRuleStrings = "";
  let classNameRunningValue = [];
  var oneOfArray;
  console.log("propertyValueArray");
  if (propertyValueArray.items?.length > 0) {
    for (let [index, arrayObjectItem] of propertyValueArray.items.entries()) {
      classNameRunningValue.push([]);
      if (arrayObjectItem.type === "array") {
        oneOfArray = arrayObjectItem.items["oneOf"];
      } else {
        oneOfArray = arrayObjectItem["oneOf"];
      }
      console.log("oneOfArray");
      console.log(oneOfArray);

      for (let oneOfOptionValue of oneOfArray) {
        if (oneOfOptionValue.type === "keyword") {
          classNameRunningValue[index].push(oneOfOptionValue.name);
        }
        if (oneOfOptionValue.type === "valuespace") {
          //console.log(oneOfOptionValue);
        }
        if (oneOfOptionValue.type === "primitive") {
          //console.log(oneOfOptionValue);
          let oneOfItemNameFormatted = oneOfOptionValue.name.replace(/-/g, "_");
          let primitiveLookup =
            customPrimitiveValuesArray[oneOfItemNameFormatted];
          for (let primitiveValue in primitiveLookup) {
            classNameRunningValue[index].push(primitiveLookup[primitiveValue]);
          }
        }
        if (oneOfOptionValue.type === "array") {
          //console.log(oneOfOptionValue);
        }
      }
    }
  }

  /*
  if (propertyValueArray.items?.length > 0) {
    for (let [index, arrayObjectItem] of propertyValueArray.items.entries()) {
      classNameRunningValue.push([]);
      //console.log("arrayObjectItem");
      //console.log(arrayObjectItem);
      if (arrayObjectItem.type === "array") {
        console.log(arrayObjectItem.items);
        for (let combinatorType in arrayObjectItem.items) {
          if (combinatorType === "oneOf") {
            console.log(arrayObjectItem.items[combinatorType]);
            
          }
        }
      } else {
        for (let combinatorType in arrayObjectItem) {
          if (combinatorType === "oneOf") {
            const oneOfArray = arrayObjectItem[combinatorType];
            for (let oneOfOptionValue of oneOfArray) {
              if (oneOfOptionValue.type === "keyword") {
                classNameRunningValue[index].push(oneOfOptionValue.name);
              }
              if (oneOfOptionValue.type === "valuespace") {
                //console.log(oneOfOptionValue);
              }
              if (oneOfOptionValue.type === "primitive") {
                //console.log(oneOfOptionValue);
                let oneOfItemNameFormatted = oneOfOptionValue.name.replace(
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
              if (oneOfOptionValue.type === "array") {
                //console.log(oneOfOptionValue);
              }
            }
            
          CSSRuleStrings += handleOneOfValueType(
            propertyName,
            arrayObjectItem[combinatorType],
            valuesArray,
            propertiesArray,
            fileContent
          );
          
          }

        }
      }
    }
  }
  */

  //Go into the first item in the array, accumulate all its values into the classNameRunningValues
  //Do the same for each item in the array
  console.log("classNameRunningValue");
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

export const handleArrayValueType3 = () => {};
export const handleArrayValueType2 = (
  propertyName,
  propertyValueArray,
  valuesArray,
  propertiesArray,
  fileContent
) => {
  console.log("handleArrayValueType");
  console.log(propertyValueArray);
  let CSSRuleStrings = "";
  let classNameRunningValue = [];
  if (Array.isArray(propertyValueArray)) {
    console.log("one of the options is an array");
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
        console.log("propertyValueArray");
        console.log(propertyValueArray);
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
          }
          for (let combinatorType in arrayObjectItem.items) {
            if (combinatorType === "oneOf") {
              let oneOfObject = arrayObjectItem.items[combinatorType];
              for (let oneOfObjectItem of oneOfObject) {
                if (oneOfObjectItem.type === "primitive") {
                }
              }
            }
          }
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
