import { useNavigate } from "react-router-dom"

export default function ErrorPage () {
    const navigate = useNavigate();
    return (
        <div className="home-container">
            <div className="header">
                <h4 className="title">No such page ! Go back <div className="details-link-back edit" onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i></div></h4>
            </div>
        </div>
    )
}