import express from 'express'

import createUser from '../controllers/User/createUser.js'
import { loginUser } from '../controllers/User/loginUser.js'
import { renewToken } from '../controllers/User/renewToken.js'
import { updateUser } from '../controllers/User/updateUser.js'
import { validateJWT } from '../middlewares/validateToken.js'

const router = express.Router()


router.post('/create', createUser)
router.put('/update/:id', validateJWT, updateUser)
router.post('/login', loginUser)
router.post('/renew', validateJWT, renewToken)


export default router
