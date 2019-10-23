import SVG from 'svgjs'
YAML = require('yamljs')
var rita = require('rita')

// переменные
const group = SVG.select('#floatParts')
const circle = SVG.select('#waterCircle')
const circle2 = SVG.select('#waterCircle2')

var partsAvailable = []
var floatSVG


// вызов функций
init()


function unpackFloatId(floatId='p-1-2-3'){
	let a = floatId.split('-').map(Number)
	return [a[1],a[2],a[3]]
}


// функции
function hashCode(str) {
	return str.split('').reduce((prevHash, currVal) =>
	  (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0)
  }

function init(){
	var draw = SVG('drawing')
	draw.size(5000, 5000)
	//var rect = draw.rect(400, 400).attr({ fill: '#f06' })
	var ajax = new XMLHttpRequest()
	ajax.open('GET', '../src/floats.svg', true)
	ajax.send()
	ajax.onload = function(e) {
		floatSVG = draw.svg(ajax.responseText)
		floatSVG.move(0,0)
		
		// hide background from Figma
		SVG.select('#floatParts>rect, svg>rect').hide()
		//console.log(SVG.select())

		// Get the list of float's parts
		var partsSVG = SVG.select('#floatParts>g')
		partsSVG.each(function(d) {
			let p = this.attr('id')
			partsAvailable.push(p)
		})
		//console.log("partsAvailable are init")
		//console.log(partsAvailable)

		// Binding events listeners

		document.querySelector("input#float-value").addEventListener("input", onTextChange) // Меняет цвета по нажатию любой клавиши в поле.
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
		onTextChange()
	}

}

// Set function onTextChange() to run on every text change. And run it for the first time.
// Пока что работает по нажатию клавиши без учёта изменения слов. 
// onTextChange()


function onTextChange() {
  //var palette = ["#F04B40", "#B7C7B0", "#1D2F5A", "#F7E7CA"] // Палитра для окрашивания поплавков.
  
  //var pickFromPalette1 = palette[Math.floor(Math.random()*palette.length)] // Рандомайзер колорпика.
  //var bodyTopAttr1 = SVG.select('#p-64-8-128').attr({ // Меняет цвет секции.
    //fill: pickFromPalette1,
   //'fill-opacity': 1})
  
  //var pickFromPalette2 = palette[Math.floor(Math.random()*palette.length)] // Рандомайзер колорпика.
  //var bodyTopAttr2 = SVG.select('#p-256-128-8').attr({ // Меняет цвет секции.
    //fill: pickFromPalette2,
   //'fill-opacity': 1})
  
  //var pickFromPalette3 = palette[Math.floor(Math.random()*palette.length)] // Рандомайзер колорпика.
  //var bodyTopAttr3 = SVG.select('#p-128-8-8').attr({ // Меняет цвет секции.
    //fill: pickFromPalette3,
   //'fill-opacity': 1})
	//
	//console.log("partsAvailable are")
	//console.log(partsAvailable)
	let parts = compose(partsAvailable, "Hello Kitty")
	//console.log("parts are")
	//console.log(parts)

	// hide all parts
	SVG.select('#floatParts>g').hide()

	// show needed parts
	console.log(parts)
	var offsetY = 0
	parts.forEach(pId => {
		let p = SVG.select('#'+pId)
		p.show()
		//console.log(p.y())
		//p.x(0)
		//p.y(offsetY)
	  p.move(0, offsetY)
		p.back()
		let h, t, b
		[h, t, b] = unpackFloatId(pId)
		console.log(h, t, b)
		offsetY += h
	})
	
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

	<multiline>:
	- This is not realy a multiline
	`

	var rg = new RiGrammar(str);
	RiTa.randomSeed(hashCode(inputText));
	var result = rg.expand();
	//console.log(result);

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


