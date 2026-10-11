import api from './axiosConfig'

// One function per backend endpoint. Components call these,
// so URLs never appear inside components.

// GET /api/students  or  GET /api/students?search=xxx
export const getStudents = async (search = '') => {
  const response = await api.get('/students', {
    params: search ? { search } : {},
  })
  return response.data // the JSON array from Spring Boot
}

// GET /api/students/{id}
export const getStudentById = async (id) => {
  const response = await api.get(`/students/${id}`)
  return response.data
}

// POST /api/students
export const createStudent = async (student) => {
  const response = await api.post('/students', student)
  return response.data
}

// PUT /api/students/{id}
export const updateStudent = async (id, student) => {
  const response = await api.put(`/students/${id}`, student)
  return response.data
}

// DELETE /api/students/{id}
export const deleteStudent = async (id) => {
  await api.delete(`/students/${id}`)
}