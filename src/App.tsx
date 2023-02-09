import { Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import Header from "./components/Header"
import Content from "./components/transaction/Content"
import Description from "./components/Description"
import Footer from "./components/Footer"
import { TransactionsProvider } from './context/TransactionsProvider'

function App() {
  
  const content = (
    <>
     <TransactionsProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/description" element={<Description />} />
        </Routes>
        <Footer />
      </Router>
      </TransactionsProvider>
    </>
  )

  return content
}

export default App
