
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    My First MERN Application: Course Schedule
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/courses/list" className="nav-link">
                                List Courses
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/courses/create" className="nav-link">
                                Create Course
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links