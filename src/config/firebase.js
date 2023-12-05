import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
    getAuth,
    signOut,
    FacebookAuthProvider
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

import {
    getFirestore, getDocs, doc, getDoc,
    collection, addDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCp3rEyg_gARCfzHDT8xhxzs3tnTqKbHww",
    authDomain: "fire2-e33ca.firebaseapp.com",
    projectId: "fire2-e33ca",
    storageBucket: "fire2-e33ca.appspot.com",
    messagingSenderId: "1065450765532",
    appId: "1:1065450765532:web:94c455aed091ef95a40819",
    measurementId: "G-N9E0WQSTYT"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();



async function postAdToDb(ad) {
    


    try {
        const storageRef = ref(storage, `ads/${ad.image.name}`);

        await uploadBytes(storageRef, ad.image)

        const url = await getDownloadURL(storageRef)

        ad.image = url

        await addDoc(collection(db, "ads"), ad)
        alert('Data added successfully!')
        location.href='../dashboard/dashboard.html'

    } catch (e) {
        alert(e.message)
    }
}

async function getAds() {
    const querySnapshot = await getDocs(collection(db, "ads"))
    const ads = []
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    

        const ad = doc.data()
        ad.id = doc.id

        ads.push(ad)
    });

    return ads
}

async function getSingleAd(adId) {
    const docRef = doc(db, "ads", adId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const ad = docSnap.data()

        return ad
    } else {
        
        console.log("Document Nhn Hai ");
    }
}
async function getUser(uid) {
    try {
        const docRef = doc(db, "users", uid);
        console.log('docRef:', docRef);

        const docSnap = await getDoc(docRef);
        console.log('docSnap:', docSnap);

        if (docSnap.exists()) {
            console.log('uid', uid)
            const user = docSnap.data();
            console.log('user:', user);
            return user;
        } else {
            console.log("Document Not Found");
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
    }
}
 async function sortAds(){
    const adsRef=collection(db, "ads")
    const querySnapshot=await getDocs(MediaQueryListEvent)
}
  

function logout() {
    return signOut(auth)
}

export {
    postAdToDb,
    getAds,
    getSingleAd,
    auth,
    getUser,
    logout
}