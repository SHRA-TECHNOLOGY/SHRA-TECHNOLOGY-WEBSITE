const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadImage = async (file, folder = "courses") => {
  try {
    const response = await imagekit.upload({
      file: file.buffer,
      fileName: `${Date.now()}-${file.originalname}`,
      folder: `/${folder}`,
    });

    return {
      url: response.url,
      fileId: response.fileId,
    };
  } catch (error) {
    throw new Error("Failed to upload image.");
  }
};

const deleteImage = async (fileId) => {
  try {
    await imagekit.deleteFile(fileId);
  } catch (error) {
    throw new Error("Failed to delete image.");
  }
};

module.exports = {
  uploadImage,
  deleteImage,
};
