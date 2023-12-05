import { collection, query, where, getDocs } from "../src/config/firebase.js";

// const q = query(collection(db, "cities"), where("capital", "==", true));
const q = query(collection(db, "MyAds"), where("Id", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
    });