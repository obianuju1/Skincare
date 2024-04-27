import React, { useEffect, useCallback,useState } from 'react';
import HomePost from './HomePost';
import { supabase } from '../App'
import styles from './Home.module.css'
import Search from '/src/Components/Search.jsx'

const Home = ({ posts, setPosts}) => {
    const[count,setCount]=useState(0);
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from('skincare')
        .select()
        
      setPosts(data);
    };

    fetchPost();
  }, []);

  const sortByLastest = useCallback(async () => {
    const { data, error } = await supabase
      .from('skincare')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
  }, []);

  useEffect(() => {
    sortByLastest();
  }, [sortByLastest]);
  useEffect(() => {
    const fetchCount = async () => {
      const { data } = await supabase
        .from('skincare')
        .select('upvotes')
        
      setCount(data);
      console.log(data);
    };

    fetchCount();
  }, []);

    const orderByPopular = () => {
        const sortedPosts = [...posts].sort((a, b) => b.upvotes - a.upvotes);
        setPosts(sortedPosts);
      };


  return (
    <div>
      <h2>Sort BY</h2>
      <button onClick={sortByLastest}>Lastest</button>
      <button onClick={orderByPopular}>Popular</button>
      {
        posts && posts.length > 0
          ? posts.map((post, index) =>
            <HomePost key={index} time={post.created_at} id={post.id} title={post.title} upvotes={post.upvotes} />
          )
          : <h2>{'No Post ;('}</h2>
      }
    </div>
  );
};

export default Home;