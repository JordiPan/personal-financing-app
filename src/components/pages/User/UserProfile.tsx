import { useEffect, useState } from "react";
import { getUserInfo } from "../../../api/apiBackendServices";
import { useAuth } from "../../../context/AuthContext";
import { customjwtDecoder } from "../../../api/CustomJwtDecoder";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import Loading from "../../Loading";
function UserProfile() {
  const { token } = useAuth();
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    document.title = "Profile";
    const fetchInfo = async () => {
      //probably always true ngl
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

  return (
  <Loading isLoading={isLoading}>
    <div>
        {email} {birthdate}
    </div>
  </Loading>);
}
export default UserProfile;
