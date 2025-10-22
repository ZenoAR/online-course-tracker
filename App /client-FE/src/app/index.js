import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { NavBar } from '../components'
import { CoursesList, CoursesInsert, CoursesUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'
import Greetings from '../pages/Greetings'

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Greetings />} />
                <Route path="/courses/list" element={<CoursesList />} />
                <Route path="/courses/create" element={<CoursesInsert />} />
                <Route path="/courses/update/:id" element={<CoursesUpdate />} />
            </Routes>
        </Router>
    )
}

export default App

