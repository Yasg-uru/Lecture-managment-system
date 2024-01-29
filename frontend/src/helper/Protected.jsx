import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ Component, allowedrole }) {
  const role = useSelector((state) => state.auth.role);
  const isauthenticated = useSelector((state) => state.auth.isLoggedIn);
  console.log("this is a role and isauthenticated :",role,isauthenticated)
  const navigate = useNavigate();
  useEffect(()=>{
    
    if (!allowedrole.includes(role)) {
        navigate('/login');
        return;
      } else if (!isauthenticated) {
        navigate('/login');
        return;
      }
  },[role,isauthenticated])
  return (
    <>
      <Component />
    </>
  );
}
export default Protected;
