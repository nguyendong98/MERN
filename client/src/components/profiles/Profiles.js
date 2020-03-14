import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getProfiles} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
const Profile = ({getProfiles, profile: {profiles, loading}}) => {
    useEffect(() => {
        getProfiles()
    }, [getProfiles])
    return <Fragment>
        { loading ? <Spinner></Spinner> : <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className = "lead">
                    <i className="fab fa-connectdevelop" aria-hidden="true"></i>Browse and connect with developers
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile}/>
                        ))
                    ) : <h4>No profile found.....</h4>}
                </div>
            </Fragment>}
    </Fragment>
        
}
const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}
Profile.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {getProfiles})(Profile)
