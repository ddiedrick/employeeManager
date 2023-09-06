
SELECT role.title AS Title, role.id, role.salary, role.department_id
FROM role
JOIN employee ON employee.role_id = role.id;


SELECT department.name AS Department, department.id
FROM department
JOIN role on role.id=department.id;

