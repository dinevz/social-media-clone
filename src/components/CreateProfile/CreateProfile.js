import './CreateProfile.css'

export default function CreateProfile() {
    return (
        <div className="create-profile-container">
            <div className="header">
                <h4 className="title">Create profile<i className="fa-solid fa-user fa-fw me-3"></i></h4>
                <h5 className="note">Note: You won't be able to continue if you don't!</h5>
            </div>

            <div className="input-container">
                <form method="POST" >
                    <div className="container">
                        <label htmlFor="username"><b>Username</b></label>
                        <input id="username" type="text" placeholder="Enter username" name="username" required />

                        <label htmlFor="firstName"><b>First name</b></label>
                        <input id="firstName" type="text" placeholder="eg John" name="firstName" required />
                        <label htmlFor="lastName"><b>Last name</b></label>
                        <input id="lastName" type="text" placeholder="eg Doe" name="lastName" required />
                        <label htmlFor="imageUrl"><b>Image url</b></label>
                        <input id="imageUrl" type="url" placeholder="http://" name="imageUrl" required />
                        <label htmlFor="about"><b>About</b></label>
                        <input id="about" type="text" placeholder="keep it short" name="about" required />
                        
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}