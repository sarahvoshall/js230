'use strict';

// application logic
class Model {
  constructor() {
    this.contacts = [];
  }

  async refreshContacts() {
    try {
      let response = await fetch('http://localhost:3000/api/contacts');
      this.contacts = await response.json();
      return this.contacts;
    } catch (error) {
      alert(error);
    }
  }

  createContact(contact) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/contacts/');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.responseType = 'json';
    xhr.addEventListener('load', (e) => {
      if (xhr.status === 201) {
        alert(`Added ${xhr.response.full_name} to your contacts!`);
      } else {
        alert(xhr.statusText);
      }
    });
    xhr.send(JSON.stringify(contact));
  }

  editContact(contact) {
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://localhost:3000/api/contacts/' + contact.id);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.responseType = 'json';
    xhr.addEventListener('load', (e) => {
      if (xhr.status === 201) {
        alert(`Successfully updated information for ${xhr.response.full_name}!`);
      } else {
        alert(xhr.statusText);
      }
    });
    xhr.send(JSON.stringify(contact));
  }

  deleteContact(id) {
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://localhost:3000/api/contacts/' + String(id));
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.addEventListener('load', (e) => {
      if (xhr.status === 204) {
        alert('Contact has been deleted.');
      } else {
        alert(xhr.statusText);
      }
    });
    xhr.send(JSON.stringify( {id} ));
  }
}

// DOM manipulation
class View {
  constructor() {
    this.contactsDisplay = document.querySelector('#contacts-display');
    this.createEditForm = document.querySelector('#create-edit-form');
    this.contactTemplateFunc = Handlebars.compile(document.querySelector('#contact-template').innerHTML);
  }

  renderContacts() {
    getContacts()
      .then(response => {
        contacts = response;

        let contactsHTML = contacts.map(contact => this.contactTemplateFunc(contact));
        this.contactsDisplay.innerHTML = contactsHTML.join('');
      })
      .catch(error => alert(error));
  }
}

// event handling
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);
});

// document.addEventListener('DOMContentLoaded', () => {
//   let contacts = [];
//   const contactsDisplay = document.querySelector('#contacts-display');
//   const contactTemplate = Handlebars.compile(document.querySelector('#contact-template').innerHTML);

//   const form = document.querySelector('form');
//   const formFieldset = document.querySelector('#form-fieldset');
//   const addNewContactButton = document.querySelector('#add-contact');
//   const cancelButton = document.querySelector('#cancel-button');

//   // render the new contact form
//   addNewContactButton.addEventListener('click', event => {
//     event.preventDefault();
//     formFieldset.hidden = false;
//     formFieldset.querySelector('legend').textContent = 'Add a contact';
//   });

//   cancelButton.addEventListener('click', event => {
//     event.preventDefault();
//     form.reset();
//     formFieldset.hidden = true;
//   });

//   contactsDisplay.addEventListener('click', event => {
//     if (event.target.classList.contains('delete-button')) {
//       deleteContact(Number(event.target.parentElement.id));
//       renderContacts();
//     } else if (event.target.classList.contains('edit-button')) {
//       renderEditContactForm(Number(event.target.parentElement.id));
//     }
//   });

//   // add a new contact
//   form.addEventListener('submit', event => {
//     event.preventDefault();

//     if (!form.classList.contains('edit')) {
//       addContact()
//         .then(() => renderContacts())
//         .catch(error => alert(error));
//     }
//   });

//   // create a POST request to API
//   function addContact() {
//     return new Promise((resolve, reject) => {
//       const fullName = form.querySelector('[name="name"]').value;
//       const email = form.querySelector('[name="email"]').value;
//       const phoneNumber = form.querySelector('[name="phone_number"]').value;
//       const tags = form.querySelector('[name="tag"]').value;

//       const data = { full_name: fullName, email: email, phone_number: phoneNumber, tags: tags };

//       const xhr = new XMLHttpRequest();
//       const json = JSON.stringify(data);
//       xhr.open('POST', '/api/contacts');
//       xhr.setRequestHeader('Content-Type', 'application/json');
//       xhr.addEventListener('load', () => {
//         if (xhr.status === 201) {
//           form.reset();
//           formFieldset.hidden = true;
//           resolve()
//         } else {
//           reject(new Error(request.response));
//         }
//       });
//       xhr.send(json);
//     })
//   }

//   function getSingleContact(contactId) {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open('GET', `/api/contacts/${contactId}`);
//       xhr.responseType = 'json';
//       xhr.addEventListener('load', () => {
//         if (xhr.status === 200) {
//           resolve(xhr.response);
//         } else {
//           reject(new Error(xhr.response));
//         }
//       });
//       xhr.send();
//     })
//   }

//   function renderEditContactForm(contactId) {
//     getSingleContact(contactId)
//       .then(contact => {
//         formFieldset.hidden = false; 
//         formFieldset.querySelector('legend').textContent = 'Update this contact'
//         form.querySelector('[name="name"]').value = contact['full_name'];
//         form.querySelector('[name="email"]').value = contact['email'];
//         form.querySelector('[name="phone_number"]').value = contact['phone_number'];
//         form.querySelector('[name="tag"]').value = contact['tags'];
//         form.classList.add('edit');

//         form.addEventListener('submit', event => {
//           event.preventDefault();
//           editContact(contactId);
//         });
//       })
//       .catch(error => alert(error));
//   }

//   // make PUT request to API to edit contact
//   function editContact(contactId) {
//     const fullName = form.querySelector('[name="name"]').value;
//     const email = form.querySelector('[name="email"]').value;
//     const phoneNumber = form.querySelector('[name="phone_number"]').value;
//     const tags = form.querySelector('[name="tag"]').value;

//     const data = { full_name: fullName, email: email, phone_number: phoneNumber, tags: tags };
//     let json = JSON.stringify(data);

//     const xhr = new XMLHttpRequest();
//     xhr.open('PUT', `/api/contacts/${contactId}`)
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.addEventListener('load', () => {
//       if (xhr.status === 201) {
//         alert('Updated successfully');
//         renderContacts();
//         formFieldset.hidden = true;
//         form.classList.remove('edit');
//         form.reset();
//       } else {
//         alert(xhr.response);
//       }
//     });
//     xhr.send(json);
//   }

//   // make a GET request to API for contacts
//   function getContacts() {
//     return new Promise((resolve, reject) => {
//       let request = new XMLHttpRequest();
//       request.open('GET', '/api/contacts');
//       request.responseType = 'json';
//       request.addEventListener('load', () => {
//         if (request.status === 200) {
//           resolve(request.response);
//         } else {
//           reject(new Error(request.response));
//         }
//       });
//       request.send();
//     });
//   }

//   function renderContacts() {
//     getContacts()
//       .then(response => {
//         contacts = response;

//         let contactsHTML = contacts.map(contact => contactTemplate(contact));
//         contactsDisplay.innerHTML = contactsHTML.join('');
//       })
//       .catch(error => alert(error));
//   }

//   function deleteContact(contactId) {
//     const xhr = new XMLHttpRequest();
//     xhr.open('DELETE', `/api/contacts/${contactId}`);
//     xhr.addEventListener('load', () => {
//       if (xhr.status === 204) {
//         alert('Successfully deleted.');
//       } else {
//         alert(xhr.response);
//       }
//     });
//     xhr.send();
//   }

//   renderContacts();
// });
