CREATE TABLE user_data(
    id serial PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'user',
    password VARCHAR(500) UNIQUE NOT NULL
);

INSERT INTO user_data (name, email, password)
VALUES('admin', 'admin@staffinfo.com', 'admin');
INSERT INTO user_data (name, email, password)
VALUES('user', 'user@staffinfo.com', 'user');

UPDATE user_data 
SET status = 'admin' 
WHERE  id = 1;

SELECT *
FROM
user_data;