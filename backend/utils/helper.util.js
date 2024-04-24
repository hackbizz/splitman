import fs from "fs";

const logWriter = (req, message, logType) => {
  fs.appendFileSync(
    "log.txt",
    `${req.ip_address}|${new Date().toISOString()}|${logType}|${message}`
  );
};

const handleError = (req, res, message, logType = "e") => {
  logWriter(req, message, logType);
  res.status(req.statusCode || 500);
  res.send({ message });
};

const encodeText = (cipherKey, text) => {
  return Number(text);
};

const decodeText = (cipherKey, text) => {
  return Number(text);
};

export { handleError, encodeText, decodeText };
