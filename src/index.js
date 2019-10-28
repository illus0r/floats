import SVG from 'svgjs'
YAML = require('yamljs')
var rita = require('rita')

// переменные
let circle
let circle2
var partsAvailable = []
var floatSVG
var draw = SVG('drawing')
let bobberGroup = draw.group()


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
	draw.size('6000', '2000')
	//var rect = draw.rect(400, 400).attr({ fill: '#f06' })
	var ajax = new XMLHttpRequest()
	ajax.open('GET', '../src/floats.svg', true)
	ajax.send()
	ajax.onload = function(e) {
		floatSVG = draw.svg(ajax.responseText)
		//var defs = draw.defs()
		//defs.add(SVG.select('#floats>g') )
		//floatSVG.scale(0, 0)
		floatSVG.move(0,20)
		
		// hide background from Figma
		SVG.select('#floats>rect, svg>rect').hide()

		// Get the list of float's parts
		var partsSVG = SVG.select('#floats>g')
		partsSVG.each(function(d) {
			let p = this.attr('id')
			partsAvailable.push(p)
		})

		// Binding events listeners

		document.querySelector("input#float-value").addEventListener("input", onTextChange) // Меняет цвета по нажатию любой клавиши в поле.

		onTextChange()
		
		document.querySelector("#SvgjsG1008").addEventListener("click", function () {
			animate ();
			
			circle.attr({
				rx: 0,
				ry: 0,
				opacity: 0.3
			})
			
			circle2.attr({
				rx: 0,
				ry: 0,
				opacity: 1
			})
		})
	}
}

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
	
	let text = document.getElementById("float-value").value
	bobberGroup.scale(10/(text.length+10))
	bobberGroup.move(0,0)
	console.log(3/text.length)
	
	//delete all clones
	//SVG.select('.clone').remove()
	//SVG.select('g.clone').replace(' ')
	//SVG.select('g.instance').remove()

	// hide all parts
	draw.select('use').hide()
 	
	var offsetY = 0
	for( let i=0; i<250; i++ ){
		if(i%5==0) {offsetY = Math.random()*400-400}
		let parts = compose(partsAvailable, text)
		text += ' '
		var floatCurrnet = draw.group()
		parts.forEach(pId => {
			let p = draw.use(pId)//.clone()
			bobberGroup.add(p); // добавляю элементы в группу для анимации
			p.attr('opacity','1')
			p.move((Math.floor(i/5))*256, offsetY + 60)
			p.back()
			let h, t, b
			[h, t, b] = unpackFloatId(pId)
			offsetY += h
		})
		offsetY += 100
	}

	//circle = SVG.select('#waterCircle')
	//circle2 = SVG.select('#waterCircle2')
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
	let pseudoRandom = hashCode(inputText)
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
	let partsStripped = partsAvailable_.map(unpackFloatId).map(d => {return d.slice(1,3)})
	//var set = new Set()
	//partsStripped.forEach(d => {
		//if(!set.has(d)){
			//set.add(d)
		//}
	//})
	var unique = [];
	partsStripped.forEach(function(p){
		var i = unique.findIndex(x => x[0] == p[0] && x[1] == p[1]);
		if(i <= -1){
			unique.push(p);
		}
	});

	var str = `
	<water>:
	- <0_0>
	<start>:
	- <type1>
	- <type2>
	- <type3>
	- <iceberg>
	- <type4>
	- <type5>
	- <type6>
	- <type7>
	- <type8>
	- <type9>
	- <type10>
	- <type11>
	- <type12>
	- <type13>
	- <type14>
	<type1>:
	- <0_8> <8_8> <8_8> <8_32> <water> <32_32> <32_8> <8_0>
	<type2>:
	- <0_8> <8_8> <8_8> <8_64> <water> <64_64> <64_8> <8_0>
	<type3>:
	- <0_8> <8_8> <8_8> <8_128> <water> <128_128> <128_8> <8_0>
	<iceberg>:
	- <dragonfly> <0_32> <water> <32_128> <128_8> <8_0>
	<type4>:
	- <dragonfly> <0_64> <water> <64_128> <128_128> <128_8> <8_0>
	<type5>:
	- <dragonfly> <0_64> <64_64> <64_64> <64_128> <water> <128_128> <128_32> <32_8> <8_0>
	<type6>:
	- <dragonfly> <0_32> <32_8> <8_8> <32_32> <water> <32_64> <64_8> <8_0>
	<type7>:
	- <dragonfly> <0_64> <64_32> <32_32> <32_64> <64_128> <water> <128_64> <64_8> <8_0>
	<type8>:
	- <dragonfly> <0_64> <water> <64_32> <32_8> <8_0>
	<type9>:
	- <dragonfly> <0_64> <64_8> <8_8> <8_32> <32_32> <32_128> <water> <128_64> <64_64> <64_8> <8_0>
	<type10>:
	- <0_8> <8_8> <8_8> <8_8> <8_32> <32_128> <128_128> <water> <128_128> <128_128> <128_64> <64_8> <8_0>
	<type11>:
	- <0_8> <8_64> <64_64> <water> <64_64> <64_32> <32_8> <8_0>
	<type12>:
	- <0_8> <8_8> <8_8> <8_32> <water> <32_32> <32_8> <8_0>
	<type13>:
	- <dragonfly> <0_32> <32_8> <8_8> <8_8> <8_8> <8_32> <32_64> <water> <64_64> <64_8> <8_0>
	<type14>:
	- <0_8> <8_8> <8_64> <water> <64_8> <8_0>
	`

	var rg = new RiGrammar(str);
	rg.addRule("<dragonfly>", "<256_256>", 10)
	rg.addRule("<dragonfly>", "<999999_999999>", 90) // not existing element
	RiTa.randomSeed(pseudoRandom);
	
	for( let i = 0; i<partsStripped.length; i++){
    let p = partsStripped[i]
		var ui = unique.findIndex(u => u[0] == p[0] && u[1] == p[1]);
		if(ui>=0){
			rg.addRule('<'+unique[ui][0]+'_'+unique[ui][1]+'>', i.toString());
		}
	}
	var result = rg.expand();
	let parts = []
	result.split(' ').map(Number).forEach(r => {
		parts.push(partsAvailable_[r])
	})


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
	


	return parts
}

// function onTextChange(){
// 	// Call Ivan's composer
// 	let parts = compose(partsAvailable, inputText)

// 	// Draw parts in proper order on proper places


// 	// Scale the float to fit the screen
// }
function animate () {
	bobberGroup
		.animate(100, '>').move(0, 30)
		.animate(100, '<>').rotate(3)
		.animate(150, '<').move(0, -20)
		.animate(100, '<>').rotate(-2)
		.animate(300, '>').move(0, 0)
		.animate(300, '<>').rotate(0);
	
	circle.animate(1500, '>', 0).attr({
		rx: 512,
		ry: 128,
		opacity: 0
	  })
		
	circle2.animate(1500, '>', 150).attr({
		rx: 512,
		ry: 128,
		opacity: 0
	})
}
