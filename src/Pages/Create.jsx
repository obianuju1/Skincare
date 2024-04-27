
import React from'react';
import styles from"./Create.module.css";
import {useState} from 'react';
import { supabase } from '/src/App.jsx'

const CreatePost =()=>{
    const[post,setPost]=useState({title:"",content :"",image_url:""})
    const createPost = async (event)=>{
        event.preventDefault();
        await supabase.from('skincare')
        .insert({title:post.title,content:post.content,image_url:post.image_url})
        .select();
      
            window.location = "/";
        
    }
    console.log(post)
    const handleChange = (event)=>{
       
        const {name, value}=event.target;
        setPost((prev)=>{
            return{
                ...prev,
                [name]:value,
            }
        })
    }
   
    return(
       
<div className={styles.CreatePost} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
  

  <form className={styles.formContainer}>
    <input type="text" name="title" placeholder="Title" onChange={handleChange} />
    <input type="text" name="content" placeholder="Content(Optional)" onChange={handleChange} />
    <input type="text" name="image_url" placeholder="Image URL(Optional)" onChange={handleChange} />
    <input type="submit" value="Create Post" onClick={createPost} />
  </form>
</div>
    )
}
export default CreatePost;