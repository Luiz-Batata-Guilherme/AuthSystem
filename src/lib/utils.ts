function getExpTimestamp(seconds: number) {
  const currentTimeMillis = Date.now();
  const secondsIntoMillis = seconds * 1000;
  const expirationTimeMillis = currentTimeMillis + secondsIntoMillis;

  return Math.floor(expirationTimeMillis / 1000);
}

const convertToLocalDate = (utcDate: Date | string) => {
  return new Date(utcDate).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
};

export { getExpTimestamp, convertToLocalDate };
