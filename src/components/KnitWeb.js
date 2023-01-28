// Import the web component from this js file link
import KnitAuth from "https://af1.getknit.dev/knit-ui-comp.js";
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