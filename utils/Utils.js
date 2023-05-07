require("dotenv").config();
const nodemailer = require('nodemailer');
var fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')

const saltRounds = 12

class Utils {
    async encrypt(password)
	{
        let response = -1;
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
        return await bcrypt
            .compare(password, hash);         
	}
}

utils = new Utils()
module.exports = utils