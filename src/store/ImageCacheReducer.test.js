import { describe, it, expect } from '@jest/globals';
import { managePictures, initialState, ImageCacheActionTypes } from './ImageCacheReducer';
import { createImageObject } from './reducerUtils';

// test suite for image cache reducer
describe('image cache reducer', () => {
    it('returns the initial state', () => {
        expect(managePictures(undefined, {})).toEqual(initialState());
    });

    it('adds an image to state from base64 string', () => {
        // createObjectURL isn't part of Jest, so add stub
        global.URL.createObjectURL = jest.fn();
        
        const base64String = Buffer.from("testString").toString('base64');
        const testData = {
            value: {
                data: base64String
            }
        };
        const action = {
            type: ImageCacheActionTypes.ADD_PICTURE_ACTION,
            payload: {
                ...testData
            }
        };

        expect(managePictures(undefined, action)).toEqual({
            ...initialState(),
            pictures: createImageObject(testData.value),
        });
    });
});