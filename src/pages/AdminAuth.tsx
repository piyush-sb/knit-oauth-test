import { useSearchParams } from "react-router-dom";
import axios from "axios";
import loadingSVg from "../assets/loading.svg";
import { KnitWeb } from "../components/KnitAuth";
import { useEffect, useState } from "react";
function AdminAuth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState("");
  const [adminMode, setAdminMode] = useState(false);


  useEffect(() => {
    console.log("useffect called");
    // document.addEventListener('onnewsession',()=>{
    newSessionCall();
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

            // Authorization:
            //   "Bearer ce38a2db91f8fe91ae15f48d651934ea9b98c4f0a1d360f0b85d07337da3294c",
          },
        }
      )
      .then((res) => {
        setToken(res.data.token);
      });
  };
  const onSuccess = (e: CustomEvent) => {
    console.log(e.detail.token);
  };

  return (
    <KnitWeb
      authSessionToken={token}
      onNewSession={() => {
        console.log("CALL API FROM COMP");
        newSessionCall();
      }}
    ></KnitWeb>
  );
}

export default AdminAuth;
