/**
 * Takes a number and returns 4-byte ArrayBuffer.
 *
 * @private
 * @param {number} num - The number to transform.
 * @returns {ArrayBuffer} An ArrayBuffer representation of the number.
 * @memberof TEConnect
 */
function toBufferInt32(num) {
  const arr = new ArrayBuffer(4);
  const view = new DataView(arr);
  view.setUint32(0, num, true);
  return arr;
}
/**
 * Transforms an object payload to Buffer for writing to the server via TCP.
 *
 * @private
 * @param {IPayload} payload - The payload to transform.
 * @returns {Buffer} A Buffer holding the payload.
 * @memberof TEConnect
 */
function toBufferPayload(payload) {
  const dataString = JSON.stringify(payload);
  const length = Buffer.byteLength(dataString, 'utf8');
  const header = Buffer.from(this.toBufferInt32(length));
  const bufferData = Buffer.from(dataString);
  return Buffer.concat([header, bufferData]);
}
/**
 * Transforms a ByteArray representation into a number (int32).
 *
 * @private
 * @param {Buffer} byteArray - The ByteArray to transform.
 * @returns {number} The number.
 * @memberof TEConnect
 */
function toInt32ByteArray(byteArray) {
  let value = 0;
  for (let i = byteArray.length - 1; i >= 0; i--) {
    value = value * 256 + byteArray[i];
  }
  return value;
}
/**
 * Transforms a TCP Buffer response from the Tangible Engine server into a
 * standard object.
 *
 * @private
 * @param {Buffer} response - The Buffer response from the server.
 * @returns {IResponse} An object representation of the server response.
 * @memberof TEConnect
 */
function toObjectBufferPayload(response) {
  const length = this.toInt32ByteArray(response.slice(0, 4));
  const stringData = response.toString('utf8', 4, length + 4);
  if (stringData) {
    try {
      return JSON.parse(stringData);
    } catch (error) {
      console.error(error);
    }
  }
}

exports = {
  toBufferInt32: toBufferInt32,
  toBufferPayload: toBufferPayload,
  toInt32ByteArray: toInt32ByteArray,
  toObjectBufferPayload: toObjectBufferPayload,
};
