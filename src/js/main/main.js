import React, { useState, useEffect }  from "react";
import axios from 'axios';
import Post from "./post.js";
import Paging from './paging';
import Search from "./search.js";
import "../css/main.css";
import { Row } from "react-bootstrap";

function Main() {
    // Post List
    const [posts, setPost] = useState("");
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    // Search
    const [searchTerm, setSearchTerm] = useState('');
    // 페이지에 뿌릴 post 갯수
    const postsPerPage = 8;
    
    useEffect(() =>{
        async function fetchDate() {
            const response = await axios.get("http://localhost:3000/posts");
            setPost(response.data);
        }
        fetchDate();
    }, []);
    
    const searchedPosts = [...posts].filter(function(post){
        return post.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
    });

    // Pagination
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    function currentPosts(posts) {
        let currentPosts = [];
        currentPosts = posts.slice(indexOfFirst, indexOfLast);
        return [...currentPosts];
    }
    // Search
    const handleSearch = event => {
        setSearchTerm(event.target.value);
    }
    return (
        <div className="container">
            <Search onSearch={handleSearch} search={searchTerm}/>
            <Row>
                {currentPosts(searchedPosts).map(post => (
                    <Post
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        body={post.body}
                        date={post.published_at}
                        author={post.author}
                    />
                ))}
                </Row>
            <Paging postsPerPage={postsPerPage} totalPosts={posts.length} currentPage={currentPage} paginate={setCurrentPage}></Paging>
        </div>
    );
}

export default Main;