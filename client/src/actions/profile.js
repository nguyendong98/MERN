import axios from 'axios';

import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACOUNT_DELETE,
    GET_PROFILES,
    GET_REPOS
} from './types'

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

// Get all profile
export const getProfiles = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE})
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

// Get  profile by user
export const getProfileById = userId => async dispatch => {
    
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

// Get  github repos
export const getGithubRepos = username => async dispatch => {
    
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}
//Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Edit Profile Success' : 'Create Profile Success', 'success'))
        if(!edit){
            history.push('/dashboard');
        }

    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({
            type: PROFILE_ERROR
        })
    }
} 

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Add Experience Success', 'success'))
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({
            type: PROFILE_ERROR
        })
    }
}

// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Add Education Success', 'success'))
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({
            type: PROFILE_ERROR
        })
    }
}


//delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res =  await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Delete Experience Success', 'success'));    
    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({
            type: PROFILE_ERROR
        })
    }   
}
export const deleteEducation = id => async dispatch => {
    try {
        const res =  await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Delete Education Success', 'success'));    
    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({
            type: PROFILE_ERROR
        })
    }   
}

//delete Acount and Profile
export const deleteAcount = () => async dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')){
        try {
            await axios.delete('/api/profile');
            dispatch({type: CLEAR_PROFILE});
            dispatch({type: ACOUNT_DELETE})
            dispatch(setAlert('Your Acount has been delete', 'success'))
            // console.log(res)
    
        } catch (error) {
            const errors = error.response.data.errors
            if(errors){
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
            
            dispatch({
                type: PROFILE_ERROR
            })
        }
    }   
    
}