const multer = require('multer')
const path = require('path');
const storage = multer.memoryStorage();

const multerStorage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, './public/images/profile');
  // },

  filename: (req, file, cb) => {

    cb(null, `image-${Date.now()}` + path.extname(file.originalname))
    //path.extname get the uploaded file extension
  }
});
const multerFilter = (req, file, cb) => {
  try {
    console.log('file', file)
    if (file != null && !file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a Image'))
    }

  } catch (e) {

  }
  cb(null, true)

};
exports.upload = multer({
  storage: storage,
  fileFilter: multerFilter
});

exports.uploadJson = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    try {
      
      if (!file.originalname.match(/\.(json)$/)) {
        // upload only png and jpg format
        return cb(new Error('Please upload a Json File'))
      }

    } catch (e) {

    }
    cb(null, true)

  }
})