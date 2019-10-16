var YAML = require('yamljs')
var rita = require('rita');

var partsAvailable = []
function init(){
	// Load external SVG file
	//var draw = SVG('test').size(300, 300)
	
	// Ivan's attempt to loat external svg, according to
	// https://stackoverflow.com/questions/26284029/svgjs-load-external-svg-file
	var draw = SVG('drawing').size(500, 500)
	//var rect = draw.rect(400, 400).attr({ fill: '#f06' })
	var ajax = new XMLHttpRequest()
	ajax.open('GET', '../src/floats.svg', true)
	ajax.send()
	ajax.onload = function(e) {
		draw.svg(ajax.responseText)
		var elements = SVG.select('[fill="#F04B40"]').fill('#f0e')
	}

	// Get the list of float's parts
	// temporary placeholder
	partsAvailable = [
		[256, 256, 120],
		[256, 256, 120],
		[ 16,  16,  40],
		[ 16, 256, 100],
		[256,  16,  40],
		[ 16,  16,  40],
		[ 16, 256, 100],
		[256,  16,  40],
	]

	// Set function onTextChange() to run on every text change. And run it for the first time.

	// Launch the animation
	animate()
}

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
	RiTa.randomSeed(3);
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

function onTextChange(){
	// Call Ivan's composer
	let parts = compose(partsAvailable, inputText)

	// Draw parts in proper order on proper places

	// Scale the float to fit the screen
}

// Runs infinitely
function animate(){
	// move SVG's group
}

init()
compose()

//// TODO remove ↓
//var tracery = require('tracery-grammar');

//var grammar = tracery.createGrammar({
  //'animal': ['panda','fox','capybara','iguana'],
  //'emotion': ['sad','happy','angry','jealous'],
  //'origin':['I am #emotion.a# #animal#.'],
//});

//grammar.addModifiers(tracery.baseEngModifiers); 

//console.log(grammar.flatten('#origin#'));


