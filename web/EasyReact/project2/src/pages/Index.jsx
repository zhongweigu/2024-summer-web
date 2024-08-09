import React from "react";
import Header from "../components/Header.jsx";
import Login from "./Login/index.jsx";
function Index(){
    return(
        <div className="container mx-auto p-4">
            <Header/>
            <Login/>
        </div>
    )
}

export default Index;