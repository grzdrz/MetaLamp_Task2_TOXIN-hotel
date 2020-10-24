/* eslint-disable import/prefer-default-export */
export function doDeclensionOfWord(number, words) {
  const stringifiedNumber = number.toString();
  const isEndOnOne = stringifiedNumber[stringifiedNumber.length - 1] === '1';
  const isNotEqualEleven = number !== 11;
  if (isEndOnOne && isNotEqualEleven) return words[0];

  const isEndNumberMoreThenOne = stringifiedNumber[stringifiedNumber.length - 1] > 1;
  const isEndNumberLessThenFour = stringifiedNumber[stringifiedNumber.length - 1] <= 4;
  const isEndNumberBetweenTwelveAndFourteen = number < 12 || number > 14;
  const isSecondWord = isEndNumberMoreThenOne && isEndNumberLessThenFour && isEndNumberBetweenTwelveAndFourteen;
  if (isSecondWord) return words[1];

  return words[2];
}