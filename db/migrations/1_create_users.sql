DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_digest VARCHAR(500) NOT NULL
)