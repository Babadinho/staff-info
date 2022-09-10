-- DROP TABLE staff

-- CREATE TABLE staff(
--     staff_id serial PRIMARY KEY,
--     staff_name VARCHAR(50) NOT NULL,
--     staff_email VARCHAR(50) UNIQUE NOT NULL,
--     staff_phone VARCHAR(50) UNIQUE NOT NULL,
--     staff_image VARCHAR(200),
--     department serial REFERENCES department(department_id)
-- );

SELECT * FROM staff

-- INSERT INTO staff 
--     (staff_name, staff_email, staff_phone, staff_image, department)
-- VALUES 
--     ('Addison Jennings', 'addison.jennings@example.com', '(704) 836-6949', 'https://randomuser.me/api/portraits/women/65.jpg', 1);
