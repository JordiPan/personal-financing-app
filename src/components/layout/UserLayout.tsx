import { Outlet } from "react-router-dom";

export const UserLayout = () => {
  return (
    <div className="user-container">
      <Outlet />
    </div>
  );
};
