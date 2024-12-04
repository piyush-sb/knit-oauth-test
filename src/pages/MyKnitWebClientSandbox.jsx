import {  KnitWebSandbox } from "../components/KnitWebSandbox";
import { useEffect, useState } from "react";

function App() {
  const [sesssionToken, setSessionToken] = useState("");
  const [integrationId, setIntegrationId] = useState(null);

  useEffect(() => {
    newSessionFn();
  }, []);

  const newSessionFn = (e) => {
    e?.preventDefault();

    // fetch(`https://run.mocky.io/v3/e1c80e42-1038-40fe-b832-97889ab160d2`, {
    //   method: "GET",
    //   headers: {
    //     "ngrok-skip-browser-warning": true,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((r) => {
        fetch(
          "https://frontend-engine.sandbox.getknit.dev/auth.createSession",
          {
            method: "POST",
            headers: {
              "ngrok-skip-browser-warning": true,
              // Authorization: "Bearer " + r.apiKey,
            },
            body: JSON.stringify({
              originOrgId: "Rapido",
              originOrgName: "Rapido",
              originUserEmail: "nischal@rapido.ai",
              originUserName: "Nischal Chenna",
            }),
          }
        )
          .then((res) => res.json())
          .then((r) => {
            setSessionToken(r.msg.token);
          });
      // });
  };
  const onFinishFn = (e) => {
    e.preventDefault();
    setIntegrationId(e.detail["integration-id"]);
    console.log("integration-id:- ",e.detail["integration-id"])
  };

  return (
    <KnitWebSandbox
      authSessionToken={sesssionToken}
      sandbox={true}
      onNewSession={newSessionFn}
      onFinish={onFinishFn}
    >
      <button slot="trigger">Integrate with Knit</button>
    </KnitWebSandbox>
  );
}

export default App;
