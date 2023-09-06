INSERT INTO departments (name)
VALUES ("Accounting"),
       ("IT"),
       ("Sales"),
       ("Marketing"),
       ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Salesperson", 100000.00, 2),
       ("Lawyer", 175000.00, 4),
       ("Marketing Clerk", 30000.00, 3),
       ("Tech Support", 95000.00, 1);
      

INSERT INTO employee(first_name, last_name, manager_id, role_id )
VALUES("Josh", "Smith", null, 1),
      ("Ashley", "Brown", null, 2),
      ("Marcus", "Jones", 1, 2),
      ("Peggy", "Hill", 1, 1),
      ("Bill", "Burr", 1, 2),
      ("Megan", "Barton", 1, 1);
     