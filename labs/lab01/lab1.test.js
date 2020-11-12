/*
 * Author: 			Eric Altenburg
 * Date: 			11 September 2020
 * Description:  	Lab 1
 * Pledge: 			I pledge my honor that I have abided by the Stevens Honor System.
 */

const lab1 = require("./lab1");

console.log(lab1.questionOne([1, 2, 3])); 
// should output {1: false, 2: true, 3: true}
console.log(lab1.questionOne([5, 9, 13, 17, 20])); // {'5': true, '9':false, '13':true, '17':true, '20':false}
console.log(lab1.questionOne([0, 31, 90, 6217, 80883])); // {'0':false, '31':true, '90':false, '6217':true, '80883':false}
console.log(lab1.questionOne([1])); // {'1':false}
console.log(lab1.questionOne()); // {}
console.log(lab1.questionOne([])); // {}

console.log();

console.log(lab1.questionTwo([1,2,3])); 
// should output 2744 
console.log(lab1.questionTwo([1, 3, 5, 7, 9])); // 4492125
console.log(lab1.questionTwo([1, 10])); // 1030301
console.log(lab1.questionTwo([1])); // 1
console.log(lab1.questionTwo([0])); // 0
console.log(lab1.questionTwo([])); // 0

console.log();

console.log(lab1.questionThree("The quick brown fox jumps over the lazy dog.")); 
// should output {consonants: 24, vowels: 11, numbers: 0, spaces: 8, punctuation: 1, specialCharacters: 0}
console.log(lab1.questionThree("There are 3 ways to write: two, too, and to! </>"));
// { consonants: 17, vowels: 13, numbers: 1, spaces: 10, punctuation: 5, specialCharacters: 2 }
console.log(lab1.questionThree("Are we there yet?!"));
// { consonants: 7, vowels: 6, numbers: 0, spaces: 3, punctuation: 2, specialCharacters: 0 }
console.log(lab1.questionThree("<> !@ $42358*{}\\ is alien for \"I am stressed\""));
// { consonants: 12, vowels: 9, numbers: 5, spaces: 8, punctuation: 3, specialCharacters: 8 }
console.log(lab1.questionThree(""));
// {consonants: 0,  vowels: 0,  numbers: 0, spaces: 0,  punctuation: 0, specialCharacters: 0}
console.log(lab1.questionThree());
// {consonants: 0,  vowels: 0,  numbers: 0, spaces: 0,  punctuation: 0, specialCharacters: 0};

console.log();

console.log(lab1.questionFour(25000, 3.11, 5)); 
// should output: 450.44
console.log(lab1.questionFour(30000, 10, 10)); 
// 396.45
console.log(lab1.questionFour(10, 1, 1)); 
// 0.84
console.log(lab1.questionFour(75000, 7.35, 20)); 
// 597.33
console.log(lab1.questionFour(48000, 3.1415926, 10)); 
// 466.64
console.log(lab1.questionFour(200, 0, 1));
// 16.67