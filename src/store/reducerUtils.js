import { base64StringToBlob } from 'blob-util';

/**
 * Utility method to get hash from base64 string. 
 * Bit shift at end in order to get unsigned integer.
 * From: https://stackoverflow.com/a/34842797
 * @param {*} s - base64 string
 * @returns hash value
 */
const imageHash = s => '' + (s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0) >>> 0); 

/**
 * Creates image object used in reducer keyed by hash.
 * @param {*} imageProps - base64 string, file size, name, etc.
 * @returns image object
 */
export const createImageObject = imageProps => {
    const hash = imageHash(imageProps.data);
    const blob = URL.createObjectURL(base64StringToBlob(imageProps.data, "image/png"));
    const { filename, filesize } = imageProps;

    return { [hash]: { hash, blob, filename, filesize } };
}