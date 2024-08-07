export const getLinesFromUSFM = (text: string) => {
  return text.split(/(?=\n|\\(?:v|c|id))/g);
};

export const extractNumberFromUSFM = (text: string): number => {
  const regex = /^\\[vc]\s+(\d+)/;
  const match = text.match(regex);
  if (match) {
    return +match[1];
  }
  return 0;
};
