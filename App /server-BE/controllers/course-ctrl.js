const Course = require('../models/course-model');

const createCourse = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Course',
        });
    }

    const courseInstance = new Course(body);

    try {
        await courseInstance.save();
        return res.status(201).json({
            success: true,
            id: courseInstance._id,
            message: 'Course created!',
        });
    } catch (error) {
        console.error('Failed to create course:', error);
        return res.status(400).json({
            success: false,
            error: 'Course not created!',
        });
    }
};

const updateCourse = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    try {
        const foundCourse = await Course.findById(req.params.id);
        
        if (!foundCourse) {
            return res.status(404).json({
                success: false,
                message: 'Course not found!',
            });
        }

        foundCourse.name = body.name;
        foundCourse.description = body.description;
        foundCourse.term = body.term;
        foundCourse.location= body.location;
        foundCourse.credit_hr = body.credit_hr;

        await foundCourse.save();
        return res.status(200).json({
            success: true,
            id: foundCourse._id,
            message: 'Course updated!',
        });
    } catch (error) {
        console.error('Error updating course:', error);
        return res.status(500).json({
            success: false,
            error: 'An error occurred while updating the Course!',
        });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);

        if (!deletedCourse) {
            return res.status(404).json({ success: false, error: 'Course not found' });
        }

        return res.status(200).json({ success: true, data: deletedCourse });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

const getCourseById = async (req, res) => {
    try {
        const foundCourse = await Course.findById(req.params.id);

        if (!foundCourse) {
            return res.status(404).json({ success: false, error: 'Course not found' });
        }

        return res.status(200).json({ success: true, data: foundCourse });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        if (!courses.length) {
            return res.status(404).json({ success: false, error: 'Courses not found' });
        }

        return res.status(200).json({ success: true, data: courses });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

module.exports = {
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
    getCourses,
};