import styles from "./Update.module.css"
import React from 'react';
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {supabase} from '../App'

const UpdatePost =()=>{
    const {id}= useParams();
    const[post,setPost]=useState({title:"", content:"",image_url:""})
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
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id]);

    const updatePost=async(event)=>{
        event.preventDefault()
        await supabase
        .from('skincare')
        .update({title: post.title, content:post.content,image_url:post.image_url})
        .eq('id',id);
       
      
            window.location = "/";

    }
  
    const handleChange = (event)=>{
        const {name, value}= event.target;
        setPost((prev)=>{
            return{
                ...prev,
                [name]:value,
            }
        })
    }
    return(
        <div className="UpdatePost" style={{  position: "absolute", top: "50%",left: "50%" ,transform: "translate(-50%, -50%)"}}>
        <h2>Update Your Post</h2>
        <h3>Current Post Info: </h3>
        <h4>{post.title},{post.content},{post.image_url}</h4>

        <form className={styles.contained}>
<div >
<input type="text" name="title" placeholder="Title" onChange={handleChange} />
<input type="text" name="content" placeholder="Content(Optional)" onChange={handleChange} />
<input type="text" name="image_url" placeholder="Image URL(Optional)" onChange={handleChange} />
<input type="submit" value="Update Post" onClick={updatePost} />
</div>
</form>

          
         
    </div>
    )

}
export default UpdatePost;