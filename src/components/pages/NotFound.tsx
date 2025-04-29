import { useEffect } from "react";
function NotFound() {
    useEffect(() => {
        document.title = "Not found"
    })
    return(<div>
        <p>No page found...</p>
    </div>)
}

export default NotFound;