
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ChatPage from './Pages/ChatPage'
import { ChakraProvider } from '@chakra-ui/react'
import Login from './components/Authentication/Login'
import SignUp from './components/Authentication/SignUp'
import { ChatProvider } from './context/ChatProvider'
import Homepage1 from './Pages/Homepage1'
function App() {


  return (
    <>
      <div className='bg-black'>
        <BrowserRouter>

          <ChakraProvider>


            <Routes>
              <Route path="/" element={<Homepage1 />} />
            </Routes>
            <ChatProvider>
              <Routes>

                <Route path="/chat" element={<ChatPage />} />
                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<SignUp />} />


              </Routes>
            </ChatProvider>
          </ChakraProvider>

        </BrowserRouter>

      </div>



    </>
  )
}

export default App
