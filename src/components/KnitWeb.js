// Import the web component from this js file link
import KnitAuth from "https://knit-org-content-test.s3.ap-south-1.amazonaws.com/knit-ui-comp.js";
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
    onFinish: "onFinish",
  },
});
export { KnitWeb };
