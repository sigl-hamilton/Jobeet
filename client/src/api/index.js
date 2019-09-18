import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertJob = payload => api.post(`/job`, payload)
export const getAllJobs = () => api.get(`/job/list`)
export const updateJobById = (id, payload) => api.put(`/job/${id}`, payload)
export const deleteJobById = id => api.delete(`/job/${id}`)
export const getJobById = id => api.get(`/job/${id}`)
export const getProfilById = id => api.get(`/account/profil/${id}`)
export const getCandidates = () => api.get(`/candidate/list`)

const apis = {
    insertJob,
    getAllJobs,
    updateJobById,
    deleteJobById,
    getJobById,
    getCandidates
}

export default apis
