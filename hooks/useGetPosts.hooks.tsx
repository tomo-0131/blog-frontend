import axios from "axios";

const useGetPosts = () => {
	axios.get("http://localhost:8000/api/posts");
};

export default useGetPosts;
