// Checks the form values and returns an object of errors.
// An empty object means everything is valid.
export function validateStudent(values) {
  const errors = {}

  if (!values.firstName.trim()) errors.firstName = 'First name is required'
  else if (values.firstName.length > 50) errors.firstName = 'Maximum 50 characters'

  if (!values.lastName.trim()) errors.lastName = 'Last name is required'
  else if (values.lastName.length > 50) errors.lastName = 'Maximum 50 characters'

  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email'

  if (values.phone && !/^[0-9+\-\s]{7,15}$/.test(values.phone)) {
    errors.phone = 'Phone must be 7-15 digits'
  }

  if (!values.course.trim()) errors.course = 'Course is required'

  if (values.dateOfBirth && new Date(values.dateOfBirth) >= new Date()) {
    errors.dateOfBirth = 'Date of birth must be in the past'
  }

  return errors
}