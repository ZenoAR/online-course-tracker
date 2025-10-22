import React, { useState } from 'react'
import api from '../api'
import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
    type: 'button', // Ensures the button does not submit a form
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

const CoursesInsert = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [term, setTerm] = useState('')
    const [location, setLocation] = useState('')
    const [credit_hr, setCredit_hr] = useState('')
 

    const handleChangeInputName = (event) => {
        setName(event.target.value)
    }

    const handleChangeInputDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleChangeInputTerm = (event) => {
        setTerm(event.target.value)
    }

    const handleChangeInputLocation = (event) => {
        setLocation(event.target.value)
    }

    const handleChangeInputCredit_hr = (event) => {
        const value = event.target.value
        if (event.target.validity.valid) {
            setCredit_hr(value)
        }
    }
    
    const handleIncludeCourse = async () => {
        const arrayDescription = description.split('/');
        const arrayTerm = term.split('/');
        const payload = { name, description: arrayDescription, term: arrayTerm, location, credit_hr };

        try {
            await api.insertCourse(payload)
            window.alert('Course inserted successfully')
            setName('')
            setDescription('')
            setTerm('')
            setLocation('')
            setCredit_hr('')
        } catch (error) {
            console.error('Failed to insert course:', error)
        }
    }

    return (
        <Wrapper>
            <Title>Create Course</Title>

            <Label>Name: </Label>
            <InputText
                type="text"
                value={name}
                placeholder={'Enter name'}
                onChange={handleChangeInputName}
            />

            <Label>Description: </Label>
            <InputText
                type="text"
                value={description}
                placeholder={'Enter description (e.g., Hard/Heavy)'}
                onChange={handleChangeInputDescription}
            />

            <Label>Term: </Label>
            <InputText
                type="text"
                value={term}
                placeholder={'Enter term (e.g., Fall/Spring)'}
                onChange={handleChangeInputTerm}
            />

            <Label>Location: </Label>
            <InputText
                type="text"
                value={location}
                placeholder={'e.g., Online/In-person'}
                onChange={handleChangeInputLocation}
            />

            <Label>Credit Hour: </Label>
            <InputText
                type="number"
                step="1"
                lang="en-US"
                min="1"
                max="4"
                pattern="[0-9]+([,\\.][0-9]+)?"
                value={credit_hr}
                placeholder={'Enter credit hour (1-4)'}
                onChange={handleChangeInputCredit_hr}
            />

            <Button onClick={handleIncludeCourse}>Add Course</Button>
            <CancelButton href={'/courses/list'}>Cancel</CancelButton>
        </Wrapper>
    )
}

export default CoursesInsert
