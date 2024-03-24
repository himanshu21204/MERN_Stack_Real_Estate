const express = require('express')
const router = express.Router()
const cors = require('cors')
const User = require('../ModelsSchema/userSchema')
const bcrypt = require('bcrypt');
const {compare} = require('bcrypt');


module.exports = router