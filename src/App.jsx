import { useState, useEffect } from 'react'
import './App.css'

// NavBar Component
function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">ClassMate</h1>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Browse Students</a></li>
          <li><a href="#">My Profile</a></li>
          <li><a href="#" className="btn-signin">Sign In</a></li>
        </ul>
      </div>
    </nav>
  )
}

// StudentCard Component
function StudentCard({ student, onSave, isSaved }) {
  return (
    <article className="student-card">
      <div className="student-avatar"></div>
      <h2 className="student-name">{student.name}</h2>
      <p className="student-info">{student.major} • {student.year}</p>
      <div className="course-tags">
        {student.courses.map((course, index) => (
          <span key={index} className="tag">{course}</span>
        ))}
      </div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', marginTop: 'auto' }}>
  <button className="btn-view-profile">
    View Profile
  </button>
  <button 
    className={`btn-save ${isSaved ? 'saved' : ''}`}
    onClick={() => onSave(student.id)}
    style={{
      padding: '8px',
      backgroundColor: isSaved ? '#10B981' : 'transparent',
      color: isSaved ? 'white' : '#6B7280',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      borderRadius: '4px'
    }}
  >
    {isSaved ? '✓ Saved' : '♡ Save'}
  </button>
</div>
    </article>
  )
}

// Main App Component
function App() {
  const [students] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      major: "Computer Science",
      year: "Junior",
      courses: ["CS 211", "ECON 201", "MATH 228"]
    },
    {
      id: 2,
      name: "Michael Chen",
      major: "Computer Science",
      year: "Junior",
      courses: ["CS 211", "MATH 228", "PHYS 135"]
    },
    {
      id: 3,
      name: "Emily Davis",
      major: "Statistics",
      year: "Sophomore",
      courses: ["STAT 210", "CS 211", "MATH 220"]
    },
    {
      id: 4,
      name: "James Wilson",
      major: "Economics",
      year: "Senior",
      courses: ["ECON 201", "PHIL 101", "MATH 214"]
    },
    {
      id: 5,
      name: "Lisa Anderson",
      major: "Data Science",
      year: "Junior",
      courses: ["CS 211", "STAT 210", "MATH 228"]
    },
    {
      id: 6,
      name: "David Lee",
      major: "Mathematics",
      year: "Sophomore",
      courses: ["MATH 228", "PHYS 135", "CS 150"]
    }
  ])

  const [savedStudents, setSavedStudents] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    console.log("Saved students:", savedStudents)
  }, [savedStudents])

  const toggleSaveStudent = (studentId) => {
    if (savedStudents.includes(studentId)) {
      setSavedStudents(savedStudents.filter(id => id !== studentId))
    } else {
      setSavedStudents([...savedStudents, studentId])
    }
  }

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.major.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <NavBar />
      
      <main>
        <header className="page-header">
          <h1>Browse Students</h1>
          <p className="saved-count">Saved: {savedStudents.length} students</p>
        </header>

        <section className="search-section">
          <input 
            type="text" 
            className="search-box" 
            placeholder="Search by name or major..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search students"
          />
          <button className="filter-btn">Filter</button>
          <button className="filter-btn">Year</button>
          <button className="filter-btn">Major</button>
        </section>

        <section className="student-grid">
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <StudentCard 
                key={student.id}
                student={student}
                onSave={toggleSaveStudent}
                isSaved={savedStudents.includes(student.id)}
              />
            ))
          ) : (
            <p className="no-results">No students found. Try a different search!</p>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 ClassMate. All rights reserved.</p>
        <p>Contact: hello@classmate.com | Made with ❤️ at Northwestern</p>
      </footer>
    </>
  )
}

export default App
