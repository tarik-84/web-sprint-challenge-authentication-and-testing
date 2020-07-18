const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const data = require('../auth-model/auth-model')



const router = require('express').Router();

router.post('/register', async (req, res, next) => {
  try {
		const { username, password } = req.body
		const user = await data.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await data.add({
			username,
			password: await bcrypt.hash(password, 14),
		})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
});

router.post('/login', async (req, res, next) => {
  try {
  const { username, password } = req.body
  const user = await data.findBy({ username }).first()
  
  if (!user) {
    return res.status(401).json({
      message: "Invalid Credentials",
    })
  }
  const passwordValid = await bcrypt.compare(password, user.password)

  if (!passwordValid) {
    return res.status(401).json({
      message: "Invalid Credentials",
    })
  }
  const payload = {
    userId: user.id,
    username: user.username,
    userRole: 'normal'
  }
      res.cookie('token', jwt.sign(payload, process.env.JWT_sECRET))
  res.json({
    message: `Welcome ${user.username}!`,
  })
} catch(err) {
  next(err)
}
})

module.exports = router;
