const client = require("../connection/postgreSQL.js")
const stg = require("shapefile-to-geojson")

const postShp = ("/", async (req, res, next) => {
	const reqbod = req.body.fileName
	const tbl = req.body.table
	const geo = await stg.parseFiles("../webgis-st-within-try/assets/" + reqbod[0], "../webgis-st-within-try/assets/" + reqbod[1])

	let features = geo.features

	try {
		features.map(e => {

			let objectid = e.properties.OBJECTID
			let idr_per_sq = e.properties.IDR_PER_SQ
			let meshcode3 = e.properties.MESHCODE3
			let type = e.geometry.type
			let longitude = e.geometry.coordinates[0]
			let latitude = e.geometry.coordinates[1]

			client.query(`INSERT INTO ` + tbl + ` ("objectid", "idr_per_sq", "meshcode3", "type", "longitude", "latitude", "geom") VALUES($1, $2, $3, $4, $5, $6, ST_SetSRID(ST_MakePoint($7, $8), 4326))`, [objectid, idr_per_sq, meshcode3, type, longitude, latitude, longitude, latitude]).catch(err => {
				if (!err) {
					res.send('Insert Data Success!')
				} else {
					res.json(err.message)
					return next()
				}
			})
		})
	} catch (error) {
		res.json(error.message)
		next()
	}
})

const getPoints_test = ("/", async (req, res, next) => {
	try {
		let sql = `SELECT json_build_object('type', 'FeatureCollection','features', json_agg(ST_AsGeoJSON(t.*)::json)) FROM points_test as t`
		client.query(sql, (err, result) => {
			if (!err) {
				console.log('Data Points Success!')
				res.json(result.rows[0].json_build_object)
			} else {
				res.json(err.message)
			}
		})
	} catch (err) {
		res.json(err.message)
	}
})

const getPolygon_monas = ("/", async (req, res, next) => {
	try {
		let sql = `SELECT json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(t.*)::json)) FROM polygon_test as t`
		client.query(sql, (err, result) => {
			if (!err) {
				console.log('Data Polygon Monas Success!')
				res.json(result.rows[0].json_build_object)
			} else {
				res.json(err.message)
			}
		})
	} catch (err) {
		console.log(err.message)
	}
})

const getProperty_sell = ("/", async (req, res, next) => {
	// try {
	// 	let limit = `SELECT json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(t.*)::json)) FROM (SELECT * FROM property_sell_jkt LIMIT 10) AS t`
	// 	client.query(limit, (err, result) => {
	// 		if (!err) {
	// 			console.log('Data Property Sell Success!')
	// 			let count = result.rows[0].json_build_object
	// 			res.json(count)
	// 		} else {
	// 			res.json(err.stack)
	// 		}
	// 	})
	// } catch (error) {
	// 	console.log(error.message)
	// }

	try {
		let text = `SELECT json_build_object('type', 'FeatureCollection','features', json_agg(ST_AsGeoJSON(t.*)::json)) FROM property_sell_jkt as t`

		client.query(text, (err, result) => {
			if (!err) {
				console.log('Data property_sell Success!')
				res.json(result.rows[0].json_build_object)
			} else {
				res.json(err.stack)
			}
		})
	} catch (error) {
		res.json(error.message)
	}
})

const ptswithinply = ("/", (req, res, next) => {
	// let sql = `SELECT a.objectid pts_within_ply FROM points_test a, areas b WHERE ST_Within(a.geom, b.geom)`
	let sql = `SELECT t1.objectid FROM points_test t1 JOIN polygon_test t2 ON ST_Within(t1.geom, t2.geom) WHERE t1.type = 'point' AND t2.type = 'polygon'`
	client.query(sql, (err, result) => {
		if (!err) {
			console.log('ok')
			res.json(result)
		} else {
			res.json(err.message)
		}
	})
})

const getLiquidity_sell = ("/", async (req, res, next) => {
	try {
		let limit = `SELECT json_build_object('type', 'FeatureCollection','features', json_agg(ST_AsGeoJSON(t.*)::json)) FROM (SELECT * FROM liquidity_sell_jkt LIMIT 10) AS t`
		client.query(limit, (err, result) => {
			if (!err) {
				console.log('Data liquidity_sell Success!')
				let count = result.rows[0].json_build_object
				res.json(count)
			} else {
				res.json(err.stack)
			}
		})
	} catch (error) {
		console.log(error.message)
	}

	// try {
	// 	let text = `SELECT json_build_object('type', 'FeatureCollection','features', json_agg(ST_AsGeoJSON(t.*)::json)) FROM liquidity_sell_jkt as t`

	// 	client.query(text, (err, result) => {
	// 		if (!err) {
	// 			console.log('Data liquidity_sell Success!')
	// 			res.json(result.rows[0].json_build_object)
	// 		} else {
	// 			res.json(err.stack)
	// 		}
	// 	})
	// } catch (error) {
	// 	res.json(error.message)
	// }
})



const getLiquidity_rent = ("/", async (req, res, next) => {
	try {
		let text = `SELECT json_build_object('type', 'FeatureCollection','features', json_agg(ST_AsGeoJSON(t.*)::json)) FROM liquidity_rent_jkt as t`

		client.query(text, (err, result) => {
			if (!err) {
				console.log('Data liquidity_rent Success!')
				res.json(result.rows[0].json_build_object)
			} else {
				res.json(err.stack)
			}
		})
	} catch (error) {
		res.json(error.message)
	}
})

const getProperty_rent = ("/", async (req, res, next) => {
	try {
		let text = `SELECT json_build_object('type', 'FeatureCollection','features', json_agg(ST_AsGeoJSON(t.*)::json)) FROM property_rent_jkt as t`

		client.query(text, (err, result) => {
			if (!err) {
				console.log('Data property_rent Success!')
				res.json(result.rows[0].json_build_object)
			} else {
				res.json(err.stack)
			}
		})
	} catch (error) {
		res.json(error.message)
	}
})

module.exports = {
	postShp, getLiquidity_sell, getLiquidity_rent, getProperty_sell, getProperty_rent, getPolygon_monas, ptswithinply, getPoints_test
}