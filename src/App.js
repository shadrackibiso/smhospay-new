// import React from "react";
import React, { Suspense, lazy } from "react";
import "./App.css";
import "./css/bootstrap.min.css";
import SplashScreen from "./components/SplashScreen"
// import AppRouter from "./routes/AppRouter"
import moment from "moment";
import fb from "./config/config"
import firebase from "firebase/app";
// import { v4 as uuidv4 } from "uuid";
const AppRouter = lazy(() => import("./routes/AppRouter"))

class App extends React.Component {
  state = {
    // user: {},
    id: 'shadrack',
    firstName: "Shadrack",
    lastName: "Ibiso",
    titheNumber: "0103724",
    email: "ibisoshadrack@gmail.com",
    givings: [],
    totalGivings: 0,
    totalTithes: 0,
    totalOfferings: 0,
    totalOthers: 0,
    loading: true,
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.checkData();
      } else {
        this.setState({ user: null });
      }
    });
  }

  checkData = () => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((data) =>
        data.forEach((user) => {
          if (user.data().uid === this.state.user.uid) {
            this.setState((prevState) => ({
              ...prevState,
              ...user.data(),
              loading: false,
            }));

            this.checkGivings()
          }
        })
      );
  };

  checkGivings = () => {
    firebase
    .firestore()
    .collection("givings")
    .get()
    .then((data) => {
      let givings = []
      let totalGivings = 0;
      let totalTithes = 0;
      let totalOfferings = 0;
      let totalOthers = 0;

      data.forEach((giving) => {
        if (giving.data().uid === this.state.user.uid) {
          
          givings.push({...giving.data()})

          totalGivings += giving.data().amount

          if (giving.data().type.toLowerCase() === 'tithe') {
            totalTithes += giving.data().amount
          }

          if (giving.data().type.toLowerCase() === 'offering') {
            totalOfferings += giving.data().amount
          }

          if (giving.data().type.toLowerCase() !== 'offering' && giving.data().type.toLowerCase() !== 'tithe' ) {
            totalOthers += giving.data().amount
          }

        }
      })

      this.setState((prevState) => ({
        ...prevState,
        givings,
        totalGivings,
        totalTithes,
        totalOfferings,
        totalOthers,
      }));

    })
    .catch((error) => console.log(error));
  }

  addGiving = (giving) => {

    firebase
      .firestore()
      .collection("givings")
      .doc(`${giving.id}`)
      .set(giving)
      .then( () => {
        let tithe = giving.type.toLowerCase() === 'tithe' ? giving.amount : 0;
        let offering = giving.type.toLowerCase() === 'offering' ? giving.amount : 0;
        let other = (giving.type.toLowerCase() !== 'offering' && giving.type.toLowerCase() !== 'tithe') ? giving.amount : 0;

        this.setState((prevState) => ({
          ...prevState,
          givings: [{ ...giving, date: moment() }, ...prevState.givings],
          totalGivings: prevState.totalGivings + giving.amount,
          totalTithes: prevState.totalTithes + tithe,
          totalOfferings: prevState.totalOfferings + offering,
          totalOthers: prevState.totalOthers + other,
        }))

        // this.checkGivings()
      }
      )
      .catch((error) => console.log(error));

  }

  render() {
    return (
      <Suspense fallback={<SplashScreen />}>
        <AppRouter {...this.state} addGiving={this.addGiving} checkData={this.checkData} />
      </Suspense>
    );
  }
}

export default App;
