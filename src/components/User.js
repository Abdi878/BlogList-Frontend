import { useParams } from "react-router-dom"

const User = ({userStatus,userData}) =>{
    const id = useParams().id
    if(userStatus === "loading"){
        return <div>loading..</div>
    }
    const user = userData.find(n => n.id === id)
    return(<div>
        <h2>{user.username}</h2>
        <h3>Blogs</h3>
        <ul>
        {user.blogs.map(blog=><li key ={blog.id}>{blog.title}</li>)}
        </ul>
    </div>) 

}

export default User