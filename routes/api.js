require("dotenv").config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const utils = require('../utils/Utils')

router.post('/registrar', async(req, res) => {
    const email = req.body.email;
	const psw = await utils.encrypt(req.body.password)
	//const _uuid = await utils.generatePacientUUID();

	const dt = { email: email, password: psw };

	await Paciente.create(dt) //aqui
		.then(()=> {

			//success

			//res.redirect(query);
			return;

		}).catch((err) => {

			//error,
        });

});

//Função de login 
router.post('/login', async(req, res) => {

	const users = await Paciente.findAll({
		attributes: ['email', 'senha'],
		where: {
			email: req.body.email
		}
	}); 

	if(Object.keys(users).length < 0) {
		//error
		return;
	}

	var pass = await utils.validate(req.body.senha, users[0].dataValues.senha);

	if(!pass)
	{
		//error

		// res.redirect(query);
		return;
	}

	//success
});

//Função de logout 
router.post('/logout', async(req, res, next) => {
	
	res.end();
});