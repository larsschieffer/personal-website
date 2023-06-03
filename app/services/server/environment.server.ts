import invariant from "tiny-invariant";

export const getValueEnvironmentFromVariable = (variable: string): string => {
  const environmentValue = process.env[variable];
  invariant(environmentValue, `Environment variable ${variable} is missing`);
  return environmentValue;
};
