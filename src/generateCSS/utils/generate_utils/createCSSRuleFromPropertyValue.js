import { customPrimitiveValuesArray } from "#root/src/generateCSS/utils/generate_utils/customPrimitiveValues.js";

export function createCSSRuleFromPropertyValue(propertyName, propertyValue) {
  const propertyValueFormatted = propertyValue
    .replaceAll(" ", "-")
    .replaceAll("%", "-percent");
  let propertyValueClassFriendly = propertyValueFormatted;
  if (propertyValueFormatted.startsWith("#")) {
    propertyValueClassFriendly = lookupColorClassName(propertyValueFormatted);
  }
  const className = "." + propertyName + "-" + propertyValueClassFriendly;
  const classRule =
    className + " {\n  " + propertyName + ": " + propertyValue + ";\n}\n";
  return classRule;
}

export const createCSSRuleFromCustomPrimitiveValue = (
  propertyName,
  propertyValueName,
  propertyValue
) => {
  const propertyValueNameFormatted =
    propertyValueName.indexOf(" ") == -1
      ? propertyValueName
      : propertyValueName.replace(" ", "-");
  const className = "." + propertyName + "-" + propertyValueNameFormatted;
  const classRule =
    className + " {\n  " + propertyName + ": " + propertyValue + ";\n}\n";
  return classRule;
};

const lookupColorClassName = (propertyValueFormatted) => {
  if (
    Object.values(customPrimitiveValuesArray.color).includes(
      propertyValueFormatted
    )
  ) {
    const keyClassName = Object.entries(customPrimitiveValuesArray.color).find(
      ([key, value]) => value === propertyValueFormatted
    )?.[0];
    return keyClassName;
  }
};
