import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../schema";
import { Client } from "pg";

class Db {
  private _db?: NodePgDatabase<typeof schema>;
  private client?: Client;

  public get db() {
    if (!this._db) {
      throw new Error("Database not connected");
    }
    return this._db;
  }

  async connect() {
    this.client = new Client({
      connectionString: process.env.DB_URL,
    });

    try {
      await this.client.connect();
      this._db = drizzle(this.client, { schema });
      console.log("Database connected");
    } catch (err) {
      console.error("Error connecting to database:", err);
      throw err;
    }
  }

  async createTable(tableName: string, columns: { name: string, type: string }[]) {
    if (!this.client) {
      throw new Error("No DB client");
    }

    const columnsDef = columns.map(col => `"${col.name}" ${col.type}`).join(", ");
    const sql = `CREATE TABLE IF NOT EXISTS "${tableName}" (${columnsDef});`;

    try {
      await this.client.query(sql);
      console.log(`Table ${tableName} created successfully.`);
    } catch (err) {
      console.error(`Error creating table ${tableName}:`, err);
      throw err;
    }
  }

  async insertIntoTable(tableName: string, data: Record<string, any>[]) {
    if (!this.client) {
      throw new Error("No DB client");
    }

    const keys = Object.keys(data[0]);
    const columns = keys.map(key => `"${key}"`).join(", ");
    const valuesPlaceholder = keys.map((_, index) => `$${index + 1}`).join(", ");

    const sql = `INSERT INTO "${tableName}" (${columns}) VALUES (${valuesPlaceholder})`;

    for (const row of data) {
      const values = keys.map(key => row[key]);
      try {
        await this.client.query(sql, values);
      } catch (err) {
        console.error(`Error inserting into table ${tableName}:`, err);
        throw err;
      }
    }
  }
}

export default new Db();

