export const finalPushArray = (fromDb, checker) =>
  [
    ...new Map(
      [...fromDb, ...checker].map((obj) => [obj.sector, obj])
    ).values(),
  ].map((a) => a.id);

export const objectToFormData = (
  obj,
  formData = new FormData(),
  parentKey = ""
) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value && typeof value === "object" && !Array.isArray(value)) {
        if (Object.keys(value).length > 0) {
          objectToFormData(value, formData, formKey);
        } else {
          formData.append(`${formKey}[emptyObj]`, "");
        }
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          value.forEach((item, index) => {
            const arrayKey = `${formKey}[${index}]`;
            if (
              item &&
              typeof item === "object" &&
              Object.keys(item).length > 0
            ) {
              objectToFormData(item, formData, arrayKey);
            } else {
              formData.append(arrayKey, item || "");
            }
          });
        } else {
          formData.append(`${formKey}[emptyArray]`, "");
        }
      } else {
        formData.append(formKey, value || "");
      }
    }
  }
  return formData;
};

export const formDataToObject = (formData) => {
  const obj = {};
  for (let [key, value] of formData.entries()) {
    const keys = key.split("[").map((k) => k.replace("]", ""));
    let tempObj = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      const currentKey = keys[i];
      if (!tempObj[currentKey]) {
        const nextKey = keys[i + 1];
        tempObj[currentKey] = isNaN(nextKey) ? {} : [];
      }
      tempObj = tempObj[currentKey];
    }

    const lastKey = keys[keys.length - 1];
    if (Array.isArray(tempObj)) {
      tempObj[lastKey] = value;
    } else {
      tempObj[lastKey] = value !== "" ? value : "";
    }
  }

  for (const [key, value] of Object.entries(obj)) {
    if (
      typeof value === "object" &&
      (value.hasOwnProperty("emptyArray") || value.hasOwnProperty("emptyObj"))
    ) {
      obj[key] = value.hasOwnProperty("emptyArray") ? [] : {};
    }
  }

  return obj;
};
