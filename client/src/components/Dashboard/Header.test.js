import React from "react";
import ReactDOM from "react-dom";
import Comment from "../group/comment";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Comment />, div);
  ReactDOM.unmountComponentAtNode(div);
});
