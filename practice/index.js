let arr1 = [5, 4, 1, 2, 3];
let i = 0;
let nextNum = 0;
let visited = 0;
let sorted = [];
for (i = 0, nextNum = 1; sorted.length < arr1.length; i++, visited++) {
    if (arr1[i] == nextNum) {
        sorted.push(arr1[i]);
        nextNum++;
        i=-1;
    }

}
console.log(sorted);
console.log(visited);