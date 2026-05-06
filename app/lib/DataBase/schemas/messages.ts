import {
  date,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
} from "drizzle-orm/mysql-core";

export const messages = mysqlTable("messages", {
  id: serial("id").primaryKey(),
  user_id: serial("user_id"),
  conversation_id: serial("conversation_id"),
  message: text("message"),
  type: mysqlEnum("type", ["question", "answer"]),
  created_at: date("created_at"),
});
