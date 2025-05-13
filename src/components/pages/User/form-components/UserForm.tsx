import { useState } from "react";
import { User } from "../../../../api/interfaces/user/User";
import { updateUser } from "../../../../api/apiBackendServices";
import { useAuth } from "../../../../context/AuthContext";
import { customjwtDecoder } from "../../../../api/CustomJwtDecoder";
import { useAxiosPrivate } from "../../../../hooks/useAxiosPrivate";
import { toFormData } from "axios";

interface Props {
  user: User;
  setUser: (user: User) => void;
  onClose: () => void;
}
//Changing password action is separate and will be done later
//TODO: if user doesn't change anything --> update button will not work
export const UserForm = ({ user, setUser, onClose }: Props) => {
  const { token } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [formData, setFormData] = useState<User>({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    birthdate: user.birthdate,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token) {
      const decoded = customjwtDecoder(token);
      await updateUser(decoded.sub, formData, axiosPrivate)
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((res) => {
          console.log(res);
        })
        .finally(() => {
          onClose();
        });
    }
  };
  return (
    <div className="update-form">
      <form className="user-form" onSubmit={handleSubmit}>
        <h1>Update</h1>
        <label htmlFor="fName-input" className="form-label">
          First Name
        </label>
        <input
          name="first_name"
          type="string"
          id="fName-input"
          className="input"
          required
          value={formData.first_name}
          onChange={handleChange}
        />
        <label htmlFor="lName-input" className="form-label">
          Last name
        </label>
        <input
          name="last_name"
          type="string"
          id="lName-input"
          className="input"
          required
          value={formData.last_name}
          onChange={handleChange}
        />
        <label htmlFor="email-input" className="form-label">
          Email
        </label>
        <input
          name="email"
          type="email"
          id="email-input"
          className="input"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="date-input" className="form-label">
          Birthdate
        </label>
        <input
          name="birthdate"
          type="date"
          id="date-input"
          className="input"
          required
          value={formData.birthdate}
          onChange={handleChange}
        />

        <input type="submit" className="submit-button" value="Update" />
      </form>
      <button className="back-button" onClick={onClose}>
        Back
      </button>
    </div>
  );
  // back button should change usestate () from parent
};
