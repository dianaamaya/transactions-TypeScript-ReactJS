import { Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import { MainProvider } from './context/MainProvider'
import { TransactionsProvider } from './context/TransactionsProvider'
import Header from "./components/Header"
import Transactions from "./components/transaction/Content"
import Description from "./components/Description"
import Footer from "./components/Footer"


function App() {
  
  const content = (
    <>
    <MainProvider>
      <TransactionsProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Transactions />} />
            <Route path="/description" element={<Description />} />
          </Routes>
          <Footer />
        </Router>
        </TransactionsProvider>
      </MainProvider>
    </>
  )

  return content
}

export default App
