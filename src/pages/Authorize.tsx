import { useSearchParams } from "react-router-dom";
import loadingSVg from "../assets/loading.svg";
import getAxiosInstance from "../services/Api";
function Authorize() {
  const [searchParams, setSearchParams] = useSearchParams();
  let codeStr: string = searchParams.get("code") || "";
  let stateStr: string = searchParams.get("state") || "";
  const stateObj = JSON.parse(atob(stateStr));
  getAxiosInstance(stateObj.sandbox)
    .post(
      `app.oauthAuthorize`,
      {
        appId: stateObj.appId,
        oauthCode: codeStr,
        isFinalStep: stateObj.isFinalStep,
        stepId: stateObj.stepId,
      },
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${stateObj.authSessionToken}`,
          Accept: "application/json",
          "Access-Control-Allow-Origin": "**",
        },
      }
    )
    .then((res) => {
      console.log(res);
      window.alert("Everything went fine, request was success");
      setTimeout(function () {
        window.close();
      }, 1000);
    })
    .catch((err) => {
      console.error(err);
      window.alert("Something went wrong, please try again");
    });
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={loadingSVg} alt="loading" />
    </div>
  );
}

export default Authorize;
