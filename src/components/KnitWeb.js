// Import the web component from this js file link
import KnitAuth from "https://d284iem4owwq8w.cloudfront.net/knit-web.js";
import React from "react";
// In your React project folder, run:
// npm install --save @lit-labs/react
import { createComponent } from "@lit-labs/react";

const KnitWeb = createComponent({
  tagName: "knit-auth",
  elementClass: KnitAuth,
  react: React,
  events: {
    onNewSession: "onNewSession",
    onSuccess: "onSuccess",
  },
});
export { KnitWeb };