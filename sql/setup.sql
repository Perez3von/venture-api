-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS ventures CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE ventures (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    venture_id TEXT NOT NULL UNIQUE,
    venture_title TEXT NOT NULL,
    host_email TEXT NOT NULL UNIQUE,
    host_fname TEXT NOT NULL,
    host_image TEXT, 
    chat json,
    participants json 

);

CREATE TABLE users (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
fname TEXT, 
user_email TEXT NOT NULL,
profile_image TEXT,
venture_ref TEXT NOT NULL REFERENCES ventures(venture_id)
);


INSERT INTO ventures (venture_id, venture_title, host_email, host_fname, chat, participants ) VALUES('someVentureID', 'someVentureTitle', 'someEmail@email.com', 'Bill','[{ "customer": "John Doe", "items": {"product": "Beer","qty": 6}}]', '{"host":"Bill"}' );
INSERT INTO users ( user_email, venture_ref, fname) VALUES ('someEmail@email.com', 'someVentureID', 'Bill');