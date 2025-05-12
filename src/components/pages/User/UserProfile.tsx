import { useEffect, useState } from "react";
import { deleteUser, getUserInfo } from "../../../api/apiBackendServices";
import { useAuth } from "../../../context/AuthContext";
import { customjwtDecoder } from "../../../api/CustomJwtDecoder";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import Loading from "../../Loading";
import { useNavigate } from "react-router-dom";
function UserProfile() {
  const { token } = useAuth();
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
            setFName(res.data.first_name);
            setLName(res.data.last_name);
            setEmail(res.data.email);

            const date = new Date(res.data.birthdate);
            const fDate = date.toLocaleDateString('en-CA');
            setBirthdate(fDate);
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
    <div className="profile-container">
        <p>{fName} {lName}</p>
        <p>Email: {email}</p>
        <p>Birthdate: {birthdate}</p>
        <button type="button" className="update-button action-button">Update info</button>
        <button type="button" className="update-button action-button" onClick={handleDelete}>Delete account</button>
    </div>
  </Loading>);
}
export default UserProfile;
