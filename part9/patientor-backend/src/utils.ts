import { NewPatientEntry, Gender, Entry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringVal = (stringVal: unknown): string => {
  if (!stringVal || !isString(stringVal)) {
    throw new Error('Incorrect or missing stringVal');
  }

  return stringVal;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing stringVal');
  }

  return gender;
};

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseStringVal(name),
    dateOfBirth: parseStringVal(dateOfBirth),
    ssn: parseStringVal(ssn),
    gender: parseGender(gender),
    occupation: parseStringVal(occupation),
    entries: new Array<Entry>()
  };

  return newEntry;
};

export default toNewPatientEntry;