import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../globals.css";

import { Provider } from "react-redux";
import store from "./store/RootReducer.js";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  limit,
  startAfter,
  orderBy,
  updateDoc,
  deleteField,
} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBM7ipyzLbhi8AsioPELKH_pq-bnyCNRrs",
  authDomain: "inked-reflections.firebaseapp.com",
  projectId: "inked-reflections",
  storageBucket: "inked-reflections.appspot.com",
  messagingSenderId: "181577158789",
  appId: "1:181577158789:web:98ab2da655f50815f259ec",
  measurementId: "G-Z5B8XVB4WQ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db; // One instance exported for consistency

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

let lastVisibleDoc = null; // initialise
async function getData() {
  const postsRef = collection(db, "posts");
  let q;

  if (lastVisibleDoc) {
    q = query(
      postsRef,
      orderBy("createdAt", "desc"),
      startAfter(lastVisibleDoc),
      limit(10)
    );
  } else {
    q = query(postsRef, orderBy("createdAt", "desc"), limit(10));
  }
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => console.log(doc.data()));

  lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1]; // last document in the last received set of posts
  console.log("-------- next batch --------");
}

async function getAllData() {
  await getData();
  await getData();
}
// getAllData();

/*

 */
async function sendPostsData() {
  const postsRef = collection(db, "posts");
  try {
    const querySnapshot = await getDocs(postsRef);
    querySnapshot.forEach((doc) => console.log(doc.data().createdAt));

    // const promiseArray = querySnapshot.docs.map((doc, index) => {
    //   const timestamp = doc.data().timestamp;
    //   return updateDoc(doc.ref, {
    //     timestamp: deleteField(),
    //     createdAt: timestamp,
    //   });
    // });
    // console.log(promiseArray);
    // await Promise.all(promiseArray);
  } catch (error) {
    console.log(error);
  }
}
// sendPostsData();

/**
 * const dates = []; 

for (let i = 0; i < 50; i++) {
  const date = new Date(); 
  let timestamp = Math.floor(date.getTime() / 1000); 

  timestamp = Math.floor(timestamp - (Math.random() * 31536000 * 2)); 
  dates.push(timestamp)
}

console.log(dates.join());
 */
