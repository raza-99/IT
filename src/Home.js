import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [id, setid] = useState("");
  let navigate = useNavigate();
  const getpost = (data) => {
    navigate("/post", { state: { id: data } });
  };
  return (
    <div>
      <h1>Welcome</h1>
      <h2>Search a Post by its ID</h2>
      <span>
        <h4>
          Post ID:{" "}
          <input
            placeholder="Type"
            onChange={(eve) => {
              setid(eve.target.value);
            }}
          ></input>
        </h4>
        <button
          onClick={() => {
            getpost(id);
          }}
        >
          Search
        </button>
      </span>
    </div>
  );
}

export default Home;
