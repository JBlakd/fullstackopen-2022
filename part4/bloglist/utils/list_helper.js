// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return (
    blogs
      .reduce((acc, cur) => acc + cur.likes, 0)
  )
}

const favoriteBlog = (blogs) => {
  if (blogs === undefined || blogs.length == 0) {
    return {}
  }

  return (
    blogs
      .reduce((acc, cur) => (cur.likes > acc.likes) ? cur : acc, blogs[0])
  )
}

const mostBlogs = (blogs) => {
  if (blogs === undefined || blogs.length == 0) {
    return {}
  }

  const hashMap = new Map()

  blogs.forEach(blog => {
    if (hashMap.has(blog.author)) {
      hashMap.set(blog.author, hashMap.get(blog.author) + 1)
    } else {
      hashMap.set(blog.author, 1)
    }
  })

  const resultArray = [...hashMap.entries()]
    .reduce((acc, cur) => (cur[1] > acc[1]) ? cur : acc) // ['Dijkstra', 5]

  return (
    {
      'author': resultArray[0],
      'blogs': resultArray[1]
    }
  )
}

const mostLikes = (blogs) => {
  if (blogs === undefined || blogs.length == 0) {
    return {}
  }

  const hashMap = new Map()

  blogs.forEach(blog => {
    if (hashMap.has(blog.author)) {
      hashMap.set(blog.author, hashMap.get(blog.author) + blog.likes)
    } else {
      hashMap.set(blog.author, blog.likes)
    }
  })

  console.log('hashMap: ', hashMap)

  const resultArray = [...hashMap.entries()]
    .reduce((acc, cur) => (cur[1] > acc[1]) ? cur : acc) // ['Dijkstra', 5]

  console.log('resultArray: ', resultArray)

  return (
    {
      'author': resultArray[0],
      'likes': resultArray[1]
    }
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}