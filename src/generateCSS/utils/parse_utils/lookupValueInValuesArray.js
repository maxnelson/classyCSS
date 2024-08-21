export function lookupValueInValuesArray(propertyValue, valuesArray) {
  let valueObject = valuesArray.find(
    (obj) => obj.name === "<" + propertyValue + ">"
  );
  if (valueObject) {
    let returnValue;
    if (valueObject.name === "<absolute-size>") {
      valueObject = {
        values: [
          { name: "xx-small" },
          { name: "x-small" },
          { name: "small" },
          { name: "medium" },
          { name: "large" },
          { name: "x-large" },
          { name: "xx-large" },
        ],
      };
    }
    if (valueObject.name === "<relative-size>") {
      valueObject = {
        values: [{ name: "smaller" }, { name: "larger" }],
      };
    }
    if (valueObject.name === "<uri>") {
      valueObject = {
        values: [{ name: "inherit" }],
      };
    }
    if (valueObject.name === "<margin-width>") {
      valueObject = {
        values: [{ name: "<length>" }, { name: "<percentage>" }],
      };
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
