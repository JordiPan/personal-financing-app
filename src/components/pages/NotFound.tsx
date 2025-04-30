import { useEffect } from "react";
import '../../css/notFound.css';
function NotFound() {
    useEffect(() => {
        document.title = "Not found"
    })
    return(<div className="error-container">
        <h1 className="error-text">No page found...</h1>
    </div>)
}

export default NotFound;