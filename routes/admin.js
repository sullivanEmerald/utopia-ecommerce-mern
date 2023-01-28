const express =  require('express')
const router =  express.Router()
const upload = require('../middleware/multer')
const adminControl = require('../controllers/admin')
const { ensureAdmin} = require('../middleware/auth')

// RENDERING ADMIN PAGES

router.get('/', ensureAdmin, adminControl.getIndex)
router.get('/create', ensureAdmin, adminControl.createProductForm)
router.post('/createProduct', ensureAdmin, upload.single('file'), adminControl.createProduct)
router.get('/view/users', ensureAdmin, adminControl.viewUsers )
router.put('/updateAdmin/:id', ensureAdmin, adminControl.updateAdmin)
router.put('/ReverseAdmin/:id', ensureAdmin,adminControl.reverseAdmin)
router.delete('/deleteUser/:id', ensureAdmin, adminControl.deleteUser)
router.get('/view/admin', ensureAdmin, adminControl.viewAdmin)
router.put('/removeAdmin/:id', ensureAdmin, adminControl.removeAdmin)
router.get('/view/orders', ensureAdmin, adminControl.getOrders)
router.post('/pending/:id', ensureAdmin, adminControl.sendStatus)
router.get('/product/edit/:id', ensureAdmin, adminControl.editProduct)

module.exports = router