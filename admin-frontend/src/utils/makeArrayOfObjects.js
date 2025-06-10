const makeArrayOfObjects = (arr, name, key = "value") =>
    Array.isArray(arr)
        ? arr.map((v, g) =>
            typeof v === "object"
                ? { id: `${name}${g}`, ...v }
                : { id: `${name}${g}`, [key]: v }
        )
        : [];

export default makeArrayOfObjects;