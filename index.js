import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword
    , onAuthStateChanged, signOut, FacebookAuthProvider , signInWithPopup   
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

import {
    getFirestore, getDocs, doc,
    collection, setDoc, deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCp3rEyg_gARCfzHDT8xhxzs3tnTqKbHww",
    authDomain: "fire2-e33ca.firebaseapp.com",
    projectId: "fire2-e33ca",
    storageBucket: "fire2-e33ca.appspot.com",
    messagingSenderId: "1065450765532",
    appId: "1:1065450765532:web:94c455aed091ef95a40819",
    measurementId: "G-N9E0WQSTYT"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// firebase.initializeApp(firebaseConfig);
//initialize
const db = getFirestore(app);
const todosCollectionRef = collection(db, 'todos')

const registerForm = document.getElementById('register-form')
const loginForm = document.getElementById('login-form')
const loader = document.getElementById('loader-div')
const userDiv = document.getElementById('user-info')
const auhDiv = document.getElementById('auth')
const logout = document.getElementById('logout')
const userEmail = document.getElementById('user-email')
const addInfo = document.getElementById('addInfo')
const todoInput = document.getElementById('todo_input')
const todosContainer = document.getElementById('todos_container')

window.fbAsyncInit = function() {
    FB.init({
      appId: 'YOUR_FACEBOOK_APP_ID',
      cookie: true,
      xfbml: true,
      version: 'v10.0'
    });
  };

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log('user is logged in')

        // loader.style.display = 'none'
        // auhDiv.style.display = 'none'
        // userDiv.style.display = 'block'
        // userEmail.innerText = `User email is ${user.email} and User uid is ${uid}`
        getTodos()
        // ...
    } else {
        // User is signed out
        // loader.style.display = 'none'
        // auhDiv.style.display = 'block'
        // userDiv.style.display = 'none'

        // ...
    }
});

registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log(e)
    const fullname = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        window.location.href='./src/dashboard/dashboard.html'
        // await addDoc(collection(db, "users"), {
        //     fullname,
        //     email
        // })
        console.log('userCredential --', userCredential)
        await setDoc(doc(db, "users", userCredential.user.uid), {
            fullname,
            email
        });


    } catch (e) {
        alert(e.message)
    }
})

loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log('hello')
    // window.location.href = './src/dashboard/dashboard.html'
    // window.location.href = './src/dashboard/dashboard.html'
    console.log(e)
    const email = e.target[0].value
    const password = e.target[1].value

  
    try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        alert("User Logged In Successfully  ")
        window.location.href = './src/dashboard/dashboard.html'
        // window.location.href = './userProfile/userProfile.html'
        console.log(response);
    } catch (e) {
        console.log(e.message);
    }
})

// logout.addEventListener('click', () => {
//     signOut(auth).then(() => {
//         // Sign-out successful.
//         console.log('signedout')
//     }).catch((error) => {
//         // An error happened.
//         console.log('signedout', error)

//     });
// })


//DB Section--->

// addInfo.addEventListener('click', async () => {
//     if (!todoInput.value) return alert('Please add todo')
//     try {
//         const docAdded = await addDoc(todosCollectionRef, {
//             todo: todoInput.value
//         });
//         todoInput.value = ''
//         getTodos()
//         console.log("Document written with ID: ", docAdded);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// })

async function getTodos() {
    todosContainer.innerHTML = null
    const querySnapshot = await getDocs(todosCollectionRef);
    querySnapshot.forEach((todoDoc) => {
        const todoObj = todoDoc.data()
        const div = document.createElement('div')
        div.className = 'todo-div'
        const span = document.createElement('span')
        span.innerText = todoObj.todo
        const button = document.createElement('button')
        button.innerText = 'Delete'
        button.id = todoDoc.id

        button.addEventListener('click', async function () {
            console.log(this)

            const docRef = doc(db, 'todos', this.id)
            console.log(docRef)
            await deleteDoc(docRef)
            getTodos()
        })

        div.appendChild(span)
        div.appendChild(button)

        todosContainer.appendChild(div)

    });
}

function facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // Handle successful login
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  }
  
//1. getFirestore  // to initialize firestore, 
//2. getDocs,  // to get all the documents in the particular collection 
//3. doc,   // to create the reference of the single document
//4. collection // to create the reference of the single collection, 
//5. addDoc, // to add the document in the collection , it takes two arguments 1.collection reference 2.Document
//6. deleteDoc // to delete the single document , it takes doc reference as an argument




/*
1. Asynchoronous (Chaltay hain per foran kam nai karte
    balkay thora sa wait kar ke chaltay hain.
    Humeshan sync code ke baad chaltay hain)
    i) request ii) response

    return type: Promise
e.g. fetch(), setTimeout(), setInterval(), firebase methods etc.

2. Synchoronous (Chaltay hi apna kaam kardalen)
e.g. console.log(), alert(), etc

i) Jharo (Sync)
ii) Chae Banao! (Async)
iii) Bartan dho! (Sync)



async/await: alternative => .then .catch
*/


export {
    auth,
    onAuthStateChanged
}