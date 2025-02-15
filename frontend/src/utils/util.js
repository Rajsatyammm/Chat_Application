import CryptoJS from "crypto-js";
const secretKey = import.meta.env.VITE_SECRET_KEY_FOR_DATA_SHARING;

export function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

// function to encrypt object
export function getEncryptedStringFromObject(object) {
    try {
        const objectToString = JSON.stringify(object);
        // Encrypt the string using AES
        const encryptedString = CryptoJS.AES.encrypt(objectToString, secretKey).toString();
        return encryptedString;
    } catch(err) {
        throw new Error(err.message || 'error encrypting data');
    }
}

// Function to decrypt object
export function getDecryptedObjectFromEncryptedString(encryptedString) {
    // Decrypt the data
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedString, secretKey);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    
        // Parse the decrypted string into an object
        const decryptedObject = JSON.parse(decryptedString);
        return decryptedObject;
    } catch(err) {
        throw new Error(err.messsage || 'error decrypting data');
    }
}