const fs = require('fs');

const removeImage = (file) => {
  try {
    if (file && file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = removeImage;