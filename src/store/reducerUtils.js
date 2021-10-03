import { base64StringToBlob } from 'blob-util';
import { imageHash } from '../utils/utils';

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