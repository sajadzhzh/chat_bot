import {
  date,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";

export const conversations = mysqlTable("conversations", {
  id: serial("id").primaryKey(),
  title: varchar("title", {length: 500}),
  user_id: serial("user_id"),
  created_at: date("created_at"),
});
