const timeToMs = ({ hours = 0, minutes = 0, seconds = 0 }) => {
  let result = 0;
  result += seconds;
  result += minutes * 60;
  result += hours * 60 ** 2;
  return result * 1000;
};

module.exports = timeToMs;
