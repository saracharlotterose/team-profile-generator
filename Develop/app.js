const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Choices = require("inquirer/lib/objects/choices");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employeeArray = [];

// Write code to use inquirer to gather information about the development team members,
function userinput() {
    const questions = [
      {
        message : `Please build your team`,
        name : "managername",
        type: "input",
        message: "Please enter the name of your manager ",
      },
      {
        
        name: "ID",
        type: "input",
        message: "Please enter the ID of your manager ",
      },
      {
        
        name: "manageremail",
        type: "input",
        message: "Please enter the email of your manager ",
      },
      {
        
        name: "officenumber",
        type: "input",
        message: "Please enter the office number of your manager ",
      },
    ];


    inquirer.prompt(questions).then((result) => {
      var manager = new Manager(result.managername, result.ID, result.manageremail, result.officenumber);
      employeeArray.push(manager);
      createEmployee();
    });
}


function createEmployee() {
 
  const internQuestions = [
    {
      name : "internName",
      type: "input",
      message: "Please enter the name of your intern.",
    },
    {
      name : "internID",
      type: "input",
      message: "Please enter the ID of your intern.",
    },
    {
      name : "internEmail",
      type: "input",
      message: "Please enter the email of your intern.",
    },
    {
      name : "internSchool",
      type: "input",
      message: "Please enter the school of your intern.",
    },
  ];
  const engineerQuestions = [
      {
        name : "engineerName",
        type: "input",
        message: "Please enter the name of your engineer.",
      },
      {
        name : "engineerID",
        type: "input",
        message: "Please enter the ID of your engineer.",
      },
      {
        name : "engineerEmail",
        type: "input",
        message: "Please enter the email of your engineer.",
      },
      {
        name : "engineerGithub",
        type: "input",
        message: "Please enter the Github of your engineer.",
      },  
  ];

  inquirer.prompt({
    name: "where",
    type: "list",
    message: "Which type of team member would you like to add?",
    choices: ["Intern", "Engineer", "I dont want to add another employee"], 
  }).then((employeeResult) => {
    if(employeeResult.where === "Intern") {
      inquirer.prompt(internQuestions).then((internResult) => {
        var intern = new Intern(internResult.internName, internResult.internID, internResult.internEmail, internResult.internSchool);
        employeeArray.push(intern);
        createEmployee();
      });
    }
    else if(employeeResult.where === "Engineer") {
      inquirer.prompt(engineerQuestions).then((engineerResult) => {
          var engineer = new Engineer(engineerResult.engineerName, engineerResult.engineerID, engineerResult.engineerEmail, engineerResult.engineerGithub);
          employeeArray.push(engineer);
          createEmployee();
      });
    }
    else {
      //i dont want another one
        var html = render(employeeArray);

        fs.writeFile(outputPath, html, function(error) {
          // if an error occurs, log it
          if (error) {
            // stop execution if there is an error
            console.log(error)
            return console.log(error);
          }   
      }); 
    }
  });

}


userinput();
        
        
        
        
        
        
        
        
        
        
        
        




// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
