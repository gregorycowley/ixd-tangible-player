const net = require('net');
const patternsObject = require('../../data/patterns.json');
const tangibleObjectA = require('../../data/A0_120_50.json');
const tangibleObjectC = require('../../data/C7_120_70.json');
const tangibleObjectD = require('../../data/D1_135_50.json');
const tangibleObjectE = require('../../data/E2_135_60.json');

// Port number for the TCP server
const PORT = 4945;

function toBufferInt32(num) {
  const arr = new ArrayBuffer(4);
  const view = new DataView(arr);
  view.setUint32(0, num, true);
  return arr;
}

function payloadToBuffer(payload) {
  const dataString = JSON.stringify(payload);
  const length = Buffer.byteLength(dataString, 'utf8');
  const header = Buffer.from(toBufferInt32(length));
  const bufferData = Buffer.from(dataString);
  return Buffer.concat([header, bufferData]);
}
// function convertBufferToInt32(buffer) {
//   const arrayBuffer = new ArrayBuffer(buffer.length);
//   const view = new Uint8Array(arrayBuffer);
//   for (let i = 0; i < buffer.length; i++) {
//     view[i] = buffer[i];
//   }

//   const dataView = new DataView(arrayBuffer);
//   return dataView.getInt32(0, true); // true for little-endian
// }

function toInt32ByteArray(byteArray) {
  let value = 0;
  for (let i = byteArray.length - 1; i >= 0; i--) {
    value = value * 256 + byteArray[i];
  }
  return value;
}

function bufferToObject(response) {
  const length = toInt32ByteArray(response.slice(0, 4));
  const stringData = response.toString('utf8', 4, length + 4);
  if (stringData) {
    try {
      return JSON.parse(stringData);
    } catch (error) {
      console.error(error);
    }
  }
}

// Create a TCP server
const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    // ! Initial received data: {"Type":"Patterns"}
    if (!Buffer.isBuffer(data)) {
      throw new TypeError('The provided argument is not a Buffer.');
    }

    // tangibleObjectA.ID = 'A0';
    // tangibleObjectC.ID = 'C7';
    // tangibleObjectD.ID = 'D1';
    // tangibleObjectE.ID = 'E2';

    const received = bufferToObject(data); // Convert buffer to string using UTF-8 encoding
    console.log('Received A:', received);

    try {
      if (received['Type'] == 'Patterns') {
        socket.write(payloadToBuffer(patternsObject));
      } else if (received['Type'] == 'Update') {
        socket.write(payloadToBuffer(tangibleObjectA));
      } else if (received['Type'] == 'ForceA') {
        socket.write(payloadToBuffer(tangibleObjectA));
      } else if (received['Type'] == 'ForceC') {
        socket.write(payloadToBuffer(tangibleObjectC));
      } else if (received['Type'] == 'ForceD') {
        socket.write(payloadToBuffer(tangibleObjectD));
      } else if (received['Type'] == 'ForceE') {
        socket.write(payloadToBuffer(tangibleObjectE));
      } else {
        socket.write('Unknown data type received');
      }
    } catch (error) {
      console.error('Error processing data:', error);
      socket.write('Error processing data');
    }

    // try {
    //     const jsonObject = JSON.parse(jsonString); // Parse the JSON string into a JSON object
    //     return jsonObject;
    // } catch (error) {
    //     throw new Error('Failed to parse JSON from buffer: ' + error.message);
    // }
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });

  socket.on('error', (error) => {
    console.error('Error:', error);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
