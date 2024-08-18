export function createCSSRuleFromPropertyValues(
  propertyName,
  propertyValuesArray
) {
  let CSSRuleStrings = "";
  for (let propertyValue in propertyValuesArray) {
    let CSSRuleString = createCSSRuleFromPropertyValue(
      propertyName,
      propertyValue
    );
    CSSRuleStrings += CSSRuleString;
  }
  return CSSRuleStrings;
}

export function createCSSRuleFromPropertyValue(propertyName, propertyValue) {
  const propertyValueFormatted = propertyValue
    .replaceAll(" ", "-")
    .replaceAll("%", "-percent");
  const className = "." + propertyName + "-" + propertyValueFormatted;
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
