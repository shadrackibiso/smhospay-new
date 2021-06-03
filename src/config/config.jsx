import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmq3pWIbzPw__XbEe-scoRpFbyd2c0QdM",
  authDomain: "smhospay.firebaseapp.com",
  projectId: "smhospay",
  storageBucket: "smhospay.appspot.com",
  messagingSenderId: "831847651632",
  appId: "1:831847651632:web:3cd31bb10a8132f8a190f5",
  measurementId: "G-10CMJDDLNP",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
