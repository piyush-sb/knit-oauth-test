import {useSearchParams} from 'react-router-dom';
import axios from 'axios';
function Authorize (){
    const [searchParams, setSearchParams] = useSearchParams();
    let codeStr: string = searchParams.get('code')|| '';
let stateStr:string = searchParams.get('state') || '';            
const stateObj= JSON.parse(atob(stateStr));
axios.post(`https://8be1-2409-4070-2297-cb90-9036-3c88-cfe4-24b9.in.ngrok.io/app.oauthAuthorize`, {
 appId: stateObj.appId ,
 oauthCode : codeStr,
 isFinalStep : stateObj.isFinalStep 
},{
    headers:{
        "ngrok-skip-browser-warning": "true",
        Authorization : `Bearer ${stateObj.authSessionToken}`
    }
}).then(res=>{
    window.close();
}).catch(err=>{
  console.error(err);
  window.alert('Something went wrong, please try again');
  setTimeout(function(){
    window.close()
  },3000);
})
    return (
        <div>
            <h1>AUthorize OAUTH</h1>
        </div>
    )

}

export default Authorize;