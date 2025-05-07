import { useEffect } from 'react'

function UserItems() {
    useEffect(() => {
        document.title = "Items";
      });
  return (
    <div>UserItems</div>
  )
}
export default UserItems;