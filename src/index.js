import SVG from 'svgjs'
YAML = require('yamljs')
var rita = require('rita')

// переменные
let circle
let circle2
let circle3
var partsAvailable = []
var floatSVG
var draw = SVG('drawing')
let bobberGroup = draw.group()
let bobberOuterGroup = draw.group()
let bobberSet = draw.set()


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
	draw.size('100vw', '100vh')
	var ajax = new XMLHttpRequest()
	ajax.open('GET', '../src/floats.svg', true)
	ajax.send()
	ajax.onload = function(e) {
		floatSVG = draw.svg(ajax.responseText)
		//floatSVG.move(0,20)
		
		// hide background from Figma
		SVG.select('#floats>rect, svg>rect').hide()
		//console.log(SVG.select())

		// Get the list of float's parts
		var partsSVG = SVG.select('#floats>g')
		partsSVG.each(function(d) {
			let p = this.attr('id')
			partsAvailable.push(p)
		})

		// Binding events listeners

		document.querySelector("input#float-value").addEventListener("input", onTextChange) // Меняет цвета по нажатию любой клавиши в поле.

		onTextChange()
		idleAnimation()
		idleAnimationCircle()

		bobberGroup.click(animate)
	}
}

function onTextChange() {
	
	let text = document.getElementById("float-value").value
	let parts = compose(partsAvailable, text)

	// hide all parts
	draw.select('use').hide()

	// show needed parts
	console.log(parts)
 	
	var offsetY = 0
	var floatCurrnet = draw.group()
	bobberSet.clear(); // очищает сет перед новым вводом текста
	parts.forEach(pId => {
		let p = draw.use(pId)//.clone()
		bobberGroup.add(p); // добавляю элементы в группу для анимации
		bobberSet.add(p); // добавляю элементы в сет
		p.attr('opacity','1')
		p.move("-256", offsetY)
		p.back()
		let h, t, b
		[h, t, b] = unpackFloatId(pId)
		console.log(h, t, b)
		offsetY += h
	})

	draw.viewbox(-128, -offsetY*.05, 256, offsetY+offsetY*.1)
	//draw.rect(512, offsetY).attr('fill','red').move(-256, 0)

	circle = SVG.select('#waterCircle')
	circle2 = SVG.select('#waterCircle2')
	circle3 = SVG.select('#waterCircle3')

	circle3.hide()
	setTimeout(function(){circle3.show()}, 100)
	bobberOuterGroup.add(bobberGroup)
}




// Ivan's part, which determines the subset of parts and their order
function compose(partsAvailable_=[], inputText="Hello"){
	console.log(inputText)
	let pseudoRandom = hashCode(inputText)
	console.log(pseudoRandom)
	let partsStripped = partsAvailable_.map(unpackFloatId).map(d => {return d.slice(1,3)})
	var unique = [];
	partsStripped.forEach(function(p){
		var i = unique.findIndex(x => x[0] == p[0] && x[1] == p[1]);
		if(i <= -1){
			unique.push(p);
		}
	});
	console.log(partsAvailable_);
	console.log(unique);

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
	- <dragonfly> <0_32> <32_8> <8_8> <8_32> <water> <32_64> <64_8> <8_0>
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
		console.log(p)
		var ui = unique.findIndex(u => u[0] == p[0] && u[1] == p[1]);
		if(ui>=0){
			rg.addRule('<'+unique[ui][0]+'_'+unique[ui][1]+'>', i.toString());
			console.log('<'+unique[ui][0]+'_'+unique[ui][1]+'>', i.toString());
		}
	}
	var result = rg.expand();
	console.log("result");
	console.log();
	console.log(rg);
	let parts = []
	result.split(' ').map(Number).forEach(r => {
		parts.push(partsAvailable_[r])
	})


	


	return parts
}

function animate () {
	circle3.hide()

	bobberGroup
		.animate(100, '>').dmove(0, 30)
		.animate(200, '<>').rotate(3)
		.animate(150, '<').dmove(-20, -40)
		.animate(200, '<>').rotate(-2)
		.animate(300, '>').dmove(20, 10)
		.animate(300, '<>').rotate(0);
	
	circle
		.attr({
			rx: 0,
			ry: 0,
			opacity: 0.3
		})
		.animate(1300, '>', 0).attr({
			rx: 512,
			ry: 128,
			opacity: 0
		})
		
	circle2
		.attr({
			rx: 0,
			ry: 0,
			opacity: 1
		})
		.animate(1300, '>', 100).attr({
			rx: 512,
			ry: 128,
			opacity: 0
		})
		
	setTimeout(function(){circle3.show()}, 1000)
}

function idleAnimation () {
	bobberOuterGroup
		.animate(800, '<>').dmove(0, 10)
		.animate(800, '<>').dmove(0, -10)
		.after(idleAnimation)
}

function idleAnimationCircle () {
	circle3
		.attr({
			rx: 0,
			ry: 0,
			opacity: 0.5
		})
		.animate(1600, '>').attr({
			rx: 102,
			ry: 24,
			opacity: 0
		})
		.after(idleAnimationCircle)
}
