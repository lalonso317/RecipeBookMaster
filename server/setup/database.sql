CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL ,
  email VARCHAR(100) NOT NULL ,
  password VARCHAR(128) NOT NULL,
  salt VARCHAR(100)
);

CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(500),
  directions TEXT,
  user_id INT,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  portion INT UNSIGNED,
  metric VARCHAR(45) NOT NULL,
  name VARCHAR(100) NOT NULL,
  recipe_id INT,
  CONSTRAINT fk_recipe FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);