var partsAvailable = [										 ]
function init(){
	// Load external SVG file

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
function composer(partsAvailable_, inputText="Hello"){
	// temporary placeholder
	let parts = partsAvailable_.slice(0, 3)
	return parts
}

function onTextChange(){
	// Call Ivan's composer
	let parts = composer(partsAvailable, inputText)

	// Draw parts in proper order on proper places

	// Scale the float to fit the screen
}

// Runs infinitely
function animate(){
	// move SVG's group
}

init();
