/**
 * De-Serialize object keys or values in a JSON string.
 * @param {string} jsonString - The JSON string to be parsed.
 * @example deserializeKv('{"hello":"world"}') // Output: '{hello:"world"}'.
 */
const deSerializeKv = (jsonString: string) => {
  if (typeof jsonString !== "string") return jsonString;
  if (!jsonString.trim()) return jsonString;

  // parse JSON object
  const jsonObj = JSON.parse(jsonString);
  if (typeof jsonObj !== "object" || jsonObj === null) return jsonString;

  // get all object keys
  const keys = getKeys(jsonObj);

  // deserialize keys
  let deserializedKVJsonString = "";
  keys.forEach(
    (key) =>
      (deserializedKVJsonString = (
        deserializedKVJsonString || jsonString
      ).replaceAll(`"${key}"`, key.replace('"', "")))
  );

  return deserializedKVJsonString;
};

/**
 * Extract object keys from a `JSON` object.
 * @param {string} jsonObj - The `JSON` object.
 * @returns {string[]} An array of `Object` keys found in `JSON` object.
 * @example getKeys({ hello: "world" }) // Output: ["hello"].
 */
const getKeys = <T>(jsonObj: T[] | object) => {
  const keys: Set<string> = new Set();

  // parse array literal
  const parseArrLiteral = <T extends Array<unknown>>(array: T) => {
    for (const element of array) {
      if (Array.isArray(element)) parseArrLiteral(element);
      if (typeof element === "object" && element !== null)
        parseObjLiteral(element);
    }
  };

  // parse object literal
  const parseObjLiteral = <T extends object>(object: T) => {
    for (const [key, value] of Object.entries(object)) {
      keys.add(key);
      if (Array.isArray(value)) parseArrLiteral(value);
      if (typeof value === "object" && !Array.isArray(value) && value !== null)
        parseObjLiteral(value);
    }
  };

  if (Array.isArray(jsonObj)) {
    parseArrLiteral(jsonObj);
  } else parseObjLiteral(jsonObj as object);

  return Array.from(keys);
};

export { deSerializeKv, deSerializeKv as dsr, getKeys };
