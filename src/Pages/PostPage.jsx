import{useParams, Link} from 'react-router-dom'
import{useState, useEffect} from 'react';
import {supabase} from '../App'
import styles from "./PostPage.module.css"

const PostPage=({postId})=>{
    const { id }= useParams();
    const [newComments, setNewComments] = useState([]);
    const [mainComments, setMainComments] = useState([]);
    
   
    const[count,setCount]=useState(0);
    const[post,setPost]=useState({created_at:"",title:"",content:"", image_url:""})
      useEffect(() => {
      const fetchComments = async () => {
        const { data,error } = await supabase
          .from('skincare')
          .select('comments')
          .eq('id',id)
       
          if(data){
            setMainComments(data);

            console.log("this is data for Comments", mainComments)
          }else{
            console.error("this is error", error)
          }
      };

  
      fetchComments();
    }, [id]);
   
    
    const createComments = async (event) => {
      event.preventDefault();
      console.log("the data is for newComments" + newComments);
    
      // Fetch the current comments
      const { data, error } = await supabase
        .from('skincare')
        .select('comments')
        .eq('id', id);
    
      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        // Add newComments to the current comments
        const currentComments = Array.isArray(data[0].comments) ? data[0].comments : [];       
  
        console.log("this is current comments", currentComments);
        const updatedComments = [...currentComments, newComments];
        console.log(updatedComments);
    
        // Update the comments field
        const { data: updatedData, error: updateError } = await supabase
          .from('skincare')
          .update({ comments: updatedComments })
          .eq('id', id);
    
        if (updateError) {
          console.error('Error updating comments:', updateError);
        } else {
          console.log('Updated comments:', updatedComments);
          setMainComments(updatedComments); // Update the mainComments state
        }
      }
    };
const handleChange = (event)=>{
  setNewComments(event.target.value);
}
   
    
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('skincare')
                .select('*')
                .eq('id', id)
                .single();

            if (data) {
                setPost(data);
           
            } else {
                console.error('Error fetching post:', error.message, error);
            }
        };

        fetchPost();
    }, [id]);
    
    useEffect(() => {
      const fetchCount = async () => {
        const { data,error } = await supabase
          .from('skincare')
          .select('upvotes')
          .eq('id',id)
       
          if(data){
            setCount(data[0].upvotes);

           // console.log("this is count data", data[0].upvotes)
          }else{
            console.error("this is error", error)
          }
      };

  
      fetchCount();
    }, [id]);
    const updateCount = async (event) => {
      event.preventDefault();
    
      // Fetch the current upvotes
      const { data, error } = await supabase
        .from('skincare')
        .select('upvotes')
        .eq('id', id);
    
      if (error) {
        console.error('Error fetching upvotes:', error);
      } else {
        // Increment upvotes and update the field
        const newUpvotes = data[0].upvotes + 1;
        const { data: updatedData, error: updateError } = await supabase
          .from('skincare')
          .update({ upvotes: newUpvotes })
          .eq('id', id);
    
        if (updateError) {
          console.error('Error updating upvotes:', updateError);
        } else {
        //  console.log('Updated upvotes:', newUpvotes);
          setCount(count + 1);
        }
      }
    };
 /*    const handleChange = (event) => {

      const {name, value}=event.target;
      setDisplayComments((prev)=>{
          return{
              ...prev,
              [name]:value,}})
   

      // const {name, value}=event.target;
      // setPostComments((prev)=>{
      //     return{
      //         ...prev,
      //         [name]:value,
      //     }
      // })
  } */
  const deletePost=async(event)=>{
    event.preventDefault();
    await supabase
.from('skincare')
.delete()
.eq('id', id);

window.location = "/";


}
    return(
       
        <div >
             <p>created at: {post.created_at}</p>
            <h3>title: {post.title}</h3>
            <h6>content: {post.content}</h6>
            <img src={post.image_url} style={{width:"400px", height:"400px"}}/>
            <button onClick={updateCount}>{count}</button>
            

           {
 
    mainComments ? mainComments.map((comment, index) => (
        <p key={index} style={{ display: 'block' }}>
          {comment.comments}
        </p>
      ))
    : <h2>{'No comments ;('}</h2>
} 
 <form onSubmit={createComments}>

  
<input type="text" name="storeComments" placeholder="Add a comment "onChange={handleChange}/>

               
<button type='submit' > create comment</button>


</form> 
<button className="deleteButton" onClick={deletePost}>Delete</button>
       
      <Link to={'/edit/'+id}><button>Edit Post</button></Link>
        </div>
    )

}
export default PostPage;