import express from 'express'
import createItem from '../controllers/Item/createItem.js'
import { validateJWT } from '../middlewares/validateToken.js'
import getAllItems from '../controllers/Item/getAllItems.js'
import getItemById from '../controllers/Item/getItemById.js'
import updateItem from '../controllers/Item/updateItem.js'
import deleteItem from '../controllers/Item/deleteItem.js'
const router = express.Router()

router.post('/newItem',validateJWT, createItem)
router.get('/:id', getItemById)
router.get('/', getAllItems)
router.put('/update/:id',validateJWT, updateItem)
router.delete('/delete/:id', deleteItem)

export default router
