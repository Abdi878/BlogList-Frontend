const BlogForm = ({createBlog,setNewBlog,newBlog,}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <form onSubmit={createBlog}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={newBlog.title}
            id="title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            value={newBlog.author}
            id="author"
            name="author"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            type="text"
            value={newBlog.url}
            id="url"
            name="url"
            onChange={handleChange}
          />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
};

export default BlogForm;
