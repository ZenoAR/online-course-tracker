import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertCourse = payload => api.post(`/course`, payload)
export const getAllCourses = () => api.get(`/courses`)
export const updateCourseById = (id, payload) => api.put(`/course/${id}`, payload)
export const deleteCourseById = id => api.delete(`/course/${id}`)
export const getCourseinsertCourseById = id => api.get(`/course/${id}`)

const apis = {
    insertCourse,
    getAllCourses,
    updateCourseById,
    deleteCourseById,
    getCourseinsertCourseById,
}

export default apis