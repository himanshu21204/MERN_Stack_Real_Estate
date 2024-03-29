import "./home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Home = () => {
  // Search Bar
  const [placeholderText, setPlaceholderText] = useState(
    "Enter an address, neighborhood, city, or ZIP code"
  );
  const [activeTab, setActiveTab] = useState("Buy");

  function handleTabClick(tabName) {
    switch (tabName) {
      case "Buy":
        setPlaceholderText(
          "Enter an address, neighborhood, city, or ZIP code for Buy"
        );
        break;
      case "Rent":
        setPlaceholderText(
          "Enter an address, neighborhood, city, or ZIP code for Rent"
        );
        break;
      case "Sell":
        setPlaceholderText(
          "Enter an address, neighborhood, city, or ZIP code for Sell"
        );
        break;
      default:
        setPlaceholderText("Enter an address, neighborhood, city, or ZIP code");
    }
    setActiveTab(tabName);
  }

  const addfavorite = () => {
    alert("Favorite add");
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("/propertydatas")
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
  };

  // Sell List
  var resultSell = data
  .filter((f) => f.homePropertyType.toLowerCase() === "sell")
  .map((f) => (
    <div className="col-4" key={f._id}>
      <div className="card mt-3" style={{ width: "382px", height: "450px" }}>
        <img src={f.photos[0]} className="card-img-top card-img" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            <Link className="cardTitle" to={"/property-detail/" + f._id}>
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
                  <span style={{ fontSize: "15.5px" }} className="material-symbols-outlined">
                    bed{" "}
                  </span>{" "}
                  {f.homeBedrooms} bed
                </div>
                <div className="col" style={{ fontSize: "15.5px" }}>
                  <span style={{ fontSize: "15.5px" }} className="material-symbols-outlined">
                    shower{" "}
                  </span>{" "}
                  {f.homeBathrooms} bath
                </div>
                <div className="col" style={{ fontSize: "15.5px" }}>
                  <span style={{ fontSize: "15.5px" }} className="material-symbols-outlined">
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
              <button className="fav" onClick={addfavorite}>
                <span
                  style={{ fontSize: "15.5px", paddingTop: "4px" }}
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
  ));

  //   Rent List
  const resultRent = data
  .filter((f) => f.homePropertyType.toLowerCase() === "rent")
  .map((f) => (
    <div className="col-4" key={f._id}>
      <div className="card mt-3" style={{ width: "382px", height: "450px" }}>
        <img src={f.photos[0]} className="card-img-top card-img" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            <Link className="cardTitle" to={"/property-detail/" + f._id}>
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
                  <span style={{ fontSize: "15.5px" }} className="material-symbols-outlined">
                    bed{" "}
                  </span>{" "}
                  {f.homeBedrooms} bed
                </div>
                <div className="col" style={{ fontSize: "15.5px" }}>
                  <span style={{ fontSize: "15.5px" }} className="material-symbols-outlined">
                    shower{" "}
                  </span>{" "}
                  {f.homeBathrooms} bath
                </div>
                <div className="col" style={{ fontSize: "15.5px" }}>
                  <span style={{ fontSize: "15.5px" }} className="material-symbols-outlined">
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
              <button className="fav" onClick={addfavorite}>
                <span
                  style={{ fontSize: "15.5px", paddingTop: "4px" }}
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
  ));

  //   Buy List
  const resultBuy = data
  .filter((f) => f.homePropertyType.toLowerCase() === "buy")
  .map((f) => (
    <div className="col-4" key={f._id}>
      <div className="card mt-3" style={{ width: "382px", height: "450px" }}>
        <img src={f.photos[0]} className="card-img-top card-img" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            <Link className="cardTitle" to={"/property-detail/" + f._id}>
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
                  <span style={{ fontSize: "15.5px" }} className="material-symbols-outlined">
                    bed{" "}
                  </span>{" "}
                  {f.homeBedrooms} bed
                </div>
                <div className="col" style={{ fontSize: "15.5px" }}>
                  <span style={{ fontSize: "15.5px" }} className="material-symbols-outlined">
                    shower{" "}
                  </span>{" "}
                  {f.homeBathrooms} bath
                </div>
                <div className="col" style={{ fontSize: "15.5px" }}>
                  <span style={{ fontSize: "15.5px" }} className="material-symbols-outlined">
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
              <button className="fav" onClick={addfavorite}>
                <span
                  style={{ fontSize: "15.5px", paddingTop: "4px" }}
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
  ));


  const [dataAgent, setDataAgent] = useState([]);
  useEffect(() => {
    getDataAgent();
  }, []);

  const getDataAgent = async () => {
    await axios
      .get("/users")
      .then((result) => setDataAgent(result.data))
      .catch((err) => console.log(err));
  };

  var result = dataAgent.map((f) => {
    if (f.isbroker === true) {
      const id = f._id;
      return (
        <>
          <div className="col-3">
            <div className="card" style={{ width: "260px" }}>
              <Link to={"/agentdetail/" + id}>
                <img
                  src={
                    f.profilePhoto !== undefined
                      ? require(`D:/DU-DIET/Project/Codes/Back End/uploads/${f.profilePhoto}`)
                      : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAMFBMVEXk5ueutLff4uOnrrHn6eqrsbTZ3N25vsHHy82zuLvr7e7c3+DV2NnQ09W8wcPMz9FRQ01gAAADeUlEQVR4nO2b23LjIAxAuYibMfj//3ZxkqZJmtggWyKzw3no9PGMEAJLRIjBYDAYDAaDwWAwGAwGg4EQACBUjFFd/vsGANScXbiS/Sy6awFYH7SRd4zWLqmuXmCdfDC6eRmZ+2kVJf1q9BOvTlog/N8o/WrJ1MEKbPistKIzv1PaNLoGKzI7LR+y6RnLuYTgt5fuHixGK0hVcbrEis1prlUqseJyEnVrd5Xi2oOuQUoaz5FWsLQ4lXrFUturk/yGo1eqrQa/mEQuZRuVVqjXrz1Qa6iorVozaoU4q1q33i1UxCezQzhR16qIcSpMlFIJs3qlgFKuH2SclFkI12/COZVjmVAKMAVhhbIoWGSkZFBkTi23uxfoMh1XOlcIyyfm4LtJ0d3V/zep+RulCCP1lYmOPPokZUkQ8xcWT9y9c4XymJmwUpQH8hRwTqRXT+z2I6wIAn1N0LTfWLgPh0x6RwePChTdIXORipj9F0idcPuPvkWFKOqaWEkgUp2hlwe2NatIz70bU1PLsywe5YfoHdWU6yaQ1qgfGlr7K0wDmqmho6BntkFItRVPF/3GzqzvHidOJ6GqtiBrnFYqVpDdaf8bsMsUGebNxDIu9pi3b43bjVw6GF2YbNbvtIz0PR9xgPLhOVzGyLD0fu8Cwi7ZaK2NWf+GvNjveBlULOycUppjcfwKo6I0PdI3TtenXDYtPjt3uc6E4HL2yxzV+ryrg9Gk5iJTsnzlMc9Lahnpsk8RJkYxEDF5qZ9k/paF4paXqFgiBlP0Tm76PBaskBO1VomRN2/r5YaYzpawlAKkN6/dKrRM8ESVAkqQ0C3PEi6Ce/H2Y7caLZlPfrdUjrjGTHqHdmdqQaq8k+9QonVWboEN2P7rXy1zToXA9ck+a7nj9QHiOSv3YHX4lQmkY3vuvZY/5uRPy6YnK3ekO4R8hrBvJfGJ1diJagJbss5O8ScM7rOQMk4riFgBtZM0zdmOHxfX09rzx0+LGzCuaQFx0452q7ZeEXLY2GzVkOwTQ0JdCfVSzUMFNPULCJnLqVBZF2BmC1T90BQ7UkdaVYUK0M80cFJ1WUV1X/lA1eRNsSqVD6+a2zH+5Q8St5/qE+rlwREqUh24naTc7zJgfi5wjP39x3JneZHa/b0Px+Xulf2iwHnu/bAnpYLmZ3f2rTqw5zQYDAaDwaAD/wANKir9WY4qAQAAAABJRU5ErkJggg==`
                  }
                  className="card-img-top agentimg"
                  alt="..."
                />
              </Link>
              <div className="card-body">
                <Link to={"/agentdetail/" + id} className="agentname">
                  <h5>
                    {f.firstName} {f.lastName}
                  </h5>
                </Link>
                <h5 style={{ fontWeight: "normal" }}>Broker</h5>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  });
  result = result.filter((f) => f !== undefined);

  return (
    <>
      <div className="container">
        <div className="row" style={{ height: "450px" }}>
          <div className="col">
            <div className="bg-image">
              <img
                className="image"
                src="https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg"
              />
              <div className="mask text- d-flex justify-content-center flex-column text-center">
                <div className="textposition1">THE BEST WAY TO</div>
                <div className="textposition2">Find Your Dream Home</div>
                <div className="textposition3">
                  We’ve more than 745,000 apartments, place & plot.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row bodydata">
          <div className="bodydatatitle">Featured Property</div>
          <div className="bodydatasubtitle">Buy</div>
          {resultBuy.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
              <progress class="pure-material-progress-circular" />
            </div>
          ) : (
            <div className="row" style={{ marginLeft: "70px" }}>{resultBuy.slice(0, 3)}</div>
          )}
          <div
            style={{
              paddingTop: "25px",
              paddingLeft: "590px",
              fontSize: "17px",
            }}
            className="seehover"
          >
            <Link style={{ color: "black", textDecoration: "none" }} to="/buy">
              See All Property
            </Link>
          </div>
          <div className="bodydatasubtitle">Rent</div>
          {resultRent.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
              <progress class="pure-material-progress-circular" />
            </div>
          ) : (
            <div className="row" style={{ marginLeft: "70px" }}>{resultRent.slice(0, 3)}</div>
          )}
          <div
            style={{
              paddingTop: "25px",
              paddingLeft: "590px",
              fontSize: "17px",
            }}
            className="seehover"
          >
            <Link style={{ color: "black", textDecoration: "none" }} to="/rent">
              See All Property
            </Link>
          </div>
          <div className="bodydatasubtitle">Sell</div>
          {resultSell.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
              <progress class="pure-material-progress-circular" />
            </div>
          ) : (
            <div className="row" style={{ marginLeft: "70px" }}>{resultSell.slice(0, 3)}</div>
          )}
          <div
            style={{
              paddingTop: "25px",
              paddingLeft: "590px",
              fontSize: "17px",
            }}
            className="seehover"
          >
            <Link style={{ color: "black", textDecoration: "none" }} to="/sell">
              See All Property
            </Link>
          </div>
          <div className="bodydatasubtitle" style={{ marginBottom: "20px" }}>
            Agent
          </div>
          <div className="row" style={{ marginLeft: "70px" }}>
            {result.slice(0, 4)}
          </div>
          <div
            style={{
              paddingTop: "25px",
              paddingLeft: "590px",
              fontSize: "17px",
            }}
            className="seehover"
          >
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to="/agent"
            >
              See All Agents
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
