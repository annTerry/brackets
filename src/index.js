module.exports = function check(str, bracketsConfig) {
  
  const stack = [];
  const comfortConfig = {};

  bracketsConfig.forEach((oneConfig, index) => {
    if(oneConfig[0] !== oneConfig[1] ) {
    comfortConfig[oneConfig[0]] = [0,index];
    comfortConfig[oneConfig[1]] = [1,index];
    }
    else {
      comfortConfig[oneConfig[0]] = [2, index]; 
    }
  });

  const strArray = str.split('');
  for (let char of strArray) {

    const bracketData = comfortConfig[char];

    if (bracketData) {
      if ((stack.length === 0) || (bracketData[0] === 0)) {
        stack.push(bracketData);
      }
      else if (bracketData[0] === 2) {
        let checkStack = stack[stack.length - 1];
        if (checkStack[0] === 2 && checkStack[1] === bracketData[1]) {
          stack.pop();
        }
        else {
          stack.push(bracketData);
        }
      }
      else {
        const lastData = stack.pop();
        if (lastData[1] !== bracketData[1]) {
          return false;
        }
      }
    }
  }

  return stack.length === 0;
}
