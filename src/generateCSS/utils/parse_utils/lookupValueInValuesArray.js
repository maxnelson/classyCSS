import { parsePropDefValue } from "#root/src/generateCSS/utils/parse_utils/css-grammar-parser.js";
import { customPrimitiveValuesArray } from "#root/src/generateCSS/utils/generate_utils/customPrimitiveValues.js";

export function lookupValueInValuesArray(propertyValue, valuesArray) {
  const valueObject = valuesArray.find(
    (obj) => obj.name === "<" + propertyValue + ">"
  );
  console.log("valueObject");
  console.log(valueObject);
  if (valueObject) {
    let returnValue = [];
    if (valueObject.values?.length > 0) {
      for (let propertyValueObject in valueObject.values) {
        returnValue.push(valueObject.values[propertyValueObject].name);
        return returnValue;
      }
    } else {
      returnValue.push(valueObject.value);
      return returnValue[0];
    }
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
