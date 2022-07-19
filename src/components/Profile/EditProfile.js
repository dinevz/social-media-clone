import { isAuthenticated } from "../../hoc/isAuthenticated"

function EditProfile() {
    return (
        <div className="profile-container">
        <div className="header">
            <h4 className="title">Edit profile<i className="fa-solid fa-user fa-fw me-3"></i></h4>
        </div>
        </div>
    )
}

export default isAuthenticated(EditProfile);