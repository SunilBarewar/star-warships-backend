import { configDotenv } from "dotenv";

configDotenv();

export const ENV_VARS = {
  PORT: process.env.PORT,
  BASE_API_ENDPOINT: process.env.BASE_API_ENDPOINT,
  SERVER_ENV: process.env.SERVER_ENV,
};

export const SERVER_ENVIRONMENT = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  TEST: "test",
};
