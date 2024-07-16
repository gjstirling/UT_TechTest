import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: `.env.${process.env.NODE_ENV ?? "dev"}` });

export default defineConfig({
  out: "./db/drizzle",
  dialect: "postgresql",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  verbose: true,
  strict: true,
});

