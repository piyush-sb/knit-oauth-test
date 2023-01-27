import { useSearchParams } from "react-router-dom";
import { KnitWeb } from "../components/KnitWeb";
import { useEffect, useState } from "react";

function KnitWebClient() {
  const [sesssionToken, setSessionToken] = useState('');
  const [integrationId, setIntegrationId] = useState(null);

  useEffect(() => {
   newSessionFn()
  }, []);

  const  newSessionFn = (e) =>{
e?.preventDefault();
fetch('https://mock-knit-session.onrender.com/getSessionToken', {method:"GET"}).then(res=> res.json()).then(r=>{
    setSessionToken(r.msg.token);
})


}
  const onSuccessFn = (e) => {
    e.preventDefault();
    console.log(e.detail['integration-id']);
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

export default KnitWebClient;
