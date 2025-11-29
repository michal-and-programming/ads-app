import {useEffect} from "react";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {API_URL} from '../../../config';
import { logout } from "../../../redux/userReducer";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        fetch(`${API_URL}/auth/logout`, {
          method: 'DELETE',
          credentials: 'include'
        });
        dispatch(logout());
        navigate('/')
      }
      catch(err){
        console.log(err);
      }
    };
    doLogout();
  }, [dispatch, navigate]);
}
export default Logout;