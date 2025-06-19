export const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((fav, blog) => {
    return (fav.likes > blog.likes) ? fav : blog
  })
}
