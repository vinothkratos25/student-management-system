import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="empty">
      <h2>404 - Page not found</h2>
      <Link to="/">Back to students</Link>
    </div>
  )
}

export default NotFoundPage