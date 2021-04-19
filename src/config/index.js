require("dotenv").config()

module.exports = {
	dev: process.env.NODE_ENV !== "production",
	port: process.env.PORT || 3000,
	DB_URI: process.env.DB_URI || 'mongodb+srv://testUser:testUser@test.86mpl.mongodb.net/banciss-api?retryWrites=true&w=majority',
	jwt_secret: process.env.JWT_SECRET || "topSecret",
}
