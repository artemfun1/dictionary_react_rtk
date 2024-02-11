import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { store } from "./redux/store/store";
// import './redux/FireBase/InitFireBase'
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";



const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<BrowserRouter>
		{/* <React.StrictMode> */}
			<Provider store={store}>
				<App />
			</Provider>
		{/* </React.StrictMode> */}
	</BrowserRouter>
);
