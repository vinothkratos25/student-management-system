import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import StudentListPage from './pages/StudentListPage'
import AddStudentPage from './pages/AddStudentPage'
import EditStudentPage from './pages/EditStudentPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<StudentListPage />} />
          <Route path="/add" element={<AddStudentPage />} />
          <Route path="/edit/:id" element={<EditStudentPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App