import React from "react";
import { render } from "react-dom";
import "./index.css";
import { Flickr } from "./Flickr";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <Flickr />
  </div>
);

render(<App />, document.getElementById("root"));
