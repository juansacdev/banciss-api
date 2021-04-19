const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
	return await bcrypt.hash(password, 5);
};

const comparePassword = async (userPassword, encryptedPassword) => {
    return await bcrypt.compare(userPassword, encryptedPassword)
}

module.exports = {
    encryptPassword,
    comparePassword,
}