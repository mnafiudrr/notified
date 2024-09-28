export const encrypt = (text: string, key: string | undefined): string => {
  if (!key) key = process.env.KEY ?? "";
  let encrypted = "";
  for (let i = 0; i < text.length; i++) {
    const keyChar = key.charCodeAt(i % key.length);
    encrypted += String.fromCharCode(text.charCodeAt(i) ^ keyChar);
  }
  return btoa(encrypted);
};

export const decrypt = (
  encryptedText: string,
  key: string | undefined
): string => {
  if (!key) key = process.env.KEY ?? "";
  const decoded = atob(encryptedText);
  let decrypted = "";
  for (let i = 0; i < decoded.length; i++) {
    const keyChar = key.charCodeAt(i % key.length);
    decrypted += String.fromCharCode(decoded.charCodeAt(i) ^ keyChar);
  }
  return decrypted;
};
