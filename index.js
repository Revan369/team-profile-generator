const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team = [];

// Function to gather information about the manager
const addManager = async () => {
  const managerQuestions = [
    // Add questions for manager (name, id, email, officeNumber)
  ];

  const { name, id, email, officeNumber } = await inquirer.prompt(managerQuestions);
  const manager = new Manager(name, id, email, officeNumber);
  team.push(manager);

  // After adding the manager, proceed to add team members
  addTeamMembers();
};

// Function to add team members (engineers or interns)
const addTeamMembers = async () => {
  const teamMemberQuestion = [
    // Ask if the user wants to add an engineer or intern or finish building the team
  ];

  const { memberType } = await inquirer.prompt(teamMemberQuestion);

  if (memberType === "Engineer") {
    // Add questions for engineer (name, id, email, github)
    const engineerQuestions = [
      // Add questions for engineer (name, id, email, github)
    ];

    const { name, id, email, github } = await inquirer.prompt(engineerQuestions);
    const engineer = new Engineer(name, id, email, github);
    team.push(engineer);
  } else if (memberType === "Intern") {
    // Add questions for intern (name, id, email, school)
    const internQuestions = [
      // Add questions for intern (name, id, email, school)
    ];

    const { name, id, email, school } = await inquirer.prompt(internQuestions);
    const intern = new Intern(name, id, email, school);
    team.push(intern);
  } else {
    // Finish building the team and generate HTML
    generateHTML();
    return;
  }

  // Continue adding team members recursively
  addTeamMembers();
};

// Function to generate HTML and write to a file
const generateHTML = () => {
  const html = render(team);

  // Check if the output directory exists, if not, create it
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  // Write HTML to the team.html file
  fs.writeFileSync(outputPath, html);

  console.log("Team.html has been generated successfully!");
};

// Start the application by adding the manager
addManager();