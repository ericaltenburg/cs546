// Author: 			Eric Altenburg
// Date: 			11 September 2020
// Description:  	Lab 1
// Pledge: 			I pledge my honor that I have abided by the Stevens Honor System.

const lab1 = require("./lab1");

console.log(lab1.questionOne([1, 2, 3])); 
// should output {1: false, 2: true, 3: true}

console.log(lab1.questionTwo([1,2,3])); 
// should output 2744 

console.log(lab1.questionThree("The quick brown fox jumps over the lazy dog.")); 
// should output {consonants: 24, vowels: 11, numbers: 0, spaces: 8, punctuation: 1, specialCharacters: 0}

console.log(lab1.questionFour(25000, 3.11, 5)); 
// should output: 450.44