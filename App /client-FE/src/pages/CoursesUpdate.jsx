import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    const { id } = useParams(); // Get course ID from route params
    const navigate = useNavigate(); // For navigation after update

    // State for form fields and original data
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [term, setTerm] = useState('');
    const [creditHr, setCreditHr] = useState('');
    const [location, setLocation] = useState('');
    const [originalData, setOriginalData] = useState({});

    // Fetch course data on component mount
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await api.getCourseById(id);
                const course = response.data.data;

                // Set state with fetched data
                setName(course.name);
                setDescription(course.description.join('/'));
                setTerm(course.term.join('/'));
                setLocation(course.location);
                setCreditHr(course.credit_hr);
                setOriginalData({ 
                    name: course.name,
                    description: course.description.join('/'),
                    term: course.term.join('/'),
                    location: course.location,
                    credit_hr: course.credit_hr,
                });
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        fetchCourse();
    }, [id]);

    // Update the course
    const handleUpdateCourse = async () => {
        const payload = {
            name,
            description: description.split('/'),
            term: term.split('/'),
            location,
            credit_hr: creditHr,
            originalData: originalData,
        };

        try {
            await api.updateCourseById(id, payload);
            window.alert('Course updated successfully');
            navigate('/courses/list'); // Redirect to course list
        } catch (error) {
            console.error('Error updating course:', error);
            window.alert('Failed to update course');
        }
    };

    return (
        <Wrapper>
            <Title>Update Course</Title>

            <Label>Name:</Label>
            <InputText
                type="text"
                value={name}
                placeholder={originalData.name || 'Enter name'}
                onChange={(e) => setName(e.target.value)}
            />

            <Label>Description:</Label>
            <InputText
                type="text"
                value={description}
                placeholder={originalData.description || 'Enter description (e.g., Hard/Heavy)'}
                onChange={(e) => setDescription(e.target.value)}
            />

            <Label>Term:</Label>
            <InputText
                type="text"
                value={term}
                placeholder={originalData.term || 'Enter term (e.g., Fall/Spring)'}
                onChange={(e) => setTerm(e.target.value)}
            />

            <Label>Location:</Label>
            <InputText
                type="text"
                value={location}
                placeholder={originalData.location || 'e.g., Online/In-person'}
                onChange={(e) => setLocation(e.target.value)}
            />

            <Label>Credit Hour:</Label>
            <InputText
                type="number"
                step="1"
                lang="en-US"
                min="1"
                max="4"
                value={creditHr}
                placeholder={originalData.credit_hr || 'Enter credit hour (1-4)'}
                onChange={(e) => setCreditHr(e.target.value)}
            />

            <Button onClick={handleUpdateCourse}>Update Course</Button>
            <CancelButton href="/courses/list">Cancel</CancelButton>
        </Wrapper>
    );
};

export default CoursesUpdate;
