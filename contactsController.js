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

const listContacts = async() => {
  const contacts = await loadContacts();
  if(contacts.length>0) {
    console.log(contacts)
    console.log('All Contacts List'.inverse.green);
  }
  else {
    console.log('No Contact Found. Please Create One'.inverse.green);
  }
  
}

const deleteContacts = async(email) => {
  const contacts = await loadContacts();
  const contact = await isExistingEmail(email);
  if(!contact) {
    console.log('Contact Not Found'.inverse.red);
  }
  else {
    const updateContact = contacts.filter(contact=>contact.email !== email);
    await saveContacts(updateContact);
    console.log('Contact has been deleted'.inverse.green);
  }
}

const singleContacts = async(email) => {
  const contact = await isExistingEmail(email);
  if(!contact) {
    console.log('Contact Not Found'.inverse.red);
  }
  else {
    console.log(contact);
    console.log('Single Contact show'.inverse.green);
  }
}

const updateContacts = async(updates,email) => {
  const existanceContact = await isExistingEmail(email); // existance email check
  const contacts = await loadContacts(); // full contact load

  // data capture by input
  const {firstName,lastName,email:inputEmail,type} = updates;
  const updatedContactObj = {
    firstName: firstName ? firstName : existanceContact.firstName,
    lastName: lastName ? lastName : existanceContact.lastName,
    email: inputEmail ? inputEmail : existanceContact.email,
    type: type
  }
  
  // data manupulated by contacts
  const updatedContact = contacts.map(contact=> (contact.email===email) ? contact=updatedContactObj : contact);

  // save update contact on contacts
  await saveContacts(updatedContact);
  console.log('Contact has successfully updated'.inverse.green);
}

module.exports = {
  addContact,
  isExistingEmail,
  listContacts,
  deleteContacts,
  singleContacts,
  updateContacts
}