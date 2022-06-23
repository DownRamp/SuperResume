CREATE DATABASE "Resume"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE TABLE resume (
	id serial PRIMARY KEY,
   	name VARCHAR ( 50 ) UNIQUE NOT NULL,
	contact VARCHAR (50) NOT NULL,
   	description text NOT NULL
);

CREATE TABLE resumeData (
	id serial PRIMARY KEY,
	resume_id INT NOT NULL,
   	title VARCHAR ( 50 ) UNIQUE NOT NULL,
	type VARCHAR (50) NOT NULL,
   	date text NOT NULL,
   	description text NOT NULL
);
