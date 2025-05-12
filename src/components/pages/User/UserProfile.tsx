import { useEffect } from 'react'

function UserProfile() {
    useEffect(() => {
        document.title = "Profile";
    });
    return (
        <div>Your name is: [useeffect for api call here]</div>
    )
}
export default UserProfile;