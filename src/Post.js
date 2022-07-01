import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Post() {
  const [result, setresult] = useState(null);
  const location = useLocation();
  useEffect(() => {
    console.log(location);
    apicall(`https://jsonplaceholder.typicode.com/posts/${location.state.id}`);
    console.log(result);
  }, []);

  const apicall = async (url) => {
    const res = await axios.get(url);
    console.log(res.data);
    setresult(res.data);
  };

  return (
    <>
      {!result ? (
        <div>
          <h1>Post</h1>
          <h2>Loading</h2>
          <Link to="/">back to home</Link>
        </div>
      ) : (
        <div>
          <h1>POST1</h1>
          <h1> {result.title}</h1>
          <p>{result.body}</p>
          <Link to="/">back to home</Link>
        </div>
      )}
    </>
  );
}

export default Post;
