const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.AIRTABLE_BASE_KEY
);
const table = base("coffee-stores");

const getMinifiedRecord = (record) => {
  return {
    ...record.fields,
  };
};
const getMinifiedRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

export {table, getMinifiedRecords}