
const mysql = require('mysql2');
const inquirer = require("inquirer");

// Connect to database
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

  const options=[
    {
        type: 'list',
        message: "What would you like to do?",
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add department',  'Add role', 'Add employee', 'End'],
        name: 'option'

    }
];

  async function handleOptions(){
    inquirer.prompt(options).then(function(answers){
       
       
        switch(answers.option){
            case 'View all departments':
                console.log("View all departments");
                viewAllDepartments();
                break;
            case 'View all roles':
                console.log("view roles");
                viewAllRoles();
                break;    
            case 'View all employees':
                console.log("view employees");
                viewAllEmployees();
                break;
                   
            case 'Add department':
                addDepartment();
                break;   
            case 'Add role':
                addRole();
                break;   
            case 'Add employee':
                addEmployee();
                break;   
          
            case 'End':
                  db.end();
                  break;     
        }
        return;
    });
   
    
  }
  handleOptions();

  function viewAllEmployees() {
    let sql = `SELECT * FROM employee`;
    db.query(sql, (error, response) => {
      if (error) throw error;
      console.table(response);
      handleOptions();
    });
  };
  
  // View all Roles
  function viewAllRoles()  {
    const sql =     `SELECT * FROM roles`;
    db.query(sql, (error, response) => {
      if (error) throw error;
      console.table(response);
        handleOptions();
    });
  };
  
  // View all Departments
  function viewAllDepartments(){
    const sql =   `SELECT * FROM departments`; 
    db.query(sql, (error, response) => {
      if (error) throw error;
         console.table(response);
         handleOptions();   
    });
  };

  
  addEmployee = async function (firstName, lastName, role, manager ){
  
    inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
      
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
        
      },
      {
        type: 'input',
        name: 'manager',
        message: "Who is the employees manager?",
        
      },
      {
        type: 'input',
        name: 'role',
        message: "What is the employee's role?",
       
      }

     
    ]
   
    ).then(answer => {
      const newEmployee =   `INSERT INTO employee (first_name, last_name, manager_id, role_id)
      VALUES (?,?,?,?)`;
      const answers = [ answer.firstName,answer.lastName,answer.role,answer.manager];
      db.promise().query(newEmployee,answers)
    
      console.log("Employee has been added!")
       viewAllEmployees();
      });
               
                
  
      
    
            
  };
  
  // Add a New Role
  function addRole(){

      inquirer.prompt([
              {
                name: 'newRole',
                type: 'input',
                message: 'What is the name of your new role?',
               
              },
              {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this new role?',
               
              },
              {
                name: 'department',
                type: 'input',
                message: 'Which department?',
               
              }
            ])
            .then((answer) => {
          
  
              const sql =   `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
              const answers = [answer.newRole, answer.salary, answer.department];
  
              db.promise().query(sql, answers)
              console.log(`Role successfully created!`);
              viewAllRoles();
              
            });
        };
    
  
  // Add a New Department
  function addDepartment(){
      inquirer
        .prompt([
          {
            name: 'newDepartment',
            type: 'input',
            message: 'What is the name of your new Department?',
            
          }
        ])
        .then((answer) => {
          let sql = `INSERT INTO departments (name) VALUES (?)`;
          db.query(sql, answer.newDepartment)
            
            console.log("Department successfully created!");
            viewAllDepartments();
        
        });
  };