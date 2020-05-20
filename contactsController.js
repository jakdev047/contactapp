const fs = require('fs');
const util = require('util');

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

const addContact = async(contact) => {
  const contacts = await loadContacts();
  contacts.push(contact);
  await saveContacts(contacts);
  console.log('Contact Successfully Addedd')
}

module.exports = {
  addContact
}