import { useState } from 'react'
import { validateStudent } from '../utils/validation'

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  course: '',
  dateOfBirth: '',
}

// Used for both Add and Edit. "initialValues" is filled when editing.
function StudentForm({ initialValues, onSubmit, submitting, submitLabel }) {
  const [values, setValues] = useState({ ...emptyForm, ...initialValues })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validateStudent(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    // Empty strings become null so Spring accepts them
    onSubmit({
      ...values,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      course: values.course.trim(),
      phone: values.phone.trim(),
      dateOfBirth: values.dateOfBirth || null,
    })
  }

  const field = (name, label, type = 'text') => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={values[name] ?? ''}
        onChange={handleChange}
        className={errors[name] ? 'input-error' : ''}
      />
      {errors[name] && <span className="error-text">{errors[name]}</span>}
    </div>
  )

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        {field('firstName', 'First name *')}
        {field('lastName', 'Last name *')}
        {field('email', 'Email *', 'email')}
        {field('phone', 'Phone')}
        {field('course', 'Course *')}
        {field('dateOfBirth', 'Date of birth', 'date')}
      </div>
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}

export default StudentForm