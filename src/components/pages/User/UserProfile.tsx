import { useEffect, useState } from "react";
import { deleteUser, getUserInfo } from "../../../api/apiBackendServices";
import { useAuth } from "../../../context/AuthContext";
import { customjwtDecoder } from "../../../api/CustomJwtDecoder";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import Loading from "../../Loading";
import { useNavigate } from "react-router-dom";
import { UserForm } from "./form-components/UserForm";
import { User } from "../../../api/interfaces/user/User";
function UserProfile() {
  const { token } = useAuth();
  const [user, setUser] = useState<User>({
    first_name: '',
    last_name: '',
    email: '',
    birthdate: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Profile";
    const fetchInfo = async () => {
      //token probably always true ngl
      //res.data should actually always have a message but then I would have to change the interfaces again... standardize later
      if (token) {
        const decoded = customjwtDecoder(token);
        await getUserInfo(decoded.sub, axiosPrivate)
          .then((res) => {
            console.log(res.data);
            let user = res.data;
            user.birthdate = new Date(res.data.birthdate).toLocaleDateString('en-CA');
            setUser(res.data);
            // const date = new Date(res.data.birthdate);
            // const fDate = date.toLocaleDateString('en-CA');
            // setBirthdate(fDate);
          })
          .catch((res) => {
            console.log(res);
          })
          .finally(() => {
            setIsLoading(false);
          })
      }
    };
    fetchInfo();
  }, []);


  //should test if it cascades correctly someday
  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete all your data?');
    if (token && confirmed) {
        //duplicate code cause of usestate being async causing TS error
        const decoded = customjwtDecoder(token);
        await deleteUser(decoded.sub, axiosPrivate)
        .then((res) => {
            console.log(res);
            navigate('/', {replace: true});
        })
        .catch((res) => {
            console.log(res)
        })
    }
  }
  return (
  <Loading isLoading={isLoading}>
    <div className="profile-container container-color-dark">
      {
        !showForm ? 
        (<>
        <p>{user.first_name} {user.last_name}</p>
        <p>Email: {user.email}</p>
        <p>Birthdate: {user.birthdate}</p>
        <button type="button" className="form-button" onClick={() => {setShowForm(true)}}>Update info</button>
        <button type="button" className="form-button" onClick={handleDelete}>Delete account</button>
        </>) : 

        (<>
        <UserForm user={user} setUser={setUser} onClose={() => {setShowForm(false)}}/>
        </>)
      }
    </div>
  </Loading>);
}
export default UserProfile;
