const fs = require('fs');
const util = require('util');
const colors = require('colors');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

async function loadContacts(){
  let contacts;
  try {
    const dataBuffer = await readFilePromise('./contacts.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } 
  catch (error) {
    contacts = [];
  } 
}

async function saveContacts(contacts) {
  const contactJSON = JSON.stringify(contacts);
  await writeFilePromise('./contacts.json',contactJSON);
}

const isExistingEmail = async(email) => {
  const contacts = await loadContacts();
  return contacts.find(eachContacts => eachContacts.email === email);
}

const addContact = async(contact,email) => {
  const contacts = await loadContacts();
  const extistingContact = await isExistingEmail(email);
  if(extistingContact) {
    console.log('Contact with this email Exist'.inverse.red)
  }
  else {
    contacts.push(contact);
    await saveContacts(contacts);
    console.log('Contact Successfully Addedd'.inverse.green)
  }
}

module.exports = {
  addContact,
  isExistingEmail
}