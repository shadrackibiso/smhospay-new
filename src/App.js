import React from "react";
// import React, { Suspense, lazy } from "react";
import "./App.css";
import "./css/bootstrap.min.css";
// import SplashScreen from "./components/SplashScreen";
import moment from "moment";
import { auth, firestore } from "./config/config";
import AppRouter from "./routes/AppRouter";
// const AppRouter = lazy(() => import("./routes/AppRouter"));

class App extends React.Component {
  state = {
    totalGivings: 0,
    totalTithes: 0,
    totalOfferings: 0,
    totalOthers: 0,
    loading: true,
    loadingGivings: true,
    loadingUsers: true,
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.checkData();
      } else {
        this.setState({ user: null });
      }
    });
  }

  checkData = () => {
    firestore
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

            if (user.data().accountType.toLowerCase() === "admin") {
              this.checkAllGivings();
              this.checkAllUsers();
            } else {
              this.checkUserGivings();
            }
          }
        })
      );
  };

  checkAllUsers = () => {
    firestore
      .collection("users")
      .get()
      .then((data) => {
        let users = [];

        data.forEach((user) => {
          users.push({ ...user.data() });
        });

        this.setState((prevState) => ({
          ...prevState,
          users,
          loadingUsers: false,
        }));
      });
  };

  checkAllGivings = () => {
    firestore
      .collection("givings")
      .get()
      .then((data) => {
        let givings = [];
        let totalGivings = 0;
        let totalTithes = 0;
        let totalOfferings = 0;
        let totalOthers = 0;

        data.forEach((giving) => {
          givings.push({ ...giving.data() });

          totalGivings += giving.data().amount;

          if (giving.data().type.toLowerCase() === "tithe") {
            totalTithes += giving.data().amount;
          }

          if (giving.data().type.toLowerCase() === "offering") {
            totalOfferings += giving.data().amount;
          }

          if (
            giving.data().type.toLowerCase() !== "offering" &&
            giving.data().type.toLowerCase() !== "tithe"
          ) {
            totalOthers += giving.data().amount;
          }
        });

        this.setState((prevState) => ({
          ...prevState,
          givings,
          totalGivings,
          totalTithes,
          totalOfferings,
          totalOthers,
          loadingGivings: false,
        }));
      });
  };

  checkUserGivings = () => {
    firestore
      .collection("givings")
      .get()
      .then((data) => {
        let givings = [];
        let totalGivings = 0;
        let totalTithes = 0;
        let totalOfferings = 0;
        let totalOthers = 0;

        data.forEach((giving) => {
          if (giving.data().uid === this.state.user.uid) {
            givings.push({ ...giving.data() });

            totalGivings += giving.data().amount;

            if (giving.data().type.toLowerCase() === "tithe") {
              totalTithes += giving.data().amount;
            }

            if (giving.data().type.toLowerCase() === "offering") {
              totalOfferings += giving.data().amount;
            }

            if (
              giving.data().type.toLowerCase() !== "offering" &&
              giving.data().type.toLowerCase() !== "tithe"
            ) {
              totalOthers += giving.data().amount;
            }
          }
        });

        this.setState((prevState) => ({
          ...prevState,
          givings,
          totalGivings,
          totalTithes,
          totalOfferings,
          totalOthers,
          loadingGivings: false,
        }));
      })
      .catch((error) => console.log(error));
  };

  addGiving = (giving) => {
    firestore
      .collection("givings")
      .doc(`${giving.id}`)
      .set(giving)
      .then(() => {
        let tithe = giving.type.toLowerCase() === "tithe" ? giving.amount : 0;
        let offering =
          giving.type.toLowerCase() === "offering" ? giving.amount : 0;
        let other =
          giving.type.toLowerCase() !== "offering" &&
          giving.type.toLowerCase() !== "tithe"
            ? giving.amount
            : 0;

        this.setState((prevState) => ({
          ...prevState,
          givings: [{ ...giving, date: moment() }, ...prevState.givings],
          totalGivings: prevState.totalGivings + giving.amount,
          totalTithes: prevState.totalTithes + tithe,
          totalOfferings: prevState.totalOfferings + offering,
          totalOthers: prevState.totalOthers + other,
        }));
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      // <Suspense fallback={<SplashScreen />}>
      <AppRouter
        {...this.state}
        addGiving={this.addGiving}
        checkData={this.checkData}
      />
      // </Suspense>
    );
  }
}

export default App;
