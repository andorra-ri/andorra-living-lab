import { useAirtable } from 'painless-airtable';
import i18n from '/@/i18n';
import config from '/@/config.yaml';

const { locale } = i18n.global;

const { base, resources } = config.api;
const token = import.meta.env.VITE_AIRTABLE_TOKEN;

const airtable = useAirtable({ base, token });

// Define localizable fields for the API query
const localize = options => {
  const { localized = [], ...rest } = options;
  const fields = rest.fields.map(field => (
    localized.includes(field) ? `${field}_${locale.value}` : field
  ));
  return { ...rest, fields };
};

export const getProjects = async () => {
  const { endpoint, ...options } = resources.PROJECTS;
  return airtable.select(endpoint, localize(options));
};

export const getPartners = async () => {
  const { endpoint, ...options } = resources.PARTNERS;
  return airtable.select(endpoint, options);
};
