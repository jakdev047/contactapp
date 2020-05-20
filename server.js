const program = require('commander');
const validator = require('validator');
const colors = require('colors');
const {prompt} = require('inquirer');
const {addContact,isExistingEmail} = require('./contactsController');

program.version('5.1.0');
program.description('A command line Application');

const addQuestion = [
  {
    type: 'input',
    name: 'firstName',
    message: 'Type Your First Name: ',
    validate(input) {
      if(!input) {
        console.log('Please Provide First Name'.inverse.red)
      }
      else {return true}
    }
  },
  {
    type: 'input',
    name: 'lastName',
    message: 'Type Your Last Name: ',
    validate(input) {
      if(!input) {
        console.log('Please Provide Last Name'.inverse.red)
      }
      else {return true}
    }
  },
  {
    type: 'input',
    name: 'email',
    message: 'Type Your Email: ',
    async validate(input) {
      if(!input || !validator.isEmail(input)) {
        console.log('Please Provide Valid Email'.inverse.red)
      }
      else if(await isExistingEmail(input)) {
        console.log('This Email is already Existed'.inverse.red)
      }
      else {return true}
    }
  },
  {
    type: 'list',
    name: 'type',
    message: 'Select Contact type: ',
    choices: ['Personal','Professional']
  }
]

program.command('add')
        .alias('a')
        .description('to add data by command line')
        .action(async()=>{
          const contacts =  await prompt(addQuestion);
          addContact(contacts,contacts.email);
        });

if(!process.argv[2]) {
  program.help();
}


program.parse(process.argv);

// node server add -f Jubayer -l Khan -e shuvo047niter@gmail.com