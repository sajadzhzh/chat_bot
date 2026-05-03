import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  userName: varchar('userName', { length: 50 }),
  password: varchar('password', { length: 100 }),
  email: varchar('email', { length: 100 }),
});