import React, { useEffect, useState } from 'react'
import {api} from '../api'



const BlogPage = () => {
     
     const [articles, setArticles]=useState([]);


     useEffect(()=>{
        getArticles();
     },[]);

     const getArticles= async ()=>{
        
        try{
            const res= await api.get('/api/articles/');
            console.log('dataaa',res.data)
            setArticles(res.data);

        }catch(err){
          console.log('errororo',err);
        }

     }


  return (
    <div>
       blog page
    </div>
  )

}

export default BlogPage
