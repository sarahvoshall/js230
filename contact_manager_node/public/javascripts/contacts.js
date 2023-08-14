'use strict'

class Model {
  async refreshContacts() {
    try {
      let response = await fetch('http://localhost:3000/api/contacts');
      this.contacts = await response.json();
      return this.contacts;
    } catch (error) {
      throw error;
    }
  }

  createContact(contact) {

  }

  updateContact(contact) {

  }

  deleteContact(contactId) {
    
  }

  constructor() {
    this.contacts = [];
  }
};

class View {
  constructor() {
    this.template = Handlebars.compile(document.querySelector('#contact-template').innerHTML);
    this.dashboard = document.querySelector('#dashboard');
  }

  renderContacts(contacts) {
    this.dashboard.innerHTML = this.template({ contacts: contacts });
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onContactsUpdated();
  }

  async onContactsUpdated() {
    this.view.renderContacts(await this.model.refreshContacts());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);
});

// class Model {
//   constructor() {
//     this.contacts = [];
//   }

//   async refreshContacts() {
//     try {
//       let response = await fetch('http://localhost:3000/api/contacts');
//       this.contacts = await response.json();
//       return this.contacts;
//     } catch (error) {
//       alert(error);
//     }
//   }

//   addContact(contact) {
//     let req = new XMLHttpRequest();
//     req.open('POST', 'http://localhost:3000/api/contacts/');
//     req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
//     req.responseType = 'json';
//     req.addEventListener('load', (e) => {
//       if (req.status === 201) {
//         alert(`Added ${req.response.full_name} to your contacts!`);
//       } else {
//         alert(req.statusText);
//       }
//     });
//     req.send(JSON.stringify(contact));
//   }

//   updateContact(contact) {
//     let req = new XMLHttpRequest();
//     req.open('PUT', 'http://localhost:3000/api/contacts/' + contact.id);
//     req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
//     req.responseType = 'json';
//     req.addEventListener('load', (e) => {
//       if (req.status === 201) {
//         alert(`Successfully updated information for ${req.response.full_name}!`);
//       } else {
//         alert(req.statusText);
//       }
//     });
//     req.send(JSON.stringify(contact));
//   }

//   deleteContact(id) {
//     let req = new XMLHttpRequest();
//     req.open('DELETE', 'http://localhost:3000/api/contacts/' + String(id));
//     req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
//     req.addEventListener('load', (e) => {
//       if (req.status === 204) {
//         alert('Contact has been deleted.');
//       } else {
//         alert(req.statusText);
//       }
//     });
//     req.send(JSON.stringify( {id} ));
//   }
// }

// class View {
//   // arrange contacts on page
//   constructor() {
//     this.dashboard = document.querySelector('#dashboard');
//     this.contactTemplateFunc = Handlebars.compile(document.querySelector('#contact-template').innerHTML);
//     this.createEditForm = document.querySelector('#create-edit-form');
//     this.addContactButton = document.querySelector('#add-contact');
//   }

//   renderContacts(contacts) {
//     let contactsHTML = contacts.map(contact => this.contactTemplateFunc(contact));
//     this.dashboard.innerHTML = contactsHTML.join('');
//   }

//   // render create contact form
//   renderCreateContactForm() {
//     this.createEditForm.hidden = false;
//   }
// }

// class Controller {
//   // get the contacts and display to page
//   constructor(model, view) {
//     this.model = model;
//     this.view = view;

//     this.onContactsUpdated();
//   }

//   async onContactsUpdated() {
//     let contacts = await this.model.refreshContacts();
//     this.view.renderContacts(contacts);
//   }

//   handleAddContactButton() {
//     this.view.addContactButton.addEventListener('click', e => {
//       e.preventDefault();
//       this.view.renderCreateContactForm();
//     });
//   }
// }

// document.addEventListener('DOMContentLoaded', () => {
//   const model = new Model();
//   const view = new View();
//   const controller = new Controller(model, view);
// });