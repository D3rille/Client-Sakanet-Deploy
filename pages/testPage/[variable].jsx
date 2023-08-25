import { useRouter } from 'next/router.js';

export default function testDynamic (){
    const router = useRouter();
    const queryData = router.query.variable;
    return(
        <div style={{width:"100%", textAlign:"center", marginTop:"300px"}}>
            <h1>{queryData}</h1>
        </div>
    );
}