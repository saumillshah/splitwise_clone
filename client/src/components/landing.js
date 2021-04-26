import React from "react";

import  NavBar  from "./NavBar";
import landing from "./images/landing.PNG";


export const Landing = () => {
  return (
    <div className="landing">
     
      <main>
        <NavBar />
      </main>
      <div className="landing">
            <img className="landing-logo" src={landing} alt="Logo" width ="100%" />
        </div>
    </div>
  );
};
