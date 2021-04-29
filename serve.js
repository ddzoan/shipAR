const localtunnel = require("localtunnel");
const http = require("http");
const qrcode = require("qrcode-terminal");

const mime = require("mime-types");

const fs = require("fs");

const port = 8080;

http
  .createServer(function (req, res) {
    const file = req.url.substring(1);

    try {
      if (!fs.existsSync(file)) {
        res.writeHead(404, { "content-type": "text/plain" });
        res.write(`File not found: ${file}`);
        res.end();
        return;
      }
      const fsStream = fs.createReadStream(file);
      res.writeHead(200, { "content-type": mime.lookup(file) });
      fsStream.pipe(res);
    } catch (e) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.write(e.toString());
      res.end();
    }
  })
  .listen(port);

(async () => {
  const tunnel = await localtunnel({ port });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  const url = tunnel.url + "/index.html";
  console.log("load app on your mobile device at", url);
  qrcode.generate(url);

  tunnel.on("close", () => {
    // tunnels are closed
  });
})();
