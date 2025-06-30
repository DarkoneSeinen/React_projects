const Notification = ({ message }) => {
  const style = {
    border: '1px solid green',
    padding: 10,
    marginBottom: 10
  }

  if (!message) return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
