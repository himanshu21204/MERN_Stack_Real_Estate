import { useEffect, useState } from 'react';
import './profile.css'
import axios from 'axios';
const FetchBroker = () => {
  const [data,setData] = useState([]);
  useEffect(()=>{
    getData();
  },[])

  const getData = async() => {
    await axios.get('/users')
    .then((result)=>setData(result.data))
    .catch(err=>console.log(err))
  }

  const approved = async (_id) => {
    try {
      await axios.put(`/approved-broker/${_id}`);
      // Refresh data after approval
      getData();
    } catch (error) {
      console.log(error);
    }
  };


  var result = data.map((f) => {
    if((f.isbroker===true || f.isbroker===false)){
      return (
        <>
           <tr>
            <th scope="row">{f.firstName}</th>
            <td>{f.lastName}</td>
            <td>{f.email}</td>
            <td>{f.phoneNumber}</td>
            <td>{f.addresh}</td>
            <td>{f.aboutBroker}</td>
            <td>
            {f.isbroker?"True":<div className='container'><div className='row'>False</div><div className='row'><div className='btn btn-primary mt-3' onClick={() => approved(f._id)}>Approve</div></div></div>}
            </td>
          </tr>
        </>
      )
    } else {
      return null
    }
  });
  return (
    <>
      <div style={{margin:"30px"}}>
      <table className="table table-bordered" >
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Addresh</th>
            <th scope="col">About</th>
            <th scope="col">Broker</th>
          </tr>
        </thead>
        <tbody>
          {result}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default FetchBroker;
