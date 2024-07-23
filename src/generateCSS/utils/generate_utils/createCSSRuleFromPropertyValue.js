export function createCSSRuleFromPropertyValue(propertyName, propertyValue) {
  const propertyValueFormatted = propertyValue
    .replaceAll(" ", "-")
    .replaceAll("%", "-percent");
  const className = "." + propertyName + "-" + propertyValueFormatted;
  const classRule =
    className + " {\n  " + propertyName + ": " + propertyValue + ";\n}\n";
  //console.log(classRule);
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
  //console.log(classRule);
  return classRule;
};
