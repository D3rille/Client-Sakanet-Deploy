
import SampleCard from "../../components/sampleCard";
import {useQuery} from '@apollo/client';
import {GET_POSTS_QUERY} from '../../graphql/queries/sampleQuery';

export default function testPage(){

    const {data:postData, loading, error} = useQuery(GET_POSTS_QUERY);
    
    if(loading){
        return <h1>Loading...</h1>
    }

    if(error){
        console.log(error); 
        return null;
    }
    //extract the actual array of data
    const posts = postData.getPosts
    //posts.map((item)=>{console.log(item);})
    return(
        <div>
            {posts.map((post)=>(
                <SampleCard key = {post.id} props={post}/>
            ))};
           
        </div>
    )
}

