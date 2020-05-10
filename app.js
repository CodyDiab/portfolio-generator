
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');
// const profileDataArgs = process.argv.slice(2, process.argv.length);
// const [name,github] = profileDataArgs;




// fs.writeFile('index.html', generatePage(name,github), err => {
//     if (err) throw err;


// console.log ('Porfolio complete! Check out index.html to see the output')

// })

const inquirer = require('inquirer');

const promptUser = () => {
  return inquirer
  .prompt([
      {
          type: 'input',
          name: 'name',
          message: 'What is your name?'
      },
      {
          type: 'input',
          name: 'github',
          message: 'Enter your GitHub Username'
      },
      {
          type: 'input',
          name: 'about',
          message: 'Provide some information about yourself:'
      }
  ]);

};

const promptProject = portfolioData => {
    console.log(`
    =================
    add a new project
    =================
    `);
    //if there is no existing array, creat one
    if (!portfolioData.projects){
    portfolioData.projects = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you write this project with? (Check all that apply)',
            choices: ['JavaScript','HTML','CSS','ES6','jQuery','Ruby','Python','C#','C++','Java','Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to you project. (Required)'
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        }else{
            return portfolioData;
        }
    })
}

  promptUser()
     .then(promptProject)
     .then(portfolioData => {
         console.log(portfolioData);
     });

 