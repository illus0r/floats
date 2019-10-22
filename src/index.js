import SVG from 'svgjs';
YAML = require('yamljs');
var rita = require('rita');

// переменные
const group = SVG.select('#floatParts');
const circle = SVG.select('#waterCircle');
const circle2 = SVG.select('#waterCircle2');

var partsAvailable = [];



// вызов функций
init();
onTextChange(); // Меняет цвет при загрузке сайта.

document.querySelector("input#float-value").addEventListener("keydown", onTextChange) // Меняет цвета по нажатию любой клавиши в поле.
document.querySelector("input#float-value").addEventListener("keydown", translateAndShow) // Должен сместить часть поплавка и показать его.
document.querySelector("#floatParts").addEventListener("click", function () {
  animate();
  
  circle.attr({
    rx: 0,
    ry: 0,
    opacity: 1
  })
  
  circle2.attr({
    rx: 0,
    ry: 0,
    opacity: 1
  })
}) 



// функции
function hashCode(str) {
	return str.split('').reduce((prevHash, currVal) =>
	  (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
  }

function init(){
	// Load external SVG file	
	// Ivan's attempt to loat external svg, according to
	// https://stackoverflow.com/questions/26284029/svgjs-load-external-svg-file
	var draw = SVG('drawing').size(800, 1500)
	//var rect = draw.rect(400, 400).attr({ fill: '#f06' })
	var ajax = new XMLHttpRequest()
	ajax.open('GET', '../src/floats.svg', true)
	ajax.send()
	ajax.onload = function(e) {
		draw.svg(ajax.responseText)
		
		onTextChange()
	}

	// Get the list of float's parts
	// temporary placeholder
	
	partsAvailable = [
	'#p-128-8-8',
	'#p-64-8-128',
	'#p-256-128-8', 
	'#p-512-8-8',]
	
	/* partsAvailable = [
		[256, 256, 120],
		[256, 256, 120],
		[ 16,  16,  40],
		[ 16, 256, 100],
		[256,  16,  40],
		[ 16,  16,  40],
		[ 16, 256, 100],
		[256,  16,  40],
	] */
}

// Set function onTextChange() to run on every text change. And run it for the first time.
// Пока что работает по нажатию клавиши без учёта изменения слов. 
// onTextChange()


function onTextChange() {
  var palette = ["#F04B40", "#B7C7B0", "#1D2F5A", "#F7E7CA"] // Палитра для окрашивания поплавков.
  
  var pickFromPalette1 = palette[Math.floor(Math.random()*palette.length)] // Рандомайзер колорпика.
  var bodyTopAttr1 = SVG.select('#p-64-8-128').attr({ // Меняет цвет секции.
    fill: pickFromPalette1,
   'fill-opacity': 1})
  
  var pickFromPalette2 = palette[Math.floor(Math.random()*palette.length)] // Рандомайзер колорпика.
  var bodyTopAttr2 = SVG.select('#p-256-128-8').attr({ // Меняет цвет секции.
    fill: pickFromPalette2,
   'fill-opacity': 1})
  
  var pickFromPalette3 = palette[Math.floor(Math.random()*palette.length)] // Рандомайзер колорпика.
  var bodyTopAttr3 = SVG.select('#p-128-8-8').attr({ // Меняет цвет секции.
    fill: pickFromPalette3,
   'fill-opacity': 1})

}


/*
// Trying “float drawing algorithm”
function translateAndShow() {
  var offsetY = 0;
  var translate = SVG.select(partsAvailable[0]).attr ({
    fill: '#ff0', // As sensor
    cx: 0, cy: 'offsetY + 128' }) // Translator
    
  var show = document.getElementsByTagName("g");
    document.g.style.display = "" // To show g's again 
    }
*/


// Ivan's part, which determines the subset of parts and their order
function compose(partsAvailable_=[], inputText="Hello"){
	// first approach is to select parts randomly, according to their sizes.
	// just make a hundred of random possible constructions and forbid those, who don't match sertain criteria. I.e. length, segment number. Other way is to make a generative grammar. But there should be some tweak. For example, the length of the float should be limited. It can be done with grammar rules, though. Hm. OK, let's see what we've gotten so far.
	//
	// Every possible part of a float can be regarded as terminal token. Let's start with a list of such tokens:
  //  [ 16,  16,  40],
  //  [ 16, 256, 100],
  //  [256,  16,  40],
  //  [256, 256, 120],
  //  every of them can be expanded into a specific array element. 
	//
	//	1. Make terminal rules from partsAvailable. If needed, make strings out of lists. Ignore height:
  //  16_16 → 2, 5
  //  16_256 → 3, 6
  //  256_16 → 4, 7
  //  256_256 → 0, 1
	//
	//	←top  o--------<(____)>-----  bottom→
	//  2. Теперь самое грамматика. Надо закодировать как-то понятно все комбинации поплавков.
	//  bottom → #16_16# #16_16# #16_16# #16_#
	//  bottom → #16_16# #16_16# #16_#
	//  bottom → #16_16# #16_#
	//  bottom → #16_#
	//
	//  middle → #16_256# #256_16#
	//  middle → #16_256# #256_256# #256_16#
	//  middle → #16_256# #256_256# #256_256# #256_16#
	//  middle → #16_256# #256_256# #256_256# #256_256# #256_16#
	//
	//  top → #_16# #16_16# #16_16# #16_16#
	//  top → #_16# #16_16# #16_16#
	//  top → #_16# #16_16#
	//  top → #_16#
	//
	//  this list elements are unique. So now we can think out different parts of a float. It's crusial to avoid recursion
	// 
	// temporary placeholder
	

	var str = `
		<start>:
		- <rule1>
		- <multiline>

		<rule1>:
		- terminal string 1
		- terminal string 2

		<multiline>: >
		This is
		a long string
		that wraps three lines
	`

	var rg = new RiGrammar(str);
	RiTa.randomSeed(hashCode(inputText));
	var result = rg.expand();
	console.log(result);
	var result = rg.expand();
	console.log(result);
	var result = rg.expand();
	console.log(result);
	var result = rg.expand();
	console.log(result);

	let parts = partsAvailable_.slice(0, 3)
	return parts
}

// function onTextChange(){
// 	// Call Ivan's composer
// 	let parts = compose(partsAvailable, inputText)

// 	// Draw parts in proper order on proper places


// 	// Scale the float to fit the screen
// }

// Runs infinitely
function animate(){
	group
    .animate(100, '>').move(0, 30)
    .animate(100, '<>').rotate(3)
    .animate(150, '<').move(0, -20)
    .animate(100, '<>').rotate(-2)
    .animate(300, '>').move(0, 0)
    .animate(300, '<>').rotate(0);
  
  circle.animate(1000, '>', 0).attr({
    rx: 256,
    ry: 64,
    opacity: 0
  })
  
  circle2.animate(1000, '>', 100).attr({
    rx: 256,
    ry: 64,
    opacity: 0
  })
}


