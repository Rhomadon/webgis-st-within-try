const { Router } = require("express")
const { postShp, getLiquidity_sell, getLiquidity_rent, getProperty_sell, getProperty_rent, getPolygon_monas } = require("../controllers/shpController.js")
const router = Router()

// router.get('/api', getLiquidity_sell)
// router.get('/api', getLiquidity_rent)
router.get('/', getProperty_sell)
// router.get('/api', getProperty_rent)
router.get('/', getPolygon_monas)
router.post('/', postShp)

module.exports = router