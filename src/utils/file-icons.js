const registries = {
  image: 'image',
  video: 'film',
  audio: 'volume-up',
};

const formats = {
  zip: 'file-zip',
  'x-rar-compressed': 'file-zip',
  doc: 'file-word',
  docx: 'file-word',
  pdf: 'file-pdf',
  ppt: 'file-ppt',
  pptx: 'file-ppt',
  xls: 'file-excel',
  xlsx: 'file-excel',
  csv: 'file-code',
};

export default mime => {
  const [registry, format] = mime.split('/');
  return formats[format] || registries[registry] || 'file-3';
};
