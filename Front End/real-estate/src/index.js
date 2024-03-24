import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layouts/layout'; 
import Home from './Components/Home/home' 
import Login from './Components/Login/login';
import Register from './Components/Register/register';
import Buy from './Components/Buy/buy';
import Rent from './Components/Rent/rent';
import Sell from './Components/Sell/sell';
import Agent from './Components/Agent/agent';
import AboutUS from './Components/About US/aboutUS';
import Contact from './Components/Contact/contact';
import FAQ from './Components/FAQ/faq';
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import Profile from './Components/profile/profile';
import AgentApplied from './Components/Agent/agentApplied';
import AgentDetail from './Components/Agent/agentdetail';
import PropertyAdd from './Components/Propertys/propertyAdd';
import FetchBroker from './Components/profile/fetchBrokerApplied';
import PropertyDetails from './Components/Propertys/propertyDetail';
import EditProfile from './Components/EditFile/EditProfile';
import MyProperty from './Components/Propertys/brokerProperty';
import { UserContextProvider } from './context/userContext.js';


axios.defaults.baseURL = 'http://localhost:8000';
// axios.defaults.baseURL = 'http://localhost:8002';
axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={true} toastOptions={{duration:2000}}/>
      <Routes>
        <Route path='/agent-applied' element={<AgentApplied/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Layout/>}>
          <Route path='' element={<Home/>}></Route>
          <Route path='/buy' element={<Buy/>}></Route>
          <Route path='/rent' element={<Rent/>}></Route>
          <Route path='/sell' element={<Sell/>}></Route>
          <Route path='/agent' element={<Agent/>}></Route>
          <Route path='/about-us' element={<AboutUS/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/faq' element={<FAQ/>}></Route>
          <Route path='/profile' element={<Profile/>}> </Route>
          <Route path='/agentdetail/:_id' element={<AgentDetail/>}> </Route>
          <Route path='/add-property' element={<PropertyAdd/>}> </Route>
          <Route path='/add-property/:_id' element={<PropertyAdd/>}> </Route>
          <Route path='/broker-fetch' element={<FetchBroker/>}> </Route>
          <Route path='/property-detail/:_id' element={<PropertyDetails/>}> </Route>
          <Route path='/editProfile/:_id' element={<EditProfile/>}> </Route>
          <Route path='/myProperty' element={<MyProperty/>}> </Route>
        </Route>
      </Routes>
    </BrowserRouter>
)