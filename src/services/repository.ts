import {v4} from "uuid";
import db from "./db";
import {dataUploads} from "../schema";

export async function insert(data: Record<string, any>[]) {
    const tableName = `csv_import_${v4()}`;
    const columns = Object.keys(data[0]).map(key => ({
        name: key,
        type: typeof data[0][key] === 'number' ? 'NUMERIC' : 'TEXT'
    }));

    await db.createTable(tableName, columns);
    await db.insertIntoTable(tableName, data);
    await db.db.insert(dataUploads).values({ table_name: tableName });
}