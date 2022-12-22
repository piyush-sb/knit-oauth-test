import {useSearchParams} from 'react-router-dom';

function Authorize (){
    const [searchParams, setSearchParams] = useSearchParams();
    console.log('app code ',searchParams.get(`code`), searchParams.get('state'))

    return (
        <div>
            <h1>AUthorize OAUTH</h1>
        </div>
    )

}

export default Authorize;