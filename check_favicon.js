
const fs = require('fs');
const path = require('path');

function getPngDimensions(filePath) {
    const buffer = fs.readFileSync(filePath);
    // PNG signature
    if (buffer.toString('hex', 0, 8) !== '89504e470d0a1a0a') {
        console.log('Not a valid PNG file');
        return;
    }
    // IHDR chunk starts at byte 8. Width is at byte 16 (4 bytes), Height at byte 20 (4 bytes)
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    console.log(`Dimensions: ${width}x${height}`);

    if (width !== height) {
        console.log('WARNING: Image is NOT a perfect square. This causes oval distortion in favicons.');
    } else {
        console.log('Image is a perfect square.');
    }
}

try {
    getPngDimensions('client/public/favicon.png');
} catch (e) {
    console.error(e);
}
