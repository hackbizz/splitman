import requestIp from "request-ip";

export const ipMiddleware = function (req, res, next) {
  const ip_address = requestIp.getClientIp(req);
  req.ip_address = ip_address;
  next();
};
