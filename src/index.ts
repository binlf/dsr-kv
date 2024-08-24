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
  const deserializedKeys: string[] = [];
  const getKeys = <T>(obj: T) => {
    // parse array literal
    if (Array.isArray(obj)) {
      for (const element of obj) {
        if (element.length && Array.isArray(element)) getKeys(element);
        if (typeof element === "object" && element !== null)
          parseObjLiteral(element);
      }
    } else parseObjLiteral(obj);
  };

  // parse object literal
  const parseObjLiteral = (obj: any) => {
    for (const [key, value] of Object.entries(obj)) {
      deserializedKeys.push(key);
      if (Array.isArray(value)) {
        getKeys(value);
      }
      // else if (typeof (value === "object") && !Array.isArray(obj))
      //   parseObjLiteral(value);
    }
  };
  getKeys(jsonObj);
  return deserializedKeys;
};

// for (const [key, value] of Object.entries(obj as any)) {
//   if (Array.isArray(value)) getKeys(value);
//   deserializedKeys.push(key);
// }

export { deSerializeKv, deSerializeKv as dsr };

const arrObj = {
  person: {
    name: "Bob",
    age: 25,
    address: {
      street: "123 Main St",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
    },
    interests: ["coding", "gaming", "music"],
  },
  vehicle: {
    make: "Toyota",
    model: "Camry",
    year: 2023,
    color: "Blue",
  },
  pets: [
    {
      name: "Max",
      species: "Dog",
      breed: "Golden Retriever",
    },
    {
      name: "Luna",
      species: "Cat",
      breed: "Siamese",
    },
  ],
};
const stringifiedJsonObject = JSON.stringify(arrObj);
console.log("Input: ", stringifiedJsonObject);
console.log("Output: ", deSerializeKv(stringifiedJsonObject));
