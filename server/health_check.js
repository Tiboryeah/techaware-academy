const http = require('http');

const check = (port) => {
    const options = {
        hostname: 'localhost',
        port: port,
        path: '/',
        method: 'GET',
        timeout: 2000
    };

    const req = http.request(options, (res) => {
        console.log(`PORT ${port}: Status ${res.statusCode}`);
        res.on('data', () => {});
        res.on('end', () => {});
    });

    req.on('error', (e) => {
        console.error(`PORT ${port}: Error ${e.message}`);
    });

    req.on('timeout', () => {
        console.error(`PORT ${port}: Timeout`);
        req.destroy();
    });

    req.end();
};

check(5000);
check(5173);
