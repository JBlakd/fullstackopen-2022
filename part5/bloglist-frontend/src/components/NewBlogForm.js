const NewBlogForm = ({ newBlogState, setNewBlogState, handleNewBlog }) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={handleNewBlog}>
      <div>
        title:
        <input
          type="text"
          value={newBlogState.title}
          name="Title"
          onChange={({ target }) => {
            const newBlogObject = { ...newBlogState, title: target.value }
            setNewBlogState(newBlogObject)
          }}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newBlogState.author}
          name="Author"
          onChange={({ target }) => {
            const newBlogObject = { ...newBlogState, author: target.value }
            setNewBlogState(newBlogObject)
          }}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newBlogState.url}
          name="Url"
          onChange={({ target }) => {
            const newBlogObject = { ...newBlogState, url: target.value }
            setNewBlogState(newBlogObject)
          }}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

export default NewBlogForm