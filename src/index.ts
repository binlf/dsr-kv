/**
 * De-Serialize object keys or values in a JSON string.
 * @param {string} jsonString - The JSON string to be parsed.
 * @example deserializeKv('{"hello":"world"}') // Output: '{hello:"world"}'
 */
const deSerializeKv = (jsonString: string) => {
  if (typeof jsonString !== "string") return jsonString;
  if (!jsonString.trim()) return jsonString;

  // parse JSON object
  const jsonObj = JSON.parse(jsonString);
  if (typeof jsonObj !== "object" || jsonObj === null) return jsonString;

  // extract keys from data structure
  const keys: Set<string> = new Set();
  const getKeys = <T>(jsonObj: T) => {
    // parse array literal
    const parseArrLiteral = (arr: any) => {
      for (const element of arr) {
        if (Array.isArray(element)) parseArrLiteral(element);
        if (typeof element === "object" && element !== null)
          parseObjLiteral(element);
      }
    };

    // parse object literal
    const parseObjLiteral = (obj: any) => {
      for (const [key, value] of Object.entries(obj)) {
        // deserializedKeys.push(key);
        keys.add(key);
        if (Array.isArray(value)) parseArrLiteral(value);
        if (
          typeof value === "object" &&
          !Array.isArray(value) &&
          value !== null
        )
          parseObjLiteral(value);
      }
    };

    if (Array.isArray(jsonObj)) {
      parseArrLiteral(jsonObj);
    } else parseObjLiteral(jsonObj);

    return Array.from(keys);
  };
  getKeys(jsonObj);

  // deserialize keys
  let deserializedJsonString = "";
  keys.forEach(
    (key) =>
      (deserializedJsonString = (
        deserializedJsonString || jsonString
      ).replaceAll(`"${key}"`, key.replace('"', "")))
  );
  return deserializedJsonString;
};

export { deSerializeKv, deSerializeKv as dsr };
