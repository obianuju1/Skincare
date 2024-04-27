import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './Components/Search'
import {useRoutes, Link } from 'react-router-dom'
import Home from "./Pages/Home"
import Create from "./Pages/Create"
import PostPage from "./Pages/PostPage"
import Update from "./Pages/Update"


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mpmceacenttnjiakyrla.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wbWNlYWNlbnR0bmppYWt5cmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4MDA3MjksImV4cCI6MjAyOTM3NjcyOX0.RGsN0x_Qu32YCpnZOoeGxmusi-WPVHjM6qyGvY3doM4'
const supabase = createClient(supabaseUrl, supabaseKey)
export{supabase}

function App() {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
/*   const[posts,setPosts]=useState([]);
  useEffect(()=>{
    const fetchPost=async()=>{
        const{data}=await supabase
        .from('skincare')
        .select()
        .order('created_at',{ascending:true})
        setPosts(data)
        console.log(data)
    }
  
},[]) */


 let element =useRoutes([
  {
    path:"/",
    // element:<Home posts={posts} setPosts={setPosts}/>
    element:<Home posts={posts}   setPosts={setPosts} />
   
  },
  {
    path:"/create",
    element:<Create/>
   
  },{
    path:"/edit/:id",
    element:<Update/>
   
  },{
    path:"/details/:id",
    element:<PostPage/>
   
  },
 ])



  return (
    <div className="main">
      <div className ="navbar">
        <Link to ="/"><h2>SkinCare Reviews</h2></Link>
        <Link to ="/"><p>Home</p></Link>
        <Link to ="/create"><p>Create New Post</p></Link>
        <Search setPosts={setPosts} setSearchResults={setSearchResults}/>
       
        {/* <div className="search"><Search posts={posts} setPosts={setPosts}/></div> */}
       
        
      </div>
      {element}
    </div>
     
 
  )
}

export default App
