CREATE TABLE department(
    department_id serial PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL
);

INSERT INTO department (department_name)
VALUES ('Human Resources'),
('Accounting and Finance'),
('Marketing'),
('Production'),
('IT');
