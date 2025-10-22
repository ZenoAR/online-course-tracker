import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // for navigating and getting params
import api from '../api';
import styled from 'styled-components';

const Title = styled.h1.attrs({
    className: 'h1',
})``;

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`;

const Label = styled.label`
    margin: 5px;
`;

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`;

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`;

const CoursesUpdate = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [term, setTerm] = useState('');
    const [location, setLocation] = useState('')
    const [credit_hr, setCredit_hr] = useState('');
    const { id } = useParams();  // Get Course ID from URL
    const navigate = useNavigate(); // To navigate to the Course list after update

    // Fetch Course data on mount
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await api.getCourseById(id);
                const courseData = response.data.data;
                setName(courseData.name);
                setDescription(Array.isArray(courseData.description) ? courseData.description.join('/') : courseData.description);
                setTerm(Array.isArray(courseData.term) ? courseData.term.join('/') : courseData.term);
                setLocation(courseData.location);
                setCredit_hr(courseData.credit_hr);
            } catch (error) {
                console.error('Error fetching Course:', error);
            }
        };
        fetchCourse();
    }, [id]);

    // Handlers for each input field
    const handleChangeInputName = (event) => {
        setName(event.target.value);
    };

    const handleChangeInputDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleChangeInputTerm = (event) => {
        setTerm(event.target.value);
    };

    const handleChangeInputLocation = (event) => {
        setLocation(event.target.value);
    };

    const handleChangeInputCredit_hr = (event) => {
        setCredit_hr(event.target.value);
    };

    const handleUpdateCourse = async () => {
        const arrayDescription = description.split('/');
        const arrayTerm = term.split('/');
        const payload = { name, description: arrayDescription, term: arrayTerm, location, credit_hr };

        try {
            await api.updateCourseById(id, payload);
            window.alert('Course updated successfully');
            navigate('/courses/list'); // Redirect to the Course list page
        } catch (error) {
            console.error('Error updating Course:', error);
            window.alert('Failed to update Course');
        }
    };

    return (
        <Wrapper>
            <Title>Update Course</Title>

            <Label>Name: </Label>
            <InputText
                type="text"
                value={name}
                onChange={handleChangeInputName}
            />

            <Label>Description: </Label>
            <InputText
                type="text"
                value={description}
                onChange={handleChangeInputDescription}
            />

            <Label>Term: </Label>
            <InputText
                type="text"
                value={term}
                onChange={handleChangeInputTerm}
            />

            <Label>Location: </Label>
            <InputText
                type="text"
                value={location}
                onChange={handleChangeInputLocation}
            />

            <Label>Credit Hour: </Label>
            <InputText
                type="number"
                step="1"
                lang="en-US"
                min="1"
                max="3"
                pattern="[0-9]+([,\\.][0-9]+)?"
                value={credit_hr}
                onChange={handleChangeInputCredit_hr}
            />

            <Button onClick={handleUpdateCourse}>Update Course</Button>
            <CancelButton href="/courses/list">Cancel</CancelButton>
        </Wrapper>
    );
};

export default CoursesUpdate;
