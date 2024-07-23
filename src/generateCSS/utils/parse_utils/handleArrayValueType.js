import { parsePropDefValue } from "#root/src/generateCSS/utils/parse_utils/css-grammar-parser.js";
import { customPrimitiveValuesArray } from "#root/src/generateCSS/utils/generate_utils/customPrimitiveValues.js";

export const handleArrayValueType = (
  propertyName,
  propertyValueArray,
  valuesArray,
  propertiesArray,
  fileContent
) => {
  let CSSRuleStrings = "";
  let classNameRunningValue = [];
  console.log("propertyValueArray");
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
        //console.log(classNameRunningValue);
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

    const combinations = getCombinations(classNameRunningValue);
    combinations.forEach((combination) => {
      CSSRuleStrings += createCSSRuleFromPropertyValue(
        propertyName,
        combination.join(" ")
      );
    });
    /*
    if (classNameRunningValue.length > 0) {
      for (let i = 0; i < classNameRunningValue.length; i++) {
        console.log(classNameRunningValue[i]);
        let 
        for (let j = 0; j < classNameRunningValue[i].length; j++) {
          console.log(classNameRunningValue[i][j]);
        }
      }
      
      let classNameRunningValueFormatted = classNameRunningValue.join(" ");
      CSSRuleStrings += createCSSRuleFromPropertyValue(
        propertyName,
        classNameRunningValueFormatted
      );
      
    }
      */
  } else {
    console.log("see if this fires");

    if (propertyValueArray.items?.length > 0) {
      for (let arrayObjectItem of propertyValueArray.items) {
        //check for oneOf type
        console.log(arrayObjectItem);
        if (arrayObjectItem.type === "valuespace") {
          CSSRuleStrings += handleValuespaceValue(
            propertyName,
            arrayObjectItem.name,
            valuesArray,
            propertiesArray,
            fileContent
          );
        } else {
          for (let combinatorType in arrayObjectItem) {
            if (combinatorType === "oneOf") {
              console.log(arrayObjectItem[combinatorType]);
            }
          }
        }
        //if (arrayObjectItem) {}
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
