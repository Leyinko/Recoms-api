const cloudinary = require('cloudinary').v2;

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folderName;
    if (req.body.username) {
      folderName = 'Users';
    } else if (req.body.name) {
      folderName = 'Recommendations';
    } else {
      folderName = 'Collections';
    }
    return {
      folder: folderName,
      allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
    };
  },
});

const upload = multer({ storage });
module.exports = upload;
