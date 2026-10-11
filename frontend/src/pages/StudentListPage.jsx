import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getStudents, deleteStudent } from '../api/studentApi'
import { getErrorMessage } from '../api/axiosConfig'
import SearchBar from '../components/SearchBar'
import StudentTable from '../components/StudentTable'
import Loader from '../components/Loader'
import Alert from '../components/Alert'
import ConfirmDialog from '../components/ConfirmDialog'

function StudentListPage() {
  const location = useLocation()
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  // A success message may arrive from the Add/Edit page
  const [success, setSuccess] = useState(location.state?.message || '')
  const [toDelete, setToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  // Runs on load and every time "search" changes.
  // The 400 ms delay waits until the user stops typing.
  useEffect(() => {
    let cancelled = false
    const timer = setTimeout(async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getStudents(search)
        if (!cancelled) setStudents(data)
      } catch (e) {
        if (!cancelled) setError(getErrorMessage(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }, 400)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [search])

  const confirmDelete = async () => {
    setDeleting(true)
    try {
      await deleteStudent(toDelete.id)
      // Remove the row locally so the UI updates immediately
      setStudents((prev) => prev.filter((s) => s.id !== toDelete.id))
      setSuccess(`${toDelete.firstName} ${toDelete.lastName} was deleted`)
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
      setDeleting(false)
      setToDelete(null)
    }
  }

  return (
    <div>
      <h2>Students</h2>
      <Alert type="success" message={success} onClose={() => setSuccess('')} />
      <Alert type="error" message={error} onClose={() => setError('')} />
      <SearchBar value={search} onChange={setSearch} />
      {loading ? <Loader /> : <StudentTable students={students} onDelete={setToDelete} />}
      <ConfirmDialog
        open={!!toDelete}
        message={toDelete ? `Delete ${toDelete.firstName} ${toDelete.lastName}? This cannot be undone.` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
        busy={deleting}
      />
    </div>
  )
}

export default StudentListPage