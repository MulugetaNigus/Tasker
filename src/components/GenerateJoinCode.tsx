// try to generate the joined code
const GenerateJoinCode = (): string => {
  const JoinNumber = [];
  for (let index = 0; index <= 11; index++) {
    const RanNum = Math.floor(Math.random() * 6);
    JoinNumber.push(RanNum);
  }
  return JoinNumber.join("");
};

export default GenerateJoinCode;
