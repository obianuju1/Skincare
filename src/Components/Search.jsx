import React from 'react'
import styles from './Search.module.css'
import { supabase } from "../App"
import { useState, useEffect } from 'react';
import HomePost from '../Pages/HomePost';


// ...



const Search = ({setPosts, setSearchResults}) => {

  const [searchInput, setSearchInput] = useState("");


  const handleSearch = async (event) => {
    event.preventDefault();
    const searchQuery = searchInput.split(' ').join(' & ');
    const { data, error } = await supabase
      .from('skincare')
      .select()
      .textSearch('title', searchQuery);
    console.log("this is the datatata",data)
    if (data) {
      setPosts(data);
      setSearchResults(data);
      console.log("this is the data"
      ,data);
    } else {
      console.error('Error searching:', error);
    }
  };

console.log(searchInput);
  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search here"
          value={searchInput}
          onChange={(e) => { setSearchInput(e.target.value) }}

        /></form>
 
    {/*     
     {
        posts && posts.length > 0 ?
          posts.map((post, index) =>
            <HomePost key={index} time={post.created_at} id={post.id} title={post.title} upvotes={post.upvotes} />

          )
          : <h2>{'No Post ;('}</h2>
      } */}
    </>
  )

}
export default Search;