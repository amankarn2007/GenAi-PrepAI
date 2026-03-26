import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './app.routes'
import { AuthProvider } from './features/auth/auth.context'
import { InterviewProvider } from './features/interview/interview.context'

function App() {

  return (
    // AuthProvider to access states stored in AuthProvider
    // InterviewProvider to access states

    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
