import React from "react";
import ReactDOM from "react-dom";
import UserProfile from "./components/profile/UserProfile";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserProfile />, div);
  ReactDOM.unmountComponentAtNode(div);
});
