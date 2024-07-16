import express from "express";
import dotenv from "dotenv";
import { v4 } from "uuid";

import { outlierDetection } from "./services/outlierDetection";
import { parseCsv } from "./services/parseCsv";
import db from "./services/db";
import { dataUploads } from "./schema";
import { upload } from "./services/config";

dotenv.config({ path: `.env.${process.env.NODE_ENV ?? "dev"}` });

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

async function main() {
  await db.connect();

  app.get("/", async (req, res) => {
    await db.db.insert(dataUploads).values({ table_name: "test " + Math.random() });
    const fullTable = await db.db.query.dataUploads.findMany();

    res.send("Express + TypeScript Server" + JSON.stringify(fullTable));
  });

  app.post("/upload", upload.single('csvFile'), async (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded");
    }

    try {
      const parsedFile = await parseCsv(file.path);
      if (outlierDetection(parsedFile)) {
        return res.status(422).send("Unprocessable entity - outliers");
      }

      const tableName = `csv_import_${v4()}`;
      const columns = Object.keys(parsedFile[0]).map(key => ({
        name: key,
        type: typeof parsedFile[0][key] === 'number' ? 'NUMERIC' : 'TEXT'
      }));

      await db.createTable(tableName, columns);
      await db.insertIntoTable(tableName, parsedFile);
      await db.db.insert(dataUploads).values({ table_name: tableName });
      res.send("Data is now being stored: " + JSON.stringify(parsedFile));
    } catch (err) {
      console.error(err);
      res.status(422).send("Unprocessable entity");
    }
  });

  app.listen(port, () => {
    console.log(`Server is running at http://${host}:${port}`);
  });
}

main();
