import { ref, getDownloadURL } from '@firebase/storage';
import { storage } from '/@/firebase'
import i18n from '/@/i18n';

const BUCKET_NAME = 'andorra-living-lab-website';

const { locale } = i18n.global;

const localize_field = options => {
  const { localized = [], ...rest } = options;
  const fields = rest.fields.map(field => (
    localized.includes(field) ? `${field}_${locale.value}` : field
  ));
  return { ...rest, fields };
};

const localizeFields = (docData, localized = []) => {
  const result = { ...docData };

  localized.forEach(field => {
    const localizedField = `${field}_${locale.value}`;
    if (docData[localizedField]) {
      result[field] = docData[localizedField];
    }
  });

  return result;
};

const createRemoteStorageUrl = async (filePath) => {
  console.log(filePath)
  try {
    return await getDownloadURL(ref(storage, filePath))
  } catch (e) {
    return null;
  }
}

const createStorageUrl = (filePath) => {
  if (!filePath.startsWith('gs://')) return filePath;

  const path = filePath.replace(`gs://${BUCKET_NAME}/`, '');
  const encodedPath = encodeURIComponent(path);

  return `https://firebasestorage.googleapis.com/v0/b/${BUCKET_NAME}/o/${encodedPath}?alt=media`;
}

const replaceGsUrlsWithPublicUrlsAsync = async (data, fields = []) => {
  const result = { ...data };

  for (const field of fields) {
    const value = result[field];
    if (!value) continue;

    if (Array.isArray(value)) {
      const newUrls = [];
      for (const url of value) {
        const _url = createStorageUrl(url)
        if (_url) {
          const newUrl = _url;
          newUrls.push(newUrl);
        }
      }
      result[field] = newUrls;

    } else if (typeof value === 'string') {
      result[field] = createStorageUrl(value);
    }
  }

  return result;
}

const firebaseTimestampToDate = (timestamp) => {
  return new Date(timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6))
}

export {
  localize_field,
  localizeFields,
  createRemoteStorageUrl,
  createStorageUrl,
  replaceGsUrlsWithPublicUrlsAsync,
  firebaseTimestampToDate
}