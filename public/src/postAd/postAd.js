import { postAdToDb, auth, logout } from "../config/firebase.js"
import{ onAuthStateChanged}from '../../index.js'

onAuthStateChanged(auth, (user) => {



    if (user) {
        const emailElement = document.getElementById('email')
        emailElement.innerHTML = user.email
        // emailElement.innerHTML = user.title
        console.log(user);
        
getAdDetail()
} else {
        alert('User Is Logged Out')
        location.href = '../../login.html'
    }
})


window.onSubmit = function() {
    const uid = auth.currentUser.uid //Authentication
    const allInputs = document.getElementsByTagName('input')
    const title = allInputs[0].value
    const description = allInputs[1].value
    const amount = allInputs[2].value
    const image = allInputs[3].files[0]
    
    const ad = {
        title,
        description,
        amount,
        image,
        uid
    }
    
    postAdToDb(ad)

}

window.signout=function(){
    logout()
}