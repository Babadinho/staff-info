-- DROP TABLE staff

CREATE TABLE staff(
    staff_id serial PRIMARY KEY,
    staff_name VARCHAR(50) NOT NULL,
    staff_email VARCHAR(50) UNIQUE NOT NULL,
    staff_phone VARCHAR(50) UNIQUE NOT NULL,
    staff_image VARCHAR(200),
    department serial REFERENCES department(department_id)
);