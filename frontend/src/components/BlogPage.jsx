import React, { useEffect, useState } from 'react'
import api from '../api'



const BlogPage = () => {
     
     const [articles, setArticles]=useState([]);


     useEffect(()=>{
        getArticles();
     },[]);

     const getArticles= async ()=>{
        
        try{
            const res= await api.get('/api/articles/');
            console.log('response', res);
            setArticles(res.data);

        }catch(err){
          console.log('errororo',err);
        }

     }


  return (
    <div>
       {articles.map((item,index)=>(
         <p key={index}>{item.title}</p>
       ))}
    </div>
  )

}

export default BlogPage
