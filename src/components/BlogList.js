import { Link } from "react-router-dom";
import Togglable from "./Toggleable";
import BlogForm from "./BlogForm";
import { Box, Paper, Typography } from "@mui/material";

const BlogList = ({
  blogList,
  createBlog,
  setNewBlog,
  newBlog,
  blogFormRef,
}) => {
  return (
    <div>
      <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
          newBlog={newBlog}
          setNewBlog={setNewBlog}
        />
      </Togglable>
      {blogList &&
        blogList
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Paper key={blog.id} elevation={3}>
              <Box sx = {{m:3}}>
              <Link
                to={`/blogs/${blog.id}`}
              >
               <Typography> {blog.title}</Typography>
              </Link>
              </Box>
            </Paper>
          ))}{" "}
    </div>
  );
};

export default BlogList;
