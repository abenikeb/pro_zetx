// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: "AIzaSyCb763LTfBgULXlSBBhk5bDJEP6kVuX9ss",
  authDomain: "greencheddar-9525f.firebaseapp.com",
  projectId: "greencheddar-9525f",
  storageBucket: "greencheddar-9525f.appspot.com",
  messagingSenderId: "624325909257",
  appId: "1:624325909257:web:41f01d1c69784aad4ed1d8",
  measurementId: "G-LTDTG5LYWT"
};
firebase.initializeApp(fbConfig)

attachCustomCommands({ Cypress, cy, firebase });