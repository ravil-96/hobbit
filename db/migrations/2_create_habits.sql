DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
  id serial PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  desc VARCHAR(255),
  daily_track INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)