-- DROP TABLE user_data

-- CREATE TABLE user_data(
--     id serial PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
--     email VARCHAR(50) UNIQUE NOT NULL,
--     status VARCHAR(50) DEFAULT 'user',
--     password VARCHAR(500) UNIQUE NOT NULL
-- );

-- UPDATE user_data 
-- SET status = 'admin' 
-- WHERE  id = 2;

SELECT *
FROM
user_data;