import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const dataUploads = pgTable("data_uploads", {
  id: serial("id"),
  table_name: text("table_name"),
});
