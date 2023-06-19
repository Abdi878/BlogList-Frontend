import { useState, useEffect, useRef, useContext } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Toggleable";
import login from "./services/login";
import NotificationContext from "./NotificationContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import UserContext from "./UserContext";
import { Link as RouterLink, Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import getAll from "./services/users";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material";
const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const { notification, createdNotif, invalidNotif, missingNotif } =
    useContext(NotificationContext);
  const { user, userDispatch } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { data } = useQuery("blogs", blogService.getAll);
  const { data: userData, status: userStatus } = useQuery("users", getAll);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("storedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "username", payload: user.username });
      userDispatch({ type: "password", payload: user.password });
      userDispatch({ type: "name", payload: user.name });
      userDispatch({ type: "token", payload: user.token });
      blogService.setToken(user.token);
    }
  }, []);
  const blogFormRef = useRef();
  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
    onError: () => missingNotif(),
  });
  const createBlog = async (e) => {
    e.preventDefault();
    const newObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };
    createdNotif(newObject);
    await newBlogMutation.mutateAsync(newObject);
    setNewBlog({ title: "", author: "", url: "" });
    blogFormRef.current.toggleVisibility();
  };
  const logUser = async (e) => {
    e.preventDefault();
    try {
      const user = await login({
        username: username,
        password: password,
      });
      userDispatch({ type: "username", payload: username });
      userDispatch({ type: "password", payload: password });
      userDispatch({ type: "name", payload: user.name });
      console.log(user);
      setUsername("");
      setPassword("");
      blogService.setToken(user.token);
      window.localStorage.setItem("storedUser", JSON.stringify(user));
    } catch (exception) {
      invalidNotif();
    }
  };
  return (
    <div >
      <div>{notification}</div>
      {user == null ? (
        <Togglable buttonLabel="Log-in">
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            logUser={logUser}
          />
        </Togglable>
      ) : (
        <div>
          <AppBar position="sticky">
            <Toolbar position="static">
              <Link
                color="inherit"
                component={RouterLink}
                to="/"
                sx={{ mr: 2 }}
              >
                <Typography>Blogs</Typography>
              </Link>
              <Link
                component={RouterLink}
                color="inherit"
                to="/users"
                sx={{ mr: 2 }}
              >
                <Typography>Users</Typography>
              </Link>
              <Typography>{user.name} is logged in </Typography>
              <Button
                variant="contained"
                sx={{ml:"auto"}}
                color="secondary"
                onClick={() => {
                  window.localStorage.removeItem("storedUser");
                  userDispatch({ type: "null" });
                }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>

          <Typography variant="h3" sx={{ mt: 2 }}>
            blogs
          </Typography>

          <Routes>
            <Route
              path="/"
              element={
                <BlogList
                  blogFormRef={blogFormRef}
                  newBlog={newBlog}
                  setNewBlog={setNewBlog}
                  createBlog={createBlog}
                  blogList={data}
                />
              }
            ></Route>
            <Route
              path="/users"
              element={<Users userData={userData} userStatus={userStatus} />}
            ></Route>
            <Route
              path="/users/:id"
              element={<User userData={userData} userStatus={userStatus} />}
            ></Route>
            <Route path="/blogs/:id" element={<Blog blogList={data} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
