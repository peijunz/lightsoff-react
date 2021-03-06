let solution = [
[0,1,1,1,0,0,0,1,0,1,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0],
[1,1,0,1,1,0,1,0,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0],
[1,0,1,1,1,1,0,1,1,0,0,0,1,1,0,1,1,1,1,1,0,1,0,0,0],
[1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,0,0],
[0,1,1,0,1,1,0,0,0,0,1,0,1,0,1,0,0,1,0,1,1,1,0,0,0],
[0,0,1,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0],
[0,1,0,1,0,1,1,0,1,1,0,0,0,1,0,1,1,1,0,0,0,1,0,0,0],
[1,0,1,0,0,1,0,1,1,0,0,0,0,0,1,1,0,1,0,1,1,0,1,0,0],
[0,0,1,0,0,0,1,1,1,0,1,0,0,1,1,1,0,0,1,0,0,1,1,0,0],
[1,0,0,0,0,1,1,0,0,0,1,0,1,0,1,0,1,1,0,1,0,0,1,0,0],
[0,0,0,0,1,0,0,0,1,1,0,0,1,0,1,1,1,1,1,0,0,1,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,0,0],
[0,1,1,0,1,1,0,0,0,1,1,0,1,1,0,0,0,1,0,0,1,1,0,0,0],
[1,1,1,0,0,0,1,0,1,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0],
[1,1,0,0,1,0,0,1,1,1,1,0,0,1,1,1,1,0,1,0,1,0,0,0,0],
[0,0,1,0,0,0,1,1,1,0,1,0,0,0,1,1,0,1,0,1,1,0,1,0,0],
[0,0,1,1,0,0,1,0,0,1,1,1,0,0,1,0,1,1,1,0,0,0,1,0,0],
[0,0,1,0,1,0,1,1,0,1,1,0,1,0,0,1,1,0,1,1,1,0,0,0,0],
[0,1,1,0,0,1,0,0,1,0,1,0,0,1,1,0,1,1,1,0,0,0,1,0,0],
[1,0,1,0,1,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,1,0,1,0,0],
[0,0,0,1,1,0,0,1,0,0,0,1,1,0,1,1,0,1,0,1,1,1,0,0,0],
[0,0,1,1,1,0,1,0,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0],
[0,0,0,1,0,0,0,1,1,1,0,1,0,0,0,1,1,0,1,1,0,1,0,0,0],
[0,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,0],
[1,0,1,0,1,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,1,0,1,0,1]
]
function dot(a, b) {
  let x = 0;
  for (var i=0; i<a.length; i++) {
    x += a[i]*b[i];
  }
  return x;
}

function is_solvable(squares) {
  let flat = squares.flat()
  let ok1 = dot(solution[23], flat)%2 === 0;
  let ok2 = dot(solution[24], flat)%2 === 0;
  return ok1 && ok2;
}

function solve(squares) {
  let flat = squares.flat()
  let answer = [];
  for (var i=0; i<25; i++) {
    answer.push(dot(solution[i], flat)%2)
  }
  return answer;
}
module.exports = {
   solution: solution,
   solve: solve,
   is_solvable: is_solvable
}
