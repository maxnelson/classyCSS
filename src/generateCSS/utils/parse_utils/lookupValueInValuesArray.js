import { customValuespaceValuesArray } from "#root/src/generateCSS/utils/generate_utils/customValuespaceValues.js";

export function lookupValueInValuesArray(referenceValue, documentValuesArray) {
  const referenceValueFormatted = "<" + referenceValue + ">";
  let referenceValueResolved = documentValuesArray.find(
    (obj) => obj.name === referenceValueFormatted
  );
  let returnValue;
  if (
    referenceValueResolved &&
    (referenceValueResolved.values || referenceValueResolved.value)
  ) {
    if (referenceValueResolved.values) {
      returnValue = compileValuesFromDocumentValuespaceArray(
        referenceValueResolved
      );
    } else if (referenceValueResolved.value) {
      returnValue = referenceValueResolved.value;
    }
  } else {
    returnValue = Object.entries(customValuespaceValuesArray).find(
      ([key, value]) => key === referenceValueFormatted
    )?.[1];
  }
  return returnValue;
}

const compileValuesFromDocumentValuespaceArray = (referenceValueResolved) => {
  let returnArray = [];
  for (let terminalValue in referenceValueResolved.values) {
    returnArray.push(referenceValueResolved.values[terminalValue].name);
  }
  return returnArray.join(" | ");
};

export const lookupPropertyInPropertiesArray = (
  propertyRef,
  propertiesArray
) => {
  const propertyObject = propertiesArray.find(
    (obj) => obj.name === propertyRef
  );
  return propertyObject.value;
};
