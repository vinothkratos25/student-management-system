import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createStudent } from '../api/studentApi'
import { getErrorMessage } from '../api/axiosConfig'
import StudentForm from '../components/StudentForm'
import Alert from '../components/Alert'

function AddStudentPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (student) => {
    setSubmitting(true)
    setError('')
    try {
      await createStudent(student)
      navigate('/', { state: { message: 'Student added successfully' } })
    } catch (e) {
      setError(getErrorMessage(e))
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h2>Add Student</h2>
      <Alert type="error" message={error} onClose={() => setError('')} />
      <StudentForm onSubmit={handleSubmit} submitting={submitting} submitLabel="Save student" />
    </div>
  )
}

export default AddStudentPage