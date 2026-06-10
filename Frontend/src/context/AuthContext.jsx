import {
createContext,
useContext,
useEffect,
useState,
} from "react";

const AuthContext = createContext();
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {

const [user, setUser] = useState(null);
const navigate = useNavigate();


useEffect(() => {


const storedUser =
  localStorage.getItem("userInfo");

if (storedUser) {
  setUser(JSON.parse(storedUser));
}


}, []);


const login = (userData) => {

localStorage.setItem(
  "userInfo",
  JSON.stringify(userData)
);

setUser(userData);


};


const logout = () => {

  localStorage.removeItem("userInfo");

  setUser(null);

  navigate("/login");

};

return (
<AuthContext.Provider
value={{
user,
setUser,
login,
logout,
}}
>
{children}
</AuthContext.Provider>
);

};

export const useAuth = () =>
useContext(AuthContext);
