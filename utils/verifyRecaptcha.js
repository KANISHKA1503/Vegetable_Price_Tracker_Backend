const axios = require('axios');

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;
  try {
    const response = await axios.post(url);
    return response.data.success;
  } catch (err) {
    return false;
  }
}

module.exports = verifyRecaptcha;
