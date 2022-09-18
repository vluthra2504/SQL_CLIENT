DROP TABLE IF EXISTS connections;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS queries;

CREATE TABLE users(
   id serial PRIMARY KEY,
   name VARCHAR NOT NULL
);

INSERT INTO users(name) VALUES('SYSTEM');

CREATE TABLE connections (
	id serial PRIMARY KEY,
  user_id INT NOT NULL,
	username VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	host VARCHAR NOT NULL,
  port INT NOT NULL,
  db_name VARCHAR NOT NULL,
	created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
	  REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE queries(
   id serial PRIMARY KEY,
   query_string VARCHAR NOT NULL,
   created_at TIMESTAMP NOT NULL
);

SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';
SELECT 
   table_name, 
   column_name, 
   data_type 
FROM 
   information_schema.columns
WHERE 
   table_name = 'users';