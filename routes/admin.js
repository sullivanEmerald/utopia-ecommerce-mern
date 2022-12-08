const express =  require('express')
const router =  express.Router()
const upload = require('../middleware/multer')
const adminControl = require('../controllers/admin')
const { ensureAdmin} = require('../middleware/auth')

// RENDERING ADMIN PAGES

router.get('/', ensureAdmin, adminControl.getIndex)
router.get('/create', adminControl.createProductForm)
router.post('/createProduct', upload.single('file'), adminControl.createProduct)
router.get('/view/users', adminControl.viewUsers )
router.put('/updateAdmin/:id', adminControl.updateAdmin)
router.put('/ReverseAdmin/:id', adminControl.reverseAdmin)
router.delete('/deleteUser/:id', adminControl.deleteUser)
router.get('/view/admin', adminControl.viewAdmin)

module.exports = router