// Import the web component from this js file link
import KnitAuth from "https://d1s750jujhrvo3.cloudfront.net/knit-sandbox.js";
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