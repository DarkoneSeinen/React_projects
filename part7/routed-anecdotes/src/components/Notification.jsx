import { useSelector } from 'react-redux'

const Notification = () => {
  const n = useSelector(s => s.notification)
  if (!n) return null
  return <div style={{ border: '2px solid green', padding: 10 }}>{n}</div>
}

export default Notification
