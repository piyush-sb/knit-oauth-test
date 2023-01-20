import KnitAuth from "https://d1s750jujhrvo3.cloudfront.net/knit-sandbox.js";

import type { EventName } from "@lit-labs/react";
import * as React from "react";
import { createComponent } from "@lit-labs/react";

const KnitWeb = createComponent({
  tagName: "knit-auth",
  elementClass: KnitAuth,
  react: React,
  events: {
    onNewSession: "onNewSession" as EventName<CustomEvent>,
    onSuccess: "onSuccess" as EventName<CustomEvent>,
  },
});


export { KnitWeb };
