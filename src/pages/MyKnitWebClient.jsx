import { KnitWeb } from "../components/KnitWeb";
import { useEffect, useState } from "react";

function App() {
  const [sesssionToken, setSessionToken] = useState("");
  const [integrationId, setIntegrationId] = useState(null);
  const [apiKey, setApiKey] = useState(
    "09e8b0adebb2df4bfc205be8ffe9e3c24297c37d4e005286b2f3bab773e5e24f"
  );

  useEffect(() => {
    newSessionFn();
  }, []);

  const newSessionFn = (e) => {
    e?.preventDefault();
    fetch(`https://run.mocky.io/v3/e1c80e42-1038-40fe-b832-97889ab160d2`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
      .then((res) => res.json())
      .then((r) => {
        setApiKey(r.msg.apiKey);
      });
    fetch("https://api.sandbox.getknit.dev/v1.0/auth.createSession", {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify({
        originOrgId: "Rapido",
        originOrgName: "Rapido",
        originUserEmail: "nischal@rapido.ai",
        originUserName: "Nischal Chenna",
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        setSessionToken(r.msg.token);
      });
  };
  const onSuccessFn = (e) => {
    e.preventDefault();
    setInetgrationId(e.detail["integration-id"]);
  };

  return (
    <KnitWeb
      authSessionToken={sesssionToken}
      sandbox={true}
      onNewSession={newSessionFn}
      onSuccess={onSuccessFn}
    >
      <button slot="trigger">Integrate with Knit</button>
    </KnitWeb>
  );
}

export default App;
