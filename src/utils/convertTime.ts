const secondToHrsAndMin = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

export { secondToHrsAndMin };
