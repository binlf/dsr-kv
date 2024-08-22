/**
 * De-Serialize object keys in a JSON string.
 * @param {string} jsonString - The JSON string to be parsed.
 * @example deSerializeKeys('{"hello":"world"}') // Output: '{hello:"world"}'
 */
// todo: extend impl. to work with deeply nested JSON data structures
export const deSerializeKv = (jsonString: string) => {
  const jsonObj = JSON.parse(jsonString);
  if (typeof jsonObj !== "undefined" && typeof jsonObj !== "string") {
    return jsonString
      .split(",")
      .map((token) => {
        const [key, value] = token.split(":");
        return `${key?.replaceAll('"', "")}:${value}`;
      })
      .join(",");
  }
  return jsonString;
};
