import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { KnitWeb } from "../components/KnitWeb";
import { useEffect, useState } from "react";

function AdminAuth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [adminDetails, setAdminDetails] = useState({});

  useEffect(() => {
    let stateStr = searchParams.get("state") || "";
    const stateObj = JSON.parse(atob(stateStr));
    console.log("stateObj", stateObj);
    setAdminDetails({
      token: stateObj.authSessionToken,
      appId: stateObj.appId,
      sandbox:stateObj.sandbox
    });
    //setToken(stateObj.authSessionToken)
    console.log("useffect called");
    // document.addEventListener('onnewsession',()=>{
    //newSessionCall();
  }, []);


  const onSuccess = (e) => {
    e.preventDefault();
    console.log(e?.detail?.token);
  };

  return (
    <KnitWeb
      authSessionToken={adminDetails.token}
      adminMode={Object.keys(adminDetails).length > 0}
      selectedApp={adminDetails.appId}
      sandbox={adminDetails.sandbox}
      onNewSession={(e) => {
        e.preventDefault();
        console.log("CALL API FROM COMP");
      }}
      onSuccess={(e) => {
        onSuccess(e);
      }}
    ></KnitWeb>
  );
}

export default AdminAuth;
