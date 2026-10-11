import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getStudentById, updateStudent } from '../api/studentApi'
import { getErrorMessage } from '../api/axiosConfig'
import StudentForm from '../components/StudentForm'
import Loader from '../components/Loader'
import Alert from '../components/Alert'

function EditStudentPage() {
  const { id } = useParams() // the :id from the URL
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getStudentById(id)
      .then(setStudent)
      .catch((e) => setError(getErrorMessage(e)))
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async (values) => {
    setSubmitting(true)
    setError('')
    try {
      await updateStudent(id, values)
      navigate('/', { state: { message: 'Student updated successfully' } })
    } catch (e) {
      setError(getErrorMessage(e))
      setSubmitting(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <h2>Edit Student</h2>
      <Alert type="error" message={error} onClose={() => setError('')} />
      {student && (
        <StudentForm
          initialValues={student}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Update student"
        />
      )}
    </div>
  )
}

export default EditStudentPage