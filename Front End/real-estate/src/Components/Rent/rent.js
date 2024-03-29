import { Link } from "react-router-dom";
import "./rent.css";
import '../../progressBar.css'
import { useState, useEffect } from "react";
import axios from "axios";
const Rent = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [copydata,setCopyData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedYear,setSelectedYear] = useState("")
  function gridTolist() {
    setIsGrid(!isGrid);
    setSortBy("");
  }
  const addfavorite = () => {
    alert("Favorite add");
  };
  const handleChange = (e) => {
    setSortBy(e.target.value);
  };
  const [buyData, setBuyData] = useState([]);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  const getData = async () => {
    try {
      const result = await axios.get("/propertydatas");
      let sortedData = [...result.data];
      if (sortBy === "low") {
        sortedData.sort(
          (a, b) => parseFloat(a.homePrice) - parseFloat(b.homePrice)
        );
      } else if (sortBy === "high") {
        sortedData.sort(
          (a, b) => parseFloat(b.homePrice) - parseFloat(a.homePrice)
        );
      } else if (sortBy === "alphabetical") {
        sortedData.sort((a, b) => a.homeTitle.localeCompare(b.title));
      } else if (sortBy === "city") {
      sortedData.sort((a, b) => a.city.localeCompare(b.city));
    }
      setBuyData(sortedData);
      setCopyData(sortedData)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //Name
  const searchByName = (query) => {
  const filteredData = query ? buyData.filter((property) => {
    return property.homeTitle.toLowerCase().includes(query.toLowerCase());
  }) : copydata; 
  setBuyData(filteredData);
};
  const handleNameSearch = (e) => {
    const query = e.target.value;
    searchByName(query);
  };

// City
const searchByCity = () => {
  const filteredData = selectedCity ? copydata.filter((property) => {
    return property.homeCity.toLowerCase() === selectedCity.toLowerCase();
  }) : copydata;
  setBuyData(filteredData);
};
const handleCityChange = (e) => {
  setSelectedCity(e.target.value);
};
useEffect(() => {
  searchByCity();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedCity]);

//Year
const searchByYear = () => {
  const filteredData = selectedYear ? copydata.filter((property) => {
    return property.homeYearbuilt.toLowerCase() === selectedYear.toLowerCase();
  }) : copydata;
  setBuyData(filteredData);
};
const handleYearChange = (e) => {
  setSelectedYear(e.target.value);
};
useEffect(() => {
  searchByYear();
}, [selectedYear]);

  const result = buyData.map((f) => {
    if (f.homePropertyType.toLowerCase() === "rent") {
      return (
        <>
          <div className="col-6">
            <div className="card mt-3" style={{ width: "382px", height: "450px" }}>
              <img
              src={f.photos[0]}
                className="card-img-top card-img"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">
                  <Link className="cardTitle" to={"/property-detail/" + f._id}>
                    {f.homeTitle}
                  </Link>
                </h5>
                <p className="card-text ">{f.homeAddress}</p>
                <div>${f.homePrice}/mo</div>
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
        </>
      );
    }
  });

  const resultList = buyData.map((f) => {
    if (f.homePropertyType.toLowerCase() === "rent") {
      return (
        <>
          <div className="col-12">
            <div className="card mb-3" style={{ Width: "580px" }} />
            <div className="row g-0">
              <div className="col-4">
                <img
                src={f.photos[0]}
                  className="imagelist img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-7 ">
                <div
                  className="card-body listdata"
                  style={{
                    borderEndEndRadius: "10px",
                    borderTopRightRadius: "10px",
                    borderBottomLeftRadius: "0px",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link
                        className="cardTitle"
                        to={"/property-detail/" + f._id}
                      >
                        {f.homeTitle}
                      </Link>
                    </h5>
                    <p className="card-text" style={{ paddingTop: "9px" }}>
                      {f.homeAddress}
                    </p>
                  </div>
                  <div className="card-title">${f.homePrice}</div>
                  <ul className="list-group list-group-flush listcard">
                    <li className="list-group-item">
                      <div className="">
                        <div
                          className="d-flex"
                          style={{
                            paddingTop: "20px",
                            paddingBottom: "6px",
                          }}
                        >
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
                        paddingTop: "10px",
                        fontWeight: 100,
                        fontSize: "14px",
                      }}
                    >
                      <div className="d-flex">
                        <div className="col">For {f.homePropertyType}</div>
                        <button className="fav" onClick={addfavorite}>
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
                  </ul>{" "}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  });

  return (
    <>
      <div className="container back">
        <div className="row">
          <div className="m-3 title">Homes for Rent</div>
        </div>
        <div className="row body searchbar">
          {/* Search Bar */}
          <div className="col-4">
            <div className="row">
              <div className="card" style={{ width: "380px" }}>
                <div className="searchtitle">Find your home</div>
                <div className="searchArea">
                  <input
                    type="text"
                    className="form-control searchinput"
                    placeholder="What are you looking for?"
                    onChange={handleNameSearch}
                  ></input>
                </div>
                <div>
                  <div className="searchtitle">Location</div>
                </div>
                <div>
                  {/* <!-- delhi--> */}
                  <select value={selectedCity} onChange={handleCityChange} id="city" name="city" className="form-select">
                    <option value="">Select City</option>
                    <option value="AHMADABAD">Ahmadabad</option>
                    <option value="AMRELI">Amreli</option>
                    <option value="ANAND">Anand</option>
                    <option value="ARAVALLI">Aravalli</option>
                    <option value="BANASKANTHA">Banaskantha</option>
                    <option value="BHARUCH">Bharuch</option>
                    <option value="BHAVNAGAR">Bhavnagar</option>
                    <option value="BOTAD">Botad</option>
                    <option value="CHHOTA UDEPUR">Chhota Udepur</option>
                    <option value="DAHOD">Dahod</option>
                    <option value="DANGS">Dangs</option>
                    <option value="DEVBHUMI DWARKA">Devbhumi Dwarka</option>
                    <option value="GANDHINAGAR">Gandhinagar</option>
                    <option value="GIR SOMNATH">Gir Somnath</option>
                    <option value="JAMNAGAR">Jamnagar</option>
                    <option value="JUNAGADH">Junagadh</option>
                    <option value="KACHCHH">Kachchh</option>
                    <option value="KHEDA">Kheda</option>
                    <option value="MAHESANA">Mahesana</option>
                    <option value="MAHISAGAR">Mahisagar</option>
                    <option value="MORBI">Morbi</option>
                    <option value="NARMADA">Narmada</option>
                    <option value="NAVSARI">Navsari</option>
                    <option value="PANCHMAHALS">Panchmahals</option>
                    <option value="PATAN">Patan</option>
                    <option value="PORBANDAR">Porbandar</option>
                    <option value="RAJKOT">Rajkot</option>
                    <option value="SABARKANTHA">Sabarkantha</option>
                    <option value="SURAT">Surat</option>
                    <option value="SURENDRANAGAR">Surendranagar</option>
                    <option value="TAPI">Tapi</option>
                    <option value="VADODARA">Vadodara</option>
                    <option value="VALSAD">Valsad</option>
                  </select>
                </div>
                <div>
                <div className="searchtitle">Year Built</div>
                  <div className="row pb-3">
                  <input
                    type="text"
                    className="form-control searchinput"
                    placeholder="Search By Year"
                    onChange={handleYearChange}
                  ></input>
                  </div>
                </div>
                {/* <div className="card-body">
                  <div className="searchButton btn btn-danger">Search</div>
                </div> */}
              </div>
            </div>
          </div>
          {isGrid ? (
            <div className="col">
              <div className="row">
                <div className="col-7">
                  Showing {result.filter((item) => item !== undefined).length}{" "}
                  results
                </div>
                <div className="col-1 fw-lighter text-body-tertiary">
                  Sort By
                </div>
                <div className="col-2">
                  <select
                    id="sort"
                    name="sort"
                    value={sortBy}
                    onChange={handleChange}
                    style={{ border: "none", backgroundColor: "transparent" }}
                  >
                    <option value="">Sort by</option>
                    <option value="low">Low Price</option>
                    <option value="high">High Price</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                </div>
                {isGrid ? (
                  <button className="col fav" onClick={gridTolist}>
                    List
                  </button>
                ) : (
                  <button className="col fav" onClick={gridTolist}>
                    Grid
                  </button>
                )}
              </div>
              <div>
                {result.length === 0 ? (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                    <progress class="pure-material-progress-circular" />
                  </div>
                ) : (
                  <div className="row">{result}</div>
                )}
              </div>
            </div>
          ) : (
            <div className="col">
              <div className="row">
                <div className="col-7">
                  Showing{" "}
                  {resultList.filter((item) => item !== undefined).length}{" "}
                  results
                </div>
                <div className="col-1 fw-lighter text-body-tertiary">
                  Sort By
                </div>
                <div className="col-2">
                  <select
                    id="sort"
                    name="sort"
                    value={sortBy}
                    onChange={handleChange}
                    style={{ border: "none", backgroundColor: "transparent" }}
                  >
                    <option value="">Sort by</option>
                    <option value="low">Low Price</option>
                    <option value="high">High Price</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                </div>
                {isGrid ? (
                  <button className="col fav" onClick={gridTolist}>
                    List
                  </button>
                ) : (
                  <button className="col fav" onClick={gridTolist}>
                    Grid
                  </button>
                )}
              </div>
              <div>
                {result.length === 0 ? (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                    <progress class="pure-material-progress-circular" />
                  </div>
                ) : (
                  <div className="row">{resultList}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Rent;
