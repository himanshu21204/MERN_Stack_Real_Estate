import { useEffect, useState } from "react";
import "./menubar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import profileImage from "../../assets/img/profilephoto.png";

const MenuBar = () => {
  const [data, setData] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isBroker, setisBroker] = useState(true);
  const [isCreater, setCreater] = useState(false);
  const navigate = useNavigate();

  useEffect(async () => {
    const userId = localStorage.getItem("userId");
    if (userId && userId !== null) {
      getData(userId);
    }
    if (localStorage.getItem("isLogin")) {
      setisLoggedIn(true);
    }
    if (localStorage.getItem("isCreater")) {
      setCreater(true);
    }
  }, []);

  useEffect(() => {
    if (data.isbroker === true) {
      setisBroker(true);
    } else {
      setisBroker(false);
    }
  }, [data]);

  const logout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("isCreater");
    localStorage.clear()
    setisLoggedIn(false);
    navigate("/");
  };

  const getData = async (userId) => {
    try {
      const response = await axios.get("/users/" + userId);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return (
    <>
      <div className="backgroundColor">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <div
                className="fw-bold "
                style={{
                  color: "white",
                  fontFamily: "Azedo",
                  textAlign: "center",
                  fontSize: "27px",
                }}
              >
                <a href='/' style={{textDecoration:"none",color:"white"}}>Real Estate</a>
              </div>
            </div>
            <div className="col">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </div>
            <div className="col">
              <Link to="/buy" className="nav-link">
                Buy
              </Link>
            </div>
            <div className="col">
              <Link to="/rent" className="nav-link">
                Rent
              </Link>
            </div>
            <div className="col">
              <Link to="/sell" className="nav-link">
                Sell
              </Link>
            </div>
            <div className="col">
              <Link to="/agent" className="nav-link">
                Agent
              </Link>
            </div>
            <div className="col">
              <div className="dropdown text-center">
                <Link to="/about-us" className="nav-link">
                  About Us
                </Link>
                <div className="dropdown-content">
                  <Link to="/contact" className="nav-link backgroundColor">
                    Contact
                  </Link>
                  <Link to="/faq" className="nav-link backgroundColor">
                    FAQs
                  </Link>
                  {isLoggedIn ? (
                    // <button className="nav-link rounded-0 backgroundColor" onClick={logout}><div className="nav-link">Logout</div></button>
                    <></>
                  ) : (
                    <div>
                      <a href="/login" className="nav-link backgroundColor">
                        Login
                      </a>
                      <a href="/register" className="nav-link backgroundColor">
                        Register
                      </a>
                    </div>
                  )}
                  {/* {isLoggedIn == true && <Link to="/agent-applied" className="nav-link backgroundColor" style={{fontSize:"15px"}}>Broker Applied</Link>} */}
                </div>
              </div>
            </div>
            <div className="col">
              {isLoggedIn ? (
                <div className="dropdown text-center">
                  {data.profilePhoto !== undefined ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={require(`D:/DU-DIET/Project/Codes/Back End/uploads/${data.profilePhoto}`)}
                        width="40"
                        height="40"
                        className="rounded-circle"
                        style={{ marginRight: "10px" }}
                        alt="Profile Picture"
                      />
                      <Link to="/profile" className="nav-link">
                        My Profile
                      </Link>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={profileImage}
                        width="40"
                        height="40"
                        className="rounded-circle"
                        style={{ marginRight: "10px" }}
                        alt="Profile Picture"
                      />
                      <Link to="/profile" className="nav-link">
                        My Profile
                      </Link>
                    </div>
                  )}
                  <div className="dropdown-content">
                    {/* <Link to="/favorite" className="nav-link backgroundColor">My Favorite</Link> */}
                    {(isBroker == true || isCreater == true) && (
                      <Link
                        to="/add-property"
                        className="nav-link backgroundColor"
                        style={{ fontSize: "17px" }}
                      >
                        Add Property
                      </Link>
                    )}
                    {(isBroker == true || isCreater == true) && (
                      <Link
                        to="/myProperty"
                        className="nav-link backgroundColor"
                        style={{ fontSize: "17px" }}
                      >
                        My Property
                      </Link>
                    )}
                    {isCreater == true && (
                      <Link
                        to="/broker-fetch"
                        className="nav-link backgroundColor"
                        style={{ fontSize: "17px" }}
                      >
                        Broker approve
                      </Link>
                    )}
                    <button
                      className="rounded-0 nav-link backgroundColor"
                      onClick={logout}
                    >
                      <div className="nav-link logincss">Logout</div>
                    </button>
                  </div>
                </div>
              ) : (
                <a href="/login" className="nav-link logincss">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                  Login/Register
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
