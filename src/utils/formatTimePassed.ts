export function formatTimePassed(unixTimestamp: number): string {
  const currentTime = Date.now();
  const differenceInSeconds = (currentTime - unixTimestamp) / 1000;

  const hours = Math.floor(differenceInSeconds / 3600);
  if (hours < 24) {
    if (hours === 1) {
      return `hace ${hours} hora`;
    }
    return `hace ${hours} horas`;
  }

  const days = Math.floor(differenceInSeconds / 86400);
  if (days < 30) {
    if (days === 1) {
      return `hace ${days} dia`;
    }
    return `hace ${days} dias`;
  }

  const months = Math.floor(days / 30);
  if (months === 1) {
    return `hace ${months} mes`;
  }
  return `hace ${months} meses`;
}
