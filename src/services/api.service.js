import { useAirtable } from 'painless-airtable';
import config from '/@/config.yaml';

const { base, resources } = config.api;
const token = import.meta.env.VITE_AIRTABLE_TOKEN;

const airtable = useAirtable({ base, token });
