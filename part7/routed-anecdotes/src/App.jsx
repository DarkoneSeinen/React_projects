import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './Menu'
import AnecdoteList from './AnecdoteList'
import About from './About'
import CreateNew from './CreateNew'
import Footer from './Footer'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create" element={<CreateNew />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
