import { v2 as cloudinary } from 'cloudinary'

const cloudinaryConfig = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
}
export default cloudinaryConfig;

export const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: process.env.CLOUDINARY_FOLDER_NAME,
            quality: 50,
            transformation: [
                { width: 1000, height: 1000, crop: "limit" }
            ]
        });
        return result;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
}

export const uploadStreamToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: process.env.CLOUDINARY_FOLDER_NAME,
                quality: 50,
                transformation: [
                    { width: 1000, height: 1000, crop: "limit" }
                ],
                resource_type: 'auto'
            },
            (error, result) => {
                if (error) {
                    console.log('error', error.message);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        stream.end(file);
    });
}