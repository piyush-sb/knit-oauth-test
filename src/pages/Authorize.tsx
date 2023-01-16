import {useSearchParams} from 'react-router-dom';
import axios from 'axios';
import loadingSVg from '../assets/loading.svg';
function Authorize (){
    const [searchParams, setSearchParams] = useSearchParams();
    let codeStr: string = searchParams.get('code')|| '';
let stateStr:string = searchParams.get('state') || '';            
const stateObj= JSON.parse(atob(stateStr));
axios.post(`https://4582-2409-4070-2b9a-770f-ccc5-70c3-e563-8dd3.in.ngrok.io/app.oauthAuthorize`, {
 appId: stateObj.appId ,
 oauthCode : codeStr,
 isFinalStep : stateObj.isFinalStep,
 stepId: stateObj.stepId
},{
    headers:{
        "ngrok-skip-browser-warning": "true",
        "Authorization" : `Bearer ${stateObj.authSessionToken}`,
        "Accept": "application/json",
        "Access-Control-Allow-Origin": '**'
  },
  withCredentials: true,
}).then(res=>{
    console.log(res);
    window.alert('Everything went fine, request was success');
    setTimeout(function(){
        window.close()
      },1000);
}).catch(err=>{
  console.error(err);
  window.alert('Something went wrong, please try again');

})
    return (
        <div style={{display:'flex',height:'100%', width:'100vw',justifyContent:'center',alignItems:"center"}}>
           <img src={loadingSVg}  alt="loading" />
        </div>
    )

}

export default Authorize;