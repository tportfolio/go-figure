// https://stackoverflow.com/a/34842797
export const imageHash = s => '' + (s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0) >>> 0); //bit shift in order to get unsigned integer