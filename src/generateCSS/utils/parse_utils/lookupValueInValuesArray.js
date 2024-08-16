import { parsePropDefValue } from "#root/src/generateCSS/utils/parse_utils/css-grammar-parser.js";
import { customPrimitiveValuesArray } from "#root/src/generateCSS/utils/generate_utils/customPrimitiveValues.js";

export function lookupValueInValuesArray(propertyValue, valuesArray) {
  let valueObject = valuesArray.find(
    (obj) => obj.name === "<" + propertyValue + ">"
  );
  if (valueObject) {
    let returnValue;
    console.log("valueObject");
    console.log(valueObject);
    if (valueObject.name === "<margin-width>") {
      //valueObject = { values: ["<length>", "<percentage>"] };
      valueObject = {
        values: [{ name: "<length>" }, { name: "<percentage>" }],
      };
      console.log("this is a margin width");
    }
    if (valueObject.values?.length > 0) {
      let returnArray = [];
      for (let propertyValueObject in valueObject.values) {
        returnArray.push(valueObject.values[propertyValueObject].name);
      }
      returnValue = returnArray.join(" | ");
    } else {
      returnValue = valueObject.value;
    }
    console.log("lookupValueInValuesArray returnObject");
    console.log(returnValue);
    return returnValue;
  }
}

export const lookupPropertyInPropertiesArray = (
  propertyRef,
  propertiesArray
) => {
  const propertyObject = propertiesArray.find(
    (obj) => obj.name === propertyRef
  );
  return propertyObject.value;
};
