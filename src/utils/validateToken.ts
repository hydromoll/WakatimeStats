// This function determines whether a wakatime API key is valid or not.
// The regex tests the key for the correct format. The regex checks for
// a 32-character hexadecimal string that begins with 'waka_' or not.
// The tests are case-insensitive.

export const apiKeyInvalid = (key: string): boolean => {
  const re = new RegExp(
    "^(waka_)?[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
    "i"
  );
  return re.test(key);
};

//TEST TOKEN VALIDATION
export const validateToken = async (token: string) => {
  const url = `https://wakatime.com/api/v1/users/current/?api_key=${token}`;
  const res = await fetch(url);
  return res.status === 200;
};
