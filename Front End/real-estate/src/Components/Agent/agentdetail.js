import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./agentdetail.css";
import axios from "axios";
const AgentDetail = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  useEffect(() => {
    getData();
    getPropertyData();
  }, []);
  const getPropertyData = async () => {
    await axios
      .get("/propertydatas")
      .then((result) => setPropertyData(result.data))
      .catch((err) => console.log(err));
  };
  const getData = async () => {
    await axios
      .get("/agentdetail/" + params._id)
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
  };

  var resultList = propertyData.map((f) => {
    if (params._id === f.brokerID) {
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
  resultList = resultList.filter((item) => item !== undefined);
  return (
    <>
      <div
        className="container"
        style={{ marginTop: "50px", marginLeft: "90px" }}
      >
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="cardagentD">
              <div className="card-bodyagent">
                <div className="d-flex flex-column align-items-center text-center mt-1">
                  <img
                    src={
                      data.profilePhoto !== undefined
                        ? require(`D:/DU-DIET/Project/Codes/Back End/uploads/${data.profilePhoto}`)
                        :`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAMFBMVEXk5ueutLff4uOnrrHn6eqrsbTZ3N25vsHHy82zuLvr7e7c3+DV2NnQ09W8wcPMz9FRQ01gAAADeUlEQVR4nO2b23LjIAxAuYibMfj//3ZxkqZJmtggWyKzw3no9PGMEAJLRIjBYDAYDAaDwWAwGAwGg4EQACBUjFFd/vsGANScXbiS/Sy6awFYH7SRd4zWLqmuXmCdfDC6eRmZ+2kVJf1q9BOvTlog/N8o/WrJ1MEKbPistKIzv1PaNLoGKzI7LR+y6RnLuYTgt5fuHixGK0hVcbrEis1prlUqseJyEnVrd5Xi2oOuQUoaz5FWsLQ4lXrFUturk/yGo1eqrQa/mEQuZRuVVqjXrz1Qa6iorVozaoU4q1q33i1UxCezQzhR16qIcSpMlFIJs3qlgFKuH2SclFkI12/COZVjmVAKMAVhhbIoWGSkZFBkTi23uxfoMh1XOlcIyyfm4LtJ0d3V/zep+RulCCP1lYmOPPokZUkQ8xcWT9y9c4XymJmwUpQH8hRwTqRXT+z2I6wIAn1N0LTfWLgPh0x6RwePChTdIXORipj9F0idcPuPvkWFKOqaWEkgUp2hlwe2NatIz70bU1PLsywe5YfoHdWU6yaQ1qgfGlr7K0wDmqmho6BntkFItRVPF/3GzqzvHidOJ6GqtiBrnFYqVpDdaf8bsMsUGebNxDIu9pi3b43bjVw6GF2YbNbvtIz0PR9xgPLhOVzGyLD0fu8Cwi7ZaK2NWf+GvNjveBlULOycUppjcfwKo6I0PdI3TtenXDYtPjt3uc6E4HL2yxzV+ryrg9Gk5iJTsnzlMc9Lahnpsk8RJkYxEDF5qZ9k/paF4paXqFgiBlP0Tm76PBaskBO1VomRN2/r5YaYzpawlAKkN6/dKrRM8ESVAkqQ0C3PEi6Ce/H2Y7caLZlPfrdUjrjGTHqHdmdqQaq8k+9QonVWboEN2P7rXy1zToXA9ck+a7nj9QHiOSv3YHX4lQmkY3vuvZY/5uRPy6YnK3ekO4R8hrBvJfGJ1diJagJbss5O8ScM7rOQMk4riFgBtZM0zdmOHxfX09rzx0+LGzCuaQFx0452q7ZeEXLY2GzVkOwTQ0JdCfVSzUMFNPULCJnLqVBZF2BmC1T90BQ7UkdaVYUK0M80cFJ1WUV1X/lA1eRNsSqVD6+a2zH+5Q8St5/qE+rlwREqUh24naTc7zJgfi5wjP39x3JneZHa/b0Px+Xulf2iwHnu/bAnpYLmZ3f2rTqw5zQYDAaDwaAD/wANKir9WY4qAQAAAABJRU5ErkJggg==`
  
                    }
                    alt="Admin"
                    className=""
                    style={{borderRadius:"50%",objectFit:"cover",height:"180px",width:"180px"}}
                    width="200"
                  />
                  <div className="mt-2">
                    <h4 style={{ marginTop: "10px" }}>{data.name}</h4>
                    <p
                      className="text-muted font-size-sm mt-3"
                      style={{ marginBottom: "10px" }}
                    >
                      {data.addresh}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="cardagentD mb-3">
              <div className="card-bodyagent">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {data.firstName} {data.lastName}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <div>{data.email}</div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{data.phoneNumber}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Address</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{data.addresh}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">About</h6>
                  </div>
                  <div
                    className="col-sm-9 text-secondary"
                    style={{ overflow: "auto", MaxHeight: "100px" }}
                  >
                    {data.aboutBroker}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row gutters-sm">
            <div className="col-md-12">
              <div className="" style={{ marginLeft: "7px" }}>
                <h5
                  className="row"
                  style={{
                    marginTop: "30px",
                    marginLeft: "50px",
                    fontFamily: "Roboto",
                    fontWeight: "bolder",
                  }}
                >
                  Listing
                </h5>
              </div>
            </div>
            {resultList.length > 0 ? (
              <div className="row">{resultList}</div>
            ) : (
              <h5 style={{ textAlign: "center" }}>Not Data</h5>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentDetail;
