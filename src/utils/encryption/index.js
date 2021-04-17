const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
	const hash = await bcrypt.hash(password, 5);
	return hash;
};

const comparePassword = async (userPassword, encryptedPassword) => {
    const isCorrect = await bcrypt.compare(userPassword, encryptedPassword)
    return isCorrect
}

module.exports = {
    encryptPassword,
    comparePassword,
}