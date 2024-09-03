# dsr-kv

De-Serialize object `keys` or `values` in a stringified JSON object/data structure.

## Installation

To get started, run the command:

```
npm install dsr-kv
```

> [!NOTE]
> _It doesn't deserialize the whole JSON string(as `JSON.parse()` would), instead just the `keys` or `values`(or both) of objects found in the JSON string._

## Why?

While building [lofo](https://www.npmjs.com/package/lofo), as a step during the program's execution, I wanted to write an `object` literal to a file. The obvious solution was to `JSON.stringify()` the object first, then write it to the file but, the result of that approach was this [issue](https://github.com/binlf/lofo/issues/2), where **Next.js** would fail with an error: _`Unexpected object key type`_, when trying to read the "stringified" object. I concluded that the solution was to "deserialize" the object key first, then write to the file. It worked!

At the time, I had a minimal implementation of the idea(that worked), this package is just a "finished" version of that implementation.
> _Of note, is that the there is currently no implementation for deserialization of object `values`(only `keys`) as the use case for that is unclear for now..._

## Usage

```ts
import { dsr } from "dsr-kv"

const data = {
  hello: "world"
}

// Get JSON string;
const jsonString = JSON.stringify(data); // Output: '{"hello":"world"}'

// Deserialize object keys found in JSON string;
dsr(jsonString) // Output: '{hello:"world"}'
```

