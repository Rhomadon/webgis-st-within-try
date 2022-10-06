const { Router } = require("express")
const { postShp, getLiquidity_sell, getLiquidity_rent, getProperty_sell, getProperty_rent } = require("../controllers/shpController.js")
const router = Router()

router.get('/api', getLiquidity_sell)
router.get('/api', getLiquidity_rent)
router.get('/api', getProperty_sell)
router.get('/api', getProperty_rent)

module.exports = router