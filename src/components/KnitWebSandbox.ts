import * as React from "react";
// Import the web component from this js file link
import KnitAuth from "https://knit-org-content-test.s3.ap-south-1.amazonaws.com/knit-ui-comp.js";
// In your React project folder, run:
// npm install --save @lit-labs/react
import type { EventName } from "@lit-labs/react";
import { createComponent } from "@lit-labs/react";

const KnitWebSandbox = createComponent({
  tagName: "knit-auth",
  elementClass: KnitAuth,
  react: React,
  events: {
    onNewSession: "onNewSession" as EventName<CustomEvent>,
    onFinish: "onFinish" as EventName<CustomEvent>,
  },
});

export { KnitWebSandbox };
