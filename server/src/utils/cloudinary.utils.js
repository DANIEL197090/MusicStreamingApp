const cloudinary = require("../config/cloudinary");

/**
 * Upload a file buffer to Cloudinary
 */
const uploadToCloudinary = (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: options.resourceType || "auto",
        folder: options.folder || "music-streaming",
        public_id: options.publicId || undefined,
        ...options,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

/**
 * Upload audio to Cloudinary
 */
const uploadAudio = async (fileBuffer, filename) => {
  const result = await uploadToCloudinary(fileBuffer, {
    resourceType: "video", // Cloudinary uses 'video' for audio files
    folder: "music-streaming/audio",
    public_id: `song_${Date.now()}_${filename.replace(/\.[^/.]+$/, "")}`,
  });
  return {
    url: result.secure_url,
    publicId: result.public_id,
    duration: result.duration || 0,
    format: result.format,
    bytes: result.bytes,
  };
};

/**
 * Upload image to Cloudinary
 */
const uploadImage = async (fileBuffer, folder = "images") => {
  const result = await uploadToCloudinary(fileBuffer, {
    resourceType: "image",
    folder: `music-streaming/${folder}`,
    transformation: [
      { width: 800, height: 800, crop: "limit", quality: "auto" },
    ],
  });
  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

/**
 * Delete a resource from Cloudinary
 */
const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
};

module.exports = {
  uploadAudio,
  uploadImage,
  deleteFromCloudinary,
  uploadToCloudinary,
};
