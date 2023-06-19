import { useContext, useState } from "react";
import NotificationContext from "../NotificationContext";
import blogs from "../services/blogs";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
const Blog = ({ blogList }) => {
  const { likeNotif } = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const { deleteNotif, commentNotif } = useContext(NotificationContext);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const removeBlogMutation = useMutation(blogs.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
    onError: () => console.log("uh oh"),
  });
  const removeBlog = (blog) => async () => {
    console.log(blog);
    if (
      window.confirm(
        `Are you sure you want to remove ${blog.title} by ${blog.author}`
      )
    ) {
      deleteNotif(blog);
      await removeBlogMutation.mutateAsync(blog.id);
    }
    navigate("/");
  };
  const addLikeMutation = useMutation(blogs.update, {
    onSuccess: () => queryClient.invalidateQueries("blogs"),
  });
  const likeHandler = async () => {
    likeNotif();
    console.log(blog);
    addLikeMutation.mutateAsync({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    });
  };
  const createCommentMutation = useMutation(blogs.createComment,{
    onSuccess: () => queryClient.invalidateQueries("blogs"),
  });

  const id = useParams().id;
  if (!blogList) {
    return <div>loading...</div>;
  }

  const blog = blogList.find((blog) => blog.id === id);

  const createComment = async (e) => {
    e.preventDefault();
    createCommentMutation.mutateAsync({comment,id:blog.id});
    commentNotif();
    setComment("")
  };
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        {blog.url}
        <br />
        Likes {blog.likes} <button onClick={likeHandler}>Like</button>
        <br />
        added by {blog.user.name}
        <br />
        <button
          style={{ backgroundColor: "#0558fc", color: "white" }}
          onClick={removeBlog(blog)}
        >
          remove
        </button>
      </div>
      <h3>comments</h3>
      <form onSubmit={createComment}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={Math.floor(Math.random() * 10000)}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
