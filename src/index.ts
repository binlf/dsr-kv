/**
 * De-Serialize object keys or values in a JSON string.
 * @param {string} jsonString - The JSON string to be parsed.
 * @example deSerializeKeys('{"hello":"world"}') // Output: '{hello:"world"}'
 */
// todo: extend impl. to work with deeply nested JSON data structures
const deSerializeKv = (jsonString: string) => {
  if (typeof jsonString !== "string") return jsonString;
  if (!jsonString.trim()) return jsonString;

  // parse JSON object
  const jsonObj = JSON.parse(jsonString);
  if (typeof jsonObj !== "object" || jsonObj === null) return jsonString;

  // extract keys from data structure
  const getKeys = <T>(jsonObj: T) => {
    const deserializedKeys: string[] = [];

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
        deserializedKeys.push(key);
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

    return deserializedKeys;
  };

  return getKeys(jsonObj);
};

export { deSerializeKv, deSerializeKv as dsr };

const arrObj = ["hello", "world", { null: "hello" }];
const stringifiedJsonObject = JSON.stringify(arrObj);
console.log("Input: ", stringifiedJsonObject);
console.log("Output: ", deSerializeKv(stringifiedJsonObject));
