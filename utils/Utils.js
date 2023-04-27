require("dotenv").config();
const nodemailer = require('nodemailer');
var fs = require('fs');
const path = require('path');

const saltRounds = 12

class Utils {
    async encrypt(password)
	{
        response;
		await bcrypt
            .hash(password, saltRounds)
            .then(hash => {
                response = hash
            })
            .catch(err => {
                console.error(err.message)
                response = -1
            })

        return response
	}

	async validate(password, hash)
	{
        response = false

        await bcrypt
            .compare(password, hash)
            .then(res => {
                response = res// return true
            })
            .catch(err => console.error(err.message)) 

        return response
	}
}

utils = Utils()
module.exports = utils