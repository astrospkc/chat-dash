
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import ChatPage from './Pages/ChatPage'
import { ChakraProvider } from '@chakra-ui/react'
import Login from './components/Authentication/Login'
import SignUp from './components/Authentication/SignUp'
import { ChatProvider } from './context/ChatProvider'
function App() {


  return (
    <>
      <div className='bg-black'>
        <ChakraProvider>

          <BrowserRouter>
            <Routes>
              <Route path="/" Component={Homepage} />
            </Routes>
            <ChatProvider>
              <Routes>
                <Route path="/" Component={Homepage} />
                <Route path="/chat" Component={ChatPage} />
                <Route path="/login" Component={Login} />

                <Route path="/signup" Component={SignUp} />


              </Routes>
            </ChatProvider>

          </BrowserRouter>




        </ChakraProvider>

      </div>



    </>
  )
}

export default App
