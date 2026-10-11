import { Link } from 'react-router-dom'

function StudentTable({ students, onDelete }) {
  if (students.length === 0) {
    return <p className="empty">No students found.</p>
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Date of birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.email}</td>
              <td>{s.phone || '-'}</td>
              <td>{s.course}</td>
              <td>{s.dateOfBirth || '-'}</td>
              <td className="actions">
                <Link className="btn btn-small" to={`/edit/${s.id}`}>Edit</Link>
                <button className="btn btn-small btn-danger" onClick={() => onDelete(s)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable