# dsr-kv

De-Serialize object `keys` or `values` in a stringified JSON data structure.

## Installation

To get started, run the command:

```
npm install dsr-kv
```

> [!NOTE]
> _It doesn't deserialize the whole JSON string(as `JSON.parse()` would), instead just the `keys` or `values`(or both) of objects found in the JSON string;_

## Why?

While building [lofo](https://github.com/binlf/lofo), as a step during the program's execution, I wanted to write an `object` data structure to a file. The obvious solution was to `JSON.stringify()` the object first, then write it to the file, but after doing that I ran into this [issue](https://github.com/binlf/lofo/issues/2), where **Next.js** would fail with an error: _`Unexpected object key type`_, when trying to read the "stringified" object.
This function was written just to "ignore"/get over that limitation.
