/**
 * Generates RFC4122-complaint UUIDs for product images file names.
 * @see {@link {https://en.wikipedia.org/wiki/Universally_unique_identifier | UUID Wiki Page}}
 * @see {@link {https://stackoverflow.com/a/2117523 | Stack Overflow Reference}}
 *
 * @returns {String}
 */
export default function generateUUIDv4() {
  return '1e7_1e3_4e3_8e3_1e11'.replace(/[018]/g, (char) =>
    (
      char ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (char / 4)))
    ).toString(16)
  )
}
