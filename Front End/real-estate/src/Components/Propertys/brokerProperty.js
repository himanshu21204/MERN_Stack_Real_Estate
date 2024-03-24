import axios from "axios";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

const MyProperty = () => {
    const [userID,setUserID] = useState("");
    const [propertyData, setPropertyData] = useState([]);
    useEffect(() => {
      getPropertyData();
    }, []);
    const getPropertyData = async () => {
      await axios
        .get("/propertydatas")
        .then((result) => setPropertyData(result.data))
        .catch((err) => console.log(err));
        setUserID(localStorage.getItem('userId'));
    };
  
    var resultList = propertyData.map((f) => {
      if (userID === f.brokerID) {
        return (
          <>
              <div className="col-md-4">
                <div className="col">
                  <div
                    className="card mt-4"
                    style={{ width: "382px", height: "440px" }}
                  >
                    <img
                    src={f.photos[0]}
                      className="card-img-top card-img"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link
                          className="cardTitle"
                          to={"/property-detail/" + f._id}
                        >
                          {f.homeTitle}
                        </Link>
                      </h5>
                      <p className="card-text ">{f.homeAddress}</p>
                      <div>${f.homePrice}</div>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div className="">
                          <div className="d-flex">
                            <div className="col" style={{ fontSize: "15.5px" }}>
                              <span
                                style={{ fontSize: "15.5px" }}
                                className="material-symbols-outlined"
                              >
                                bed{" "}
                              </span>{" "}
                              {f.homeBedrooms} bed
                            </div>
                            <div className="col" style={{ fontSize: "15.5px" }}>
                              <span
                                style={{ fontSize: "15.5px" }}
                                className="material-symbols-outlined"
                              >
                                shower{" "}
                              </span>{" "}
                              {f.homeBathrooms} bath
                            </div>
                            <div className="col" style={{ fontSize: "15.5px" }}>
                              <span
                                style={{ fontSize: "15.5px" }}
                                className="material-symbols-outlined"
                              >
                                aspect_ratio{" "}
                              </span>{" "}
                              {f.homeSizeinft} sqft
                            </div>
                          </div>
                        </div>
                      </li>
                      <li
                        className="list-group-item"
                        style={{
                          paddingBottom: "10px",
                          fontWeight: 100,
                          fontSize: "14px",
                        }}
                      >
                        <div className="d-flex">
                          <div className="col">For {f.homePropertyType}</div>
                          <button className="fav">
                            <span
                              style={{
                                fontSize: "15.5px",
                                paddingTop: "4px",
                              }}
                              className="material-symbols-outlined "
                            >
                              favorite{" "}
                            </span>
                          </button>{" "}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
          </>
        );
      }
    });
    resultList = resultList.filter((f)=> f !== undefined)
    return (
        <>
            <div className="container" style={{marginLeft:"80px",marginTop:"20px"}}>
                {resultList.length !==0 ? <div className="row">
                    {resultList}
                </div>:<div className="row" style={{margin:"auto"}}>List Not Found/No Property Add</div>}
            </div>
        </>
    )
}

export default MyProperty