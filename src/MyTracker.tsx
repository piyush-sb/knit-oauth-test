//@ignore-ts
import React from 'react';
import  KnitAuth   from 'https://d1s750jujhrvo3.cloudfront.net/knit-react-auth.js';

export default class MyTracker extends React.Component{
    render(){
return (
<div>
        <KnitAuth knitKey="Piyush" onSuccessFetch={(e : CustomEvent)=> {console.log('success',e)}}><button slot="initiator">Click this</button></KnitAuth>
    </div>
)
}}