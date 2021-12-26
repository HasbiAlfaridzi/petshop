export const GET_ALL_DOGS_PROSES = "GET_ALL_DOGS_PROSES";
export const GET_ALL_DOGS_SUCCESS = "GET_ALL_DOGS_SUCCESS";
export const GET_ALL_DOGS_ERROR = "GET_ALL_DOGS_ERROR";
export const GET_SUB_DOGS_PROSES = "GET_SUB_DOGS_PROSES";
export const GET_SUB_DOGS_SUCCESS = "GET_SUB_DOGS_SUCCESS";
export const GET_SUB_DOGS_ERROR = "GET_SUB_DOGS_ERROR";
export const GET_IMG_DOGS_PROSES = "GET_IMG_DOGS_PROSES";
export const GET_IMG_DOGS_SUCCESS = "GET_IMG_DOGS_SUCCESS";
export const GET_IMG_DOGS_ERROR = "GET_IMG_DOGS_ERROR";

export function getAllDogs() {
    return {
        type: GET_ALL_DOGS_PROSES
    };
}

export function getSubDogs(data) {
    return {
        type: GET_SUB_DOGS_PROSES,
        data:data
    };
}

export function getImgDogs(data) {
    return {
        type: GET_IMG_DOGS_PROSES,
        data:data
    };
}

