const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const UserModel = require('./userSchemaBA')


const app = express()

const port = 8002

mongoose.connect('mongodb+srv://hkp21204BA:hkp21204BrokerApplied@cluster0.rpnx7rq.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Database Connected")).catch((err) => console.log("Database Connection Error:", err));


app.use(express.json())
app.use(bodyParser.json());
const corsOrigin ={
    origin:'http://localhost:3000',
    credentials:true,
    preflightContinue:true,
}
app.use(cors(corsOrigin));

app.get('/', (req, res) => {
    res.json('Test is Working')
})

app.post('/agent-applied', async (req, res) => {
    try {
        const { name, email, phoneNumber, addresh, aboutBroker ,isBroker} = req.body;
        //Check if Name is Entered
        if (!name) {
            return res.json({
                error: 'Name is Required'
            })
        };
        //Check if Email is Entered
        if (!email) {
            return res.json({
                error: 'Email is Required'
            })
        };
        let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if (!emailRegex.test(email)) {
            return res.json({
                error: "Error! you have entered invalid email."
            })
        }

        //Check if Phone Number is Entered
        if (!phoneNumber) {
            return res.json({
                error: 'Phone Number is Required'
            })
        } else if (phoneNumber.length > 10 || phoneNumber.length < 10) {
            return res.json({
                error: 'InValid Phone Number Enter'
            })
        }
        //Check Addresh is good
        if (!addresh) {
            return res.json({
                error: 'Addresh is Required'
            })
        }
        //Check About is good
        if (!aboutBroker) {
            return res.json({
                error: 'About is Required'
            })
        }
        const userAB = await UserModel.create({
            name,email,phoneNumber,addresh,aboutBroker,isBroker
         })
  
         return res.json(userAB)
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => console.log(`Server is Running on port ${port}`))