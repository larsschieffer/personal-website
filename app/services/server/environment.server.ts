import invariant from "tiny-invariant";

export const getValueEnvironmentFromVariable = (
  variableName: string
): string => {
  const environmentValue = process.env[variableName];
  invariant(
    environmentValue,
    `Environment variable ${variableName} is missing`
  );
  return environmentValue;
};
