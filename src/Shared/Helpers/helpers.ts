export class Helpers {
    public static readonly exception = ['_id'];
    /**
     * Write a string from snake_case to camelCase
     * @param string The string to rewrite in camelCase
     * @param separator The char in the string that will be used to split and rewrite the string
     * @returns the modified string
     */
    public static toCamelCase = (string: string, separator = '_') => {
        if (this.exception.includes(string)) {
            return string;
        }

        const keySplit = string.split(separator);
        let key = keySplit[0];

        for (let i = 1; i < keySplit.length; i++) {
            key += this.capitalize(keySplit[i]);
        }

        return key;
    }

    /**
     * Rewrite an object properties from snake_case to camelCase
     * @param object The object to be rewritten in camelCase
     * @param separator The char in the string that will be used to split and rewrite the string
     * @param subNode The sub object to iterable over (with object = {data: [...]}, subNode will be 'data')
     * @returns the modified string
     */
    public static toCamelCaseObject = (object: any, separator = '_') => {
        const newObject: any = {};

        for (const [key, value] of Object.entries(object)) {
            newObject[this.toCamelCase(key, separator)] = value;
        }

        return newObject;
    }

    /**
     * Capitalize a string (Make the first letter a capital).
     * @param string The string to capitalize
     * @returns the capitalized string
     */
    public static capitalize = (string: string) => `${string[0].toUpperCase()}${string.substring(1)}`;
}