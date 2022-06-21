import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
// BrowserRouter as Router,

import GeneralLayout from "./Layouts/GeneralLayout";

import HomePage from "./Pages/HomePage";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";
import BasketPage from "./Pages/BasketPage";
import CategoryPage from "./Pages/CategoryPage";
import AboutPage from "./Pages/AboutPage";
import ProductPage from "./Pages/ProductPage";
import NoMatch from "./Pages/NoMatch";

import { AuthProvider, ProtectedRoute } from "./Services/auth";
import AccountPage from "./Pages/AccountPage";
import ProfileSubPage from "./Pages/ProfileSubPage";
import AddressSubPage from "./Pages/AddressSubPage";
import AddressCreateSubPage from "./Pages/AddressCreateSubPage";
import AddressDeleteSubPage from "./Pages/AddressDeleteSubPage";
import AddressUpdateSubPage from "./Pages/AddressUpdateSubPage";
import CartContextProvider from "./Context/Cart";
import CheckoutPage from "./Pages/CheckoutPage";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51L2DcCIPO0PKIySxmnZlKH1ZW8XbXxiQBEpMcYwPerpEVgitpvu7WLMuR9o3Gpdv09Q2jmh4PnFJUWCfICbnQDoD00c4p00bZm');

function App() {
	return (
			<HashRouter>
				<CartContextProvider>
					<AuthProvider>
						<Elements stripe={stripePromise}>
						<GeneralLayout>
							<Routes>
								<Route path="/" element={<HomePage/>}/>
								<Route path="/signin" element={<SigninPage/>}/>
								<Route path="/signup" element={<SignupPage/>}/>
								<Route path="/basket" element={<BasketPage/>}/>
								<Route path="/category/:category_name"
											 element={<CategoryPage/>}/>
								<Route path="/product/:pname/:pid" element={<ProductPage/>}
											 exact={true}/>
								<Route path="/about" element={<AboutPage/>}/>
								<Route path="user" element={
									<ProtectedRoute><AccountPage/></ProtectedRoute>}>
									<Route index element={<ProfileSubPage/>}/>
									<Route path="profile" element={<ProfileSubPage/>}/>
									<Route path="address" element={<AddressSubPage/>}/>
									<Route path="address/new" element={<AddressCreateSubPage/>}/>
									<Route path="address/:address_id/edit"
												 element={<AddressUpdateSubPage/>}/>
									<Route path="address/:address_id/delete"
												 element={<AddressDeleteSubPage/>}/>
									<Route path="card" element={<p>card</p>}/>
									<Route path="*" element={<NoMatch/>}/>
								</Route>
								<Route path="/checkout"
											 element={<ProtectedRoute><CheckoutPage/></ProtectedRoute>}/>
								<Route path="*" element={<NoMatch/>}/>
							</Routes>
						</GeneralLayout>
						</Elements>
					</AuthProvider>
				</CartContextProvider>
			</HashRouter>
	);
}

export default App;
