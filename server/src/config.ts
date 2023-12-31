import dotenv from "dotenv";
dotenv.config();

function required(key: string, defaultValue: any = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} id undefined`);
  }
  return value;
}

const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 86400)),
  },
  bcrypt: {
    saltRouds: parseInt(required("BCRYPT_SALT_ROUNDS", 11)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
  db: {
    host: required("DB_HOST"),
  },
  cors: {
    allowedOrigin: required("CORS_ALLOW_ORIGIN"),
  },
  csrf: {
    plainToken: required("CSRF_SECRET_KEY"),
  },
  rateLimit: {
    windowMs: 60000,
    maxRequest: 10,
  },
};

export default config;
