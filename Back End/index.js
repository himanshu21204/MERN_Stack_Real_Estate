const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./ModelsSchema/userSchema");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')
const propertyModel = require("./ModelsSchema/propertySchema");
const contactUSModel = require("./ModelsSchema/contactUSSchema");

const app = express();
//Database Connect
mongoose
  .connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database Connecte"))
  .catch((err) => console.log("Database Not Connect", err));

//Middleware
app.use(express.json({limit:'20mb'}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
// app.use(cors())

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    preflightContinue: true,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.json("Test is Working");
});
app.get("/users", async (req, res) => {
  data = await User.find();
  res.json(data);
});

app.put("/users/update/:_id", async (req, res) => {
  data = await User.find();
  res.json(data);
});

app.delete("/users/delete/:_id", async (req, res) => {
  const id = req.params._id;
  const userdelete = await User.findOne({ _id: id });
  await userdelete.deleteOne();
  res.send(userdelete);
});

app.get("/users/:_id", async (req, res) => {
  const userId = req.params._id;
  try {
    const userData = await User.findById(userId);
    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/propertydatas", async (req, res) => {
  data = await propertyModel.find();
  res.json(data);
});

app.get("/agentdetail/:_id", async (req, res) => {
  const userId = req.params._id;
  try {
    const userData = await User.findById(userId);
    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/property-detail/:_id", async (req, res) => {
  const userId = req.params._id;
  try {
    const userData = await propertyModel.findById(userId);
    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/add-property/:_id", async (req, res) => {
  const userId = req.params._id;
  try {
    const userData = await propertyModel.findById(userId);
    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Register
app.post("/register", upload.single("profilePhoto"), async (req, res) => {
  try {
    const { name, email, phoneNumber, password, repassword } = req.body;
    var profilePhoto;
    //Check if Name is Entered
    if (!name) {
      return res.json({
        error: "Name is Required",
      });
    }
    //Check if Email is Entered
    if (!email) {
      return res.json({
        error: "Email is Required",
      });
    }
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!emailRegex.test(email)) {
      return res.json({
        error: "Error! you have entered invalid email.",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "email is Already Taken",
      });
    }
    //Check if Phone Number is Entered
    if (!phoneNumber) {
      return res.json({
        error: "Phone-Number is Required",
      });
    } else if (phoneNumber.length > 10 || phoneNumber.length < 10) {
      return res.json({
        error: "Invalid Phone Number Enter",
      });
    }
    //Check Password is good
    if (!password) {
      return res.json({
        error: "Password is Required",
      });
    } else if (password.length < 6) {
      return res.json({
        error: "Password Should be at least 6 character long",
      });
    }
    if (password != repassword) {
      return res.json({
        error: "password is Not Match",
      });
    }
    try {
      profilePhoto = req.file.filename;
    } catch (error) {
      return res.json({
        error: "Profile Photo is Required",
      });
    }
    const hashedPassword = bcryptjs.hashSync(password,10);
    const user = await User.create({
      name,
      email,
      phoneNumber,
      password:hashedPassword,
      repassword:hashedPassword,
      profilePhoto,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
});

// Applied Broker
app.post("/broker-applied",upload.single("profilePhoto"), async (req, res) => {
  try {
    const {
      name,
      email,
      firstName,
      lastName,
      phoneNumber,
      password,
      repassword,
      addresh,
      aboutBroker,
      isbroker,
    } = req.body;
    var profilePhoto;
    //Check if Name is Entered
    if (!name) {
      return res.json({
        error: "Name is Required",
      });
    }
    //Check if Email is Entered
    if (!email) {
      return res.json({
        error: "Email is Required",
      });
    }
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!emailRegex.test(email)) {
      return res.json({
        error: "Error! you have entered invalid Email.",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is Already Taken",
      });
    }
    //Check if Phone Number is Entered
    if (!phoneNumber) {
      return res.json({
        error: "Phone Number is Required",
      });
    } else if (phoneNumber.length > 10 || phoneNumber.length < 10) {
      return res.json({
        error: "InValid Phone Number Enter",
      });
    }
    // Check First Name is Entered??
    if (!firstName) {
      return res.json({
        error: "First name is Required",
      });
    }
    // Check Last Name is Entered??
    if (!lastName) {
      return res.json({
        error: "Last name is Required",
      });
    }
    
    //Check Password is good
    if (!password ) {
      return res.json({
        error: "Password is Required",
      });
    } else if (password.length < 6) {
      return res.json({
        error: "Password Should be at least 6 character long",
      });
    }
    if (password != repassword) {
      return res.json({
        error: "password is Not Match",
      });
    }
    try {
      profilePhoto = req.file.filename;
    } catch (error) {
      return res.json({
        error: "Profile Photo is Required",
      });
    }
    // Addresh
    if (!addresh) {
      return res.json({
        error: "Addresh is Required",
      });
    }
    // Check First Name is Entered??
    if (!aboutBroker) {
      return res.json({
        error: "Enter About Your Self!!",
      });
    }
    const hashedPassword = bcryptjs.hashSync(password,10);
    const user = await User.create({
      name,
      email,
      firstName,
      lastName,
      phoneNumber,
      password:hashedPassword,
      repassword:hashedPassword,
      addresh,
      aboutBroker,
      profilePhoto,
      isbroker,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user Exist
    if (!email) {
      return res.json({
        error: "Enter Email",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found! Enter Correct email Or password",
      });
    }

    // Check if Password match using bcrypt
    if (!password) {
      return res.json({
        error: "Enter Password",
      });
    }
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if(!passwordMatch){
      return res.json({
        error: "Password does not match",
      });
    }
    jwt.sign({email:user.email,id:user._id, name:user.name},process.env.JWT_SECRET,{},(err , token)=>{
      if(err) throw err;
      res.cookie('token',token).json({
        message: "Login successful",
        user: user,
      });
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Property Add
app.post("/add-property", async (req, res) => {
  try {
    var {
      homeTitle,
      homeDescription,
      homePrice,
      homeAddress,
      homeCountry_State,
      homeCity,
      homeCountry,
      homeZip,
      homeSizeinft,
      homeRooms,
      homeBedrooms,
      homeBathrooms,
      homeGarages,
      homeGaragesize,
      homeYearbuilt,
      homeBasement,
      homePropertyType,
      homePropertyID,
      homePropertyStatus,
      photos,
      brokerID,
    } = req.body;
    // Check if user Exist
    if (!homeTitle) {
      return res.json({
        error: "Enter Home Title",
      });
    }
    if (!homeDescription) {
      return res.json({
        error: "Enter Home description",
      });
    }
    if (!homePrice) {
      return res.json({
        error: "Enter Home Price",
      });
    }
    if (homePrice <= 1000 || homePrice >= 100000000) {
      return res.json({
        error:
          "Home Price is out of range. Please provide a home price within the range of 5000 to 99,999,999.",
      });
    }
    if (!!/\D/.test(homePrice)) {
      homePrice = homePrice.replace(/\D/g, "");
    }
    if (!homeAddress) {
      return res.json({
        error: "Enter Home Addresh",
      });
    }
    if (!homeCountry_State) {
      return res.json({
        error: "Please enter Home State.",
      });
    }
    if (!homeCity) {
      return res.json({
        error: "Please enter Home City.",
      });
    }
    if (!homeCountry) {
      return res.json({
        error: "Please enter Home Country.",
      });
    }

    if (!homeZip) {
      return res.json({
        error: "Please enter Home Zip Code.",
      });
    }
    if (!homeSizeinft) {
      return res.json({
        error: "Enter Home Size in ft",
      });
    }
    if (!homeRooms) {
      return res.json({
        error: "Please enter the number of Rooms in the home.",
      });
    }

    if (!homeBedrooms) {
      return res.json({
        error: "Please enter the number of bedrooms in the home.",
      });
    }

    if (!homeBathrooms) {
      return res.json({
        error: "Please enter the number of bathrooms in the home.",
      });
    }
    if (!homeBasement) {
      return res.json({
        error: "Please specify if the home has a basement.",
      });
    }
    if (!homeGarages) {
      return res.json({
        error: "Please enter the number of garages in the home.",
      });
    }

    if (!homeGaragesize) {
      return res.json({
        error: "Please enter the size of the Garage in the home.",
      });
    }

    if (!homeYearbuilt) {
      return res.json({
        error: "Please enter the year the home was built.",
      });
    }

    if (!homePropertyType) {
      return res.json({
        error: "Please enter the type of property.",
      });
    }
    const property = await propertyModel.create({
      homeTitle,
      homeDescription,
      homePrice,
      homeAddress,
      homeCountry_State,
      homeCity,
      homeCountry,
      homeZip,
      homeSizeinft,
      homeRooms,
      homeBedrooms,
      homeBathrooms,
      homeGarages,
      homeGaragesize,
      homeYearbuilt,
      homeBasement,
      homePropertyType,
      homePropertyID,
      homePropertyStatus,
      brokerID,
      photos,
    });

    // Passwords match, authentication successful
    return res.json({
      message: "Add Sucessfuly!!s",
      property: property,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.put("/add-property/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const {
      homeTitle,
      homeDescription,
      homePrice,
      homeAddress,
      homeCountry_State,
      homeCity,
      homeCountry,
      homeZip,
      homeSizeinft,
      homeRooms,
      homeBedrooms,
      homeBathrooms,
      homeGarages,
      homeGaragesize,
      homeYearbuilt,
      homeBasement,
      homePropertyType,
      homePropertyID,
      homePropertyStatus,
      brokerID,
    } = req.body;

    // Check if user Exist
    if (!homeTitle) {
      return res.json({
        error: "Enter Home Title",
      });
    }
    if (!homeDescription) {
      return res.json({
        error: "Enter Home description",
      });
    }
    if (!homePrice) {
      return res.json({
        error: "Enter Home Price",
      });
    }
    if (homePrice <= 5000 || homePrice >= 100000000) {
      return res.json({
        error:
          "Home Price is out of range. Please provide a home price within the range of 50,001 to 99,999,999.",
      });
    }
    if (!homeAddress) {
      return res.json({
        error: "Enter Home Addresh",
      });
    }
    if (!homeSizeinft) {
      return res.json({
        error: "Enter Home Size in ft",
      });
    }
    if (!homeCountry_State) {
      return res.json({
        error: "Please enter Home Country/State.",
      });
    }

    if (!homeCity) {
      return res.json({
        error: "Please enter Home City.",
      });
    }

    if (!homeCountry) {
      return res.json({
        error: "Please enter Home Country.",
      });
    }

    if (!homeZip) {
      return res.json({
        error: "Please enter Home Zip Code.",
      });
    }

    if (!homeRooms) {
      return res.json({
        error: "Please enter the number of rooms in the home.",
      });
    }

    if (!homeBedrooms) {
      return res.json({
        error: "Please enter the number of bedrooms in the home.",
      });
    }

    if (!homeBathrooms) {
      return res.json({
        error: "Please enter the number of bathrooms in the home.",
      });
    }

    if (!homeGarages) {
      return res.json({
        error: "Please enter the number of garages in the home.",
      });
    }

    if (!homeGaragesize) {
      return res.json({
        error: "Please enter the size of the garage in the home.",
      });
    }

    if (!homeYearbuilt) {
      return res.json({
        error: "Please enter the year the home was built.",
      });
    }

    if (!homeBasement) {
      return res.json({
        error: "Please specify if the home has a basement.",
      });
    }

    if (!homePropertyType) {
      return res.json({
        error: "Please enter the type of property.",
      });
    }
    if (!homePropertyID) {
      return res.json({
        error: "Please enter Property ID",
      });
    }

    // Find the property by ID and update it
    const updatedProperty = await propertyModel.findByIdAndUpdate(
      _id,
      {
        homeTitle,
        homeDescription,
        homePrice,
        homeAddress,
        homeCountry_State,
        homeCity,
        homeCountry,
        homeZip,
        homeSizeinft,
        homeRooms,
        homeBedrooms,
        homeBathrooms,
        homeGarages,
        homeGaragesize,
        homeYearbuilt,
        homeBasement,
        homePropertyType,
        homePropertyID,
        homePropertyStatus,
        brokerID,
      },
      { new: true }
    );

    return res.json({
      message: "Update Successful",
      property: updatedProperty,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// ContactUS
app.post("/contact-US", async (req, res) => {
  try {
    const { email, firstName, lastName, message } = req.body;

    if (!firstName) {
      return res.json({
        error: "Enter First Name",
      });
    }
    if (!lastName) {
      return res.json({
        error: "Enter Last Name",
      });
    }
    if (!email) {
      return res.json({
        error: "Enter Email",
      });
    }
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(email)) {
      return res.json({
        error: "Invalid Email",
      });
    }
    if (!message) {
      return res.json({
        error: "Enter Message",
      });
    }
    const userconatct = await contactUSModel.create({
      firstName,
      lastName,
      email,
      message,
    });
    return res.json(userconatct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.put("/approved-broker/:_id", async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isbroker = true;
    await user.save();
    res.json({ message: "Broker status updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Profile
app.put("/users/:_id", async (req, res) => {
  const userId = req.params._id;
  const userData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Property delete
app.delete("/property-detail/:_id", async (req, res) => {
  const id = req.params._id;
  const userdelete = await propertyModel.findOne({ _id: id });
  await userdelete.deleteOne();
  res.send(userdelete);
});

const port = 8000;
app.listen(port, () => console.log(`Server is Runing on Port ${port}`));
