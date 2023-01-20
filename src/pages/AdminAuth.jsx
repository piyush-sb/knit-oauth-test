import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { KnitWeb } from "../components/KnitAuth";
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
    });
    //setToken(stateObj.authSessionToken)
    console.log("useffect called");
    // document.addEventListener('onnewsession',()=>{
    //newSessionCall();
  }, []);

  const newSessionCall = () => {
    console.log("Call API here");
    axios
      .post(
        `https://4582-2409-4070-2b9a-770f-ccc5-70c3-e563-8dd3.in.ngrok.io/auth.createSession`,
        {
          originOrgId: "scrut",
          originUserEmail: "scrut@scrut.com",
          originOrgName: "scrut.dev",
          originUserName: "Piyush Gupta",
        },
        {
          withCredentials: true,
          headers: {
            "ngrok-skip-browser-warning": "true",
            Accept: "application/json",
            "Access-Control-Allow-Origin": true,

            Authorization:
              "Bearer 09e8b0adebb2df4bfc205be8ffe9e3c24297c37d4e005286b2f3bab773e5e24f",
          },
        }
      )
      .then((res) => {
        console.log("topkb", res.data.msg.token);
        setAdminDetails({
          token: res.data.msg.token,
          appId: "keka",
        });
      });
  };
  const onSuccess = (e) => {
    e.preventDefault();
    console.log(e?.detail?.token);
  };

  return (
    <KnitWeb
      authSessionToken={adminDetails.token}
      adminMode={Object.keys(adminDetails).length > 0}
      selectedApp={adminDetails.appId}
      onNewSession={(e) => {
        e.preventDefault();
        console.log("CALL API FROM COMP");
        newSessionCall();
      }}
      onSuccess={(e) => {
        onSuccess(e);
      }}
    ></KnitWeb>
  );
}

export default AdminAuth;
