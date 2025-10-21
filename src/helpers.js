import { ref, getDownloadURL } from '@firebase/storage';
import { storage } from '/@/firebase';
import i18n from '/@/i18n';

const BUCKET_NAME = 'andorra-living-lab-website';

const { locale } = i18n.global;

const localizeField = options => {
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

const createRemoteStorageUrl = async filePath => {
  try {
    return await getDownloadURL(ref(storage, filePath));
  } catch (e) {
    return null;
  }
};

const createStorageUrl = filePath => {
  if (!filePath.startsWith('gs://')) return filePath;

  const path = filePath.replace(`gs://${BUCKET_NAME}/`, '');
  const encodedPath = encodeURIComponent(path);

  return `https://firebasestorage.googleapis.com/v0/b/${BUCKET_NAME}/o/${encodedPath}?alt=media`;
};

const replaceGsUrlsWithPublicUrlsAsync = async (data, fields = []) => {
  const result = { ...data };

  fields.forEach(field => {
    const value = result[field];
    if (value) {
      if (Array.isArray(value)) {
        const newUrls = value.map(url => createStorageUrl(url)).filter(Boolean);
        result[field] = newUrls;
      } else if (typeof value === 'string') {
        result[field] = createStorageUrl(value);
      }
    }
  });

  return result;
};

const firebaseTimestampToDate = timestamp => {
  const millis = timestamp.seconds * 1000
    + Math.floor(timestamp.nanoseconds / 1e6);
  return new Date(millis);
};

export {
  localizeField,
  localizeFields,
  createRemoteStorageUrl,
  createStorageUrl,
  replaceGsUrlsWithPublicUrlsAsync,
  firebaseTimestampToDate,
};
