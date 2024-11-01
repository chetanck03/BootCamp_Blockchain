import { createBrowserRouter } from "react-router-dom";
import Wallet from "../components/Wallet"
import TodoList from "../components/To-Do/TodoList";

import NavBar from "../components/Navbar"
import Footer from "../components/Footer"

export const routes = createBrowserRouter([
    {path:'/',element:(
    <div>
        <NavBar/>
        <Wallet/>
        <Footer/>
    </div>)},
    {path:'/to-do-list',element:(
    <div>
        <NavBar/>
        <TodoList/>
        <Footer/>
    </div>)},

])