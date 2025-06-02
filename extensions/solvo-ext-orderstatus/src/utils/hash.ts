/**
 * cyrb53 (c) 2018 bryc (github.com/bryc)
 * A fast and simple hash function with decent collision resistance.
 * Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
 * Public domain. Attribution appreciated.
*/

export function cyrb53(input: string, seed = 0): string {
  // Initialize hash variables
  let hash1 = 0xdeadbeef ^ seed;
  let hash2 = 0x41c6ce57 ^ seed;

  // Calculate hash
  for (let index = 0; index < input.length; index++) {
    const charCode = input.charCodeAt(index);
    hash1 = Math.imul(hash1 ^ charCode, 2654435761);
    hash2 = Math.imul(hash2 ^ charCode, 1597334677);
  }

  // Finalize by mixing the bits
  hash1 =
    Math.imul(hash1 ^ (hash1 >>> 16), 2246822507) ^
    Math.imul(hash2 ^ (hash2 >>> 13), 3266489909);
  hash2 =
    Math.imul(hash2 ^ (hash2 >>> 16), 2246822507) ^
    Math.imul(hash1 ^ (hash1 >>> 13), 3266489909);

  // Mix both values into a single 53-bit number and convert to a string
  const finalHash = 4294967296 * (hash2 & 0x1fffff) + (hash1 >>> 0);
  return finalHash.toString();
}