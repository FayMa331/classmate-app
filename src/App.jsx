import React from 'react'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'
import './App.css'

// NavBar Component
function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="logo">ClassMate</h1>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/browse">Browse Students</Link></li>
          <li><Link to="/profile/1">My Profile</Link></li>
          <li><a href="#" className="btn-signin">Sign In</a></li>
        </ul>
      </div>
    </nav>
  )
}

// Footer Component  
function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 ClassMate. All rights reserved.</p>
      <p>Contact: hello@classmate.com | Made with ❤️ at Northwestern</p>
    </footer>
  )
}

// Home Page - 淡紫色背景
function Home() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', minHeight: '80vh' }}>
      {/* Hero Section */}
      <div style={{ 
        padding: '80px 40px 60px', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        textAlign: 'center' 
      }}>
        <h1 style={{ 
          fontSize: '56px', 
          marginBottom: '24px', 
          color: '#1F2937',
          fontWeight: '800',
          lineHeight: '1.2'
        }}>
          Find Your Study Buddy at Northwestern
        </h1>
        <p style={{ 
          fontSize: '20px', 
          color: '#6B7280', 
          marginBottom: '40px',
          maxWidth: '700px',
          margin: '0 auto 40px'
        }}>
          Connect with classmates, form study groups, and ace your classes together
        </p>
        <Link 
          to="/browse"
          style={{
            display: 'inline-block',
            backgroundColor: '#5B21B6',
            color: 'white',
            padding: '16px 48px',
            borderRadius: '30px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: '600',
            boxShadow: '0 4px 14px rgba(91, 33, 182, 0.4)'
          }}
        >
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '40px 40px 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px'
      }}>
        {/* Feature 1 */}
        <div style={{
          background: 'white',
          padding: '40px 32px',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
        }}>
          <h3 style={{ 
            fontSize: '24px', 
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: '16px'
          }}>
            Find Classmates
          </h3>
          <p style={{ 
            fontSize: '16px', 
            color: '#6B7280',
            lineHeight: '1.6'
          }}>
            Discover students in your classes and connect for study sessions
          </p>
        </div>

        {/* Feature 2 */}
        <div style={{
          background: 'white',
          padding: '40px 32px',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
        }}>
          <h3 style={{ 
            fontSize: '24px', 
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: '16px'
          }}>
            Form Study Groups
          </h3>
          <p style={{ 
            fontSize: '16px', 
            color: '#6B7280',
            lineHeight: '1.6'
          }}>
            Create or join study groups for upcoming exams and projects
          </p>
        </div>

        {/* Feature 3 */}
        <div style={{
          background: 'white',
          padding: '40px 32px',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
        }}>
          <h3 style={{ 
            fontSize: '24px', 
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: '16px'
          }}>
            Share Resources
          </h3>
          <p style={{ 
            fontSize: '16px', 
            color: '#6B7280',
            lineHeight: '1.6'
          }}>
            Exchange notes, study guides, and helpful resources with peers
          </p>
        </div>
      </div>
    </div>
  )
}

// Browse Page - 淡紫色背景 + 紫色头像
function BrowseStudents() {
  const [students, setStudents] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState('')

  // 获取学生数据
  React.useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://disc-assignment-5-users-api-iyct.onrender.com/api/users')
        const data = await response.json()
        console.log('Fetched students:', data)
        
        // 为没有课程数据的学生添加示例课程
        const studentsWithClasses = data.map(student => ({
          ...student,
          classes: student.classes || ['CS 111', 'ECON 201', 'MATH 228']
        }))
        
        setStudents(studentsWithClasses)
      } catch (error) {
        console.error('Error fetching students:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  // 筛选学生
  const filteredStudents = students.filter(student => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase()
    const query = searchQuery.toLowerCase()
    return fullName.includes(query) || student.major.toLowerCase().includes(query)
  })

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        fontSize: '24px',
        color: '#5B21B6',
        background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)'
      }}>
        <div>Loading students... ⏳</div>
      </div>
    )
  }

  return (
    <main style={{ 
      background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', 
      minHeight: '80vh', 
      padding: '40px 20px' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: '8px'
          }}>
            Browse Students
          </h1>
        </div>

        {/* Search Section */}
        <div style={{ 
          display: 'flex', 
          gap: '12px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          <input 
            type="text" 
            placeholder="Search by name or major..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: '1',
              minWidth: '250px',
              padding: '12px 20px',
              borderRadius: '30px',
              border: '2px solid #E5E7EB',
              fontSize: '15px',
              outline: 'none',
              background: 'white'
            }}
          />
          <button style={{
            padding: '12px 28px',
            background: 'white',
            border: '2px solid #E5E7EB',
            borderRadius: '30px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            color: '#1F2937'
          }}>Year</button>
          <button style={{
            padding: '12px 28px',
            background: 'white',
            border: '2px solid #E5E7EB',
            borderRadius: '30px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            color: '#1F2937'
          }}>Major</button>
          <button style={{
            padding: '12px 28px',
            background: 'white',
            border: '2px solid #E5E7EB',
            borderRadius: '30px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            color: '#1F2937'
          }}>Filter</button>
        </div>

        {/* Student Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => {
              // 紫色背景的 UI Avatars
              const avatarUrl = `https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}&background=5B21B6&color=fff&size=100&font-size=0.4&bold=true`
              
              return (
                <div key={student.id} style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '32px 24px',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                }}>
                  <img 
                    src={avatarUrl}
                    alt={`${student.firstName} ${student.lastName}`}
                    style={{ 
                      width: '100px', 
                      height: '100px', 
                      borderRadius: '50%', 
                      objectFit: 'cover',
                      marginBottom: '16px'
                    }}
                  />
                  <h2 style={{ 
                    fontSize: '22px', 
                    fontWeight: '700',
                    color: '#1F2937',
                    marginBottom: '6px'
                  }}>
                    {student.firstName} {student.lastName}
                  </h2>
                  <p style={{ 
                    fontSize: '14px',
                    color: '#6B7280',
                    marginBottom: '20px'
                  }}>
                    {student.major} • {student.year || 'Junior'}
                  </p>
                  
                  {/* Classes Tags - 竖向排列 */}
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: '8px',
                    marginBottom: '20px',
                    alignItems: 'center'
                  }}>
                    {student.classes && student.classes.slice(0, 3).map((cls, index) => (
                      <div key={index} style={{
                        width: '100%',
                        maxWidth: '180px',
                        padding: '8px 16px',
                        background: '#F9FAFB',
                        color: '#1F2937',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        {cls}
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    to={`/profile/${student.id}`}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '12px 24px',
                      background: '#5B21B6',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '30px',
                      fontSize: '15px',
                      fontWeight: '600',
                      marginTop: '16px'
                    }}
                  >
                    View Profile
                  </Link>
                </div>
              )
            })
          ) : (
            <p style={{ 
              gridColumn: '1 / -1',
              textAlign: 'center',
              fontSize: '18px',
              color: '#9CA3AF',
              padding: '40px'
            }}>
              No students found. Try a different search!
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

// Profile Page - 淡紫色背景 + 紫色头像
function Profile() {
  const { id } = useParams()
  const [student, setStudent] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://disc-assignment-5-users-api-iyct.onrender.com/api/users/${id}`)
        const data = await response.json()
        console.log('Fetched student:', data)
        
        // 为没有课程数据的学生添加示例课程
        if (!data.classes || data.classes.length === 0) {
          data.classes = ['CS 111', 'ECON 201', 'MATH 228', 'STAT 210']
        }
        
        setStudent(data)
      } catch (error) {
        console.error('Error fetching student:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudent()
  }, [id])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        fontSize: '24px',
        color: '#5B21B6',
        background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)'
      }}>
        Loading profile... ⏳
      </div>
    )
  }

  if (!student) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Student not found</div>
  }

  // 紫色背景的 UI Avatars
  const avatarUrl = `https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}&background=5B21B6&color=fff&size=140&font-size=0.4&bold=true`

  return (
    <div style={{ 
      minHeight: '80vh',
      background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '650px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        padding: '50px 60px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img 
            src={avatarUrl}
            alt={`${student.firstName} ${student.lastName}`}
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '20px'
            }}
          />
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: '8px',
            letterSpacing: '-0.5px'
          }}>
            {student.firstName} {student.lastName}
          </h1>
          <p style={{ 
            fontSize: '16px', 
            color: '#6B7280',
            fontWeight: '400'
          }}>
            {student.major} • {student.year || 'Junior'} • Class of {student.graduationYear}
          </p>
        </div>

        {/* About Me Section */}
        <div style={{ marginBottom: '36px', textAlign: 'left' }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: '16px'
          }}>
            - About Me
          </h2>
          <p style={{ 
            fontSize: '15px', 
            lineHeight: '1.7',
            color: '#4B5563',
            marginLeft: '12px'
          }}>
            {student.bio}
          </p>
        </div>

        {/* Current Classes Section */}
        <div style={{ marginBottom: '36px', textAlign: 'left' }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: '16px'
          }}>
            - Current Classes
          </h2>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '12px',
            marginLeft: '12px'
          }}>
            {student.classes.map((cls, index) => (
              <span key={index} style={{
                padding: '8px 18px',
                background: '#F3F4F6',
                color: '#5B21B6',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                {cls}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div style={{ marginBottom: '40px', textAlign: 'left' }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: '16px'
          }}>
            - Contact
          </h2>
          <div style={{ 
            fontSize: '15px', 
            color: '#4B5563', 
            lineHeight: '1.8',
            marginLeft: '12px'
          }}>
            <div style={{ marginBottom: '8px' }}>
              📧 {student.email}
            </div>
            {student.discord && (
              <div>
                💬 Discord: {student.discord}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '16px',
          marginTop: '40px'
        }}>
          <button style={{
            flex: 1,
            padding: '16px 32px',
            background: '#5B21B6',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(91, 33, 182, 0.2)'
          }}>
            Send Message
          </button>
          <button style={{
            flex: 1,
            padding: '16px 32px',
            background: 'white',
            color: '#5B21B6',
            border: '2px solid #5B21B6',
            borderRadius: '30px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowseStudents />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App