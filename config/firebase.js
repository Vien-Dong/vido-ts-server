const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyB22uiPBo6Fqb9jk5ntNe5y19MrNfUP8vE",
    authDomain: "vido-ts-mobile.firebaseapp.com",
    projectId: "vido-ts-mobile",
    storageBucket: "vido-ts-mobile.appspot.com",
    messagingSenderId: "1063044318974",
    appId: "1:1063044318974:web:5d164c9954a78f17b6c7af",
    measurementId: "G-RH3HCJYW5D"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
module.exports = { database, app };
