import cloudinary from 'cloudinary';

export const connectCloudinary = () => {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      api_key: process.env.CLOUDINARY_API_KEY,
    });
    console.log('Cloudinary ✔');
  } catch (error) {
    throw new Error('Cloudinary ❌', error);
  }
};

export const deleteImgCloudinary = async (imgUrl) => {
  try {
    // Check if Cloudinary IMG
    let isCloudinaryIMG = /res.cloudinary.com/.test(imgUrl);

    if (isCloudinaryIMG) {
      let pathRegex = /\/[^\/]+\/[^\/]+(?=\.)/;
      const path = imgUrl.match(pathRegex)[0].substring(1);

      cloudinary.v2.uploader.destroy(path, () => {
        console.log('Image deleted ✔');
      });
    }
  } catch (error) {
    throw new Error('Error deleting Cloudinary Image', error);
  }
};
