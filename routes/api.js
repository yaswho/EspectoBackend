require("dotenv").config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const utils = require('../utils/Utils');
const users = require('../models/users')

router.post('/register', async(req, res) => {

	if(!req.body.email || !req.body.password) 
	{
		res.json({"res": "num foi"})
		return;
	}

	if(req.body.password.length == 0)
	{
		res.json({"res": "num foi"})
		return;
	}

    const email = req.body.email;
	const psw = await utils.encrypt(req.body.password)
	
	const uusers = await users.findAll({
		attributes: ['email', 'password'],
		where: {
			email: req.body.email
		}
	});  

	if(Object.keys(uusers).length > 0) {
		res.json({"res": "num foi"})
		return;
	}

	const dt = { email: email, password: psw };

	await users.create(dt) 
		.then(()=> {

			//success
			res.json({"res": "deu certo"})

			//res.redirect(query);
			return;

		}).catch((err) => {
			res.json({"res": "deu errado"})
			//error
        });

});

//Função de login 
router.post('/login', async(req, res) => {

	const uusers = await users.findAll({
		attributes: ['email', 'password'],
		where: {
			email: req.body.email
		}
	}); 

	console.log(`users: ${uusers}`)

	if(Object.keys(uusers).length <= 0) {
		res.json({"res": "acho nao"})
		//error
		return;
	}

	var pass = await utils.validate(req.body.password, uusers[0].dataValues.password);

	if(!pass)
	{
		res.json({"res": "senha errada"})

		// res.redirect(query);
		return;
	}

	res.json({"res": "logasse"})
});

//Função de logout 
router.get('/logout', async(req, res, next) => {
	
	res.end();
});

module.exports = router;