const program = require('commander');
const validator = require('validator');
const {addContact} = require('./contactsController');

program.version('5.1.0');
program.description('A command line Application');

program.command('add')
        .alias('a')
        .description('to add data by command line')
        .requiredOption('-f,--firstName <fName>','Type Your First Name')
        .requiredOption('-l,--lastName <lName>','Type Your Last Name')
        .requiredOption('-e,--email <email>','Type Your Email')
        .option('-t,--type <type>','Type Your Contact','Personal')
        .action(({firstName,lastName,email,type})=>{
          const contacts = {firstName,lastName,email,type};
          if(!validator.isEmail(email)){
            console.log('Please Provide valid Email');
          }
          else{
            addContact(contacts,email);
          }
          
        });

if(!process.argv[2]) {
  program.help();
}


program.parse(process.argv);

// node server add -f Jubayer -l Khan -e shuvo047niter@gmail.com