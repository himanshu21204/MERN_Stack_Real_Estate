import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Components/Home/home";

const Protected = ({ Component }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    var isCreater ;
    useEffect(() => {
        const login = localStorage.getItem("isLogin");
        isCreater = localStorage.getItem("isCreater")
        if (!login) {
            navigate('/');
            return; 
        }

        const userId = localStorage.getItem("userId");
        if (userId) {
            fetchData(userId);
        }
    }, []); 

    const fetchData = async (userId) => {
        try {
            const response = await axios.get("/users/" + userId);
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    if (userData && userData.isbroker === true) {
        return <Component />;
    } 
    if(userData && isCreater){
        return <Component/>
    }
        navigate('/');
        return ;
};

export default Protected;
