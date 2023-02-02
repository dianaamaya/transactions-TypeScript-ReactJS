import { Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import Header from "./components/Header"
import Content from "./components/transaction/Content"
import Description from "./components/Description"
import Footer from "./components/Footer"


function App() {
  
  const content = (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/description" element={<Description />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )

  return content
}

export default App
