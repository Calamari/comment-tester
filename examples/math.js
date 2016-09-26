
/**
 * @example
 * ? module.calcPercentage(100, 20)
 * > 20
 * ? module.calcPercentage(50, 10)
 * > 20
 */
const calcPercentage = (max, part) => part / max * 100;

exports = {
  calcPercentage: calcPercentage
};
