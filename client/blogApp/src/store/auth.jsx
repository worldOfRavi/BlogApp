import { createContext, useState, useContext, useEffect } from "react";

//creating context
export const authContext = createContext()

// create context provider
export const AuthProvider = ({children})=>{
    const [userInfo, setUserInfo] = useState({});
    const [posts, setPosts] = useState([]);
    const[postInfo, setPostInfo] = useState(null);


    // function to get all the post details
    const getAllPosts = async()=>{
            try {
                const response = await fetch("http://localhost:3000/post/getPosts",{
                    method:"GET"
                })
                const responsData = await response.json();
                // console.log(responsData.posts);
                setPosts(responsData.posts)
            } catch (error) {
                console.log("Error while fetching the posts data");
            }
    }

    useEffect(()=>{
        getAllPosts();
    },[])

    // function to get the single post details
    const getPostInfo = async (id)=>{
        try {
            const response = await fetch(`http://localhost:3000/post/${id}`,{
                method:"GET",
                credentials:'include',
            })
            const responseData = await response.json();
    
                setPostInfo(responseData.postDetails);
            
        } catch (error) {   
            console.log("Error while getting post details");

        }
    }

    return <authContext.Provider value={{userInfo,setUserInfo,posts,getAllPosts,getPostInfo,postInfo}}>
        {children}
    </authContext.Provider>
}


// create context provider
export const useAuth = ()=>{
    const contextUser  = useContext(authContext);
    return contextUser;
}

