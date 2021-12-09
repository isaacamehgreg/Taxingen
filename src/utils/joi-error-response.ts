/**
 * Temporal trick for formatting joi error
 * @param arr
 * @returns
 */
export const sanitizeJoiResponse = (arr: Array<any>) => {
  return {
    message: arr[0]?.message,
    key: arr[0]?.path.join(),
  };
};
