//#using "/devtools/testing/gear.js"

//#using "/DOMM/DOMM.js"
//#using "/DOMM/DOMMNode.js"
//#using "/DOMM/immutables/ImmutableCollection.js"

var dommNodeStylesTests = function () {
	//Get Styles

	it('styles: get a specific style(color)', function () {
		var firstStyleKey = "color";
		var firstStyleValue = "blue";
		var secondStyleKey = "background-color";
		var secondStyleValue = "green";

		var actualObj = new DOMMNode('<div>');
		var attrValue = firstStyleKey + ': ' + firstStyleValue + '; ' + secondStyleKey + ': ' + secondStyleValue + ';';
		actualObj._node.setAttribute('style', attrValue);

		var styles = actualObj.styles("color")

		assert.equal(styles, "blue", "Failed to get DOMMNode current style.");
	});

	it('styles: get a undefined style', function () {
		var actualObj = new DOMMNode('<div>');
		var styles = actualObj.styles("color");

		assert.equal(styles, "", "Failed to get '' style from DOMMNode");
	});

	it('styles: get styles from DOMMNode', function () {
		var firstStyleKey = "background-color";
		var firstStyleValue = "blue";
		var secondStyleKey = "color";
		var secondStyleValue = "red";

		var actualObj = new DOMMNode('<div>');
		var attrValue = firstStyleKey + ': ' + firstStyleValue + '; ' + secondStyleKey + ': ' + secondStyleValue + ';';
		actualObj._node.setAttribute('style', attrValue);

		var styles = actualObj.styles()
		var resultObj = {}
		resultObj[firstStyleKey] = firstStyleValue;
		resultObj[secondStyleKey] = secondStyleValue;

		assert.equal(resultObj[firstStyleKey], actualObj.getNative().style.backgroundColor, "Failed to get DOMMNode style background-color");
		assert.equal(resultObj[secondStyleKey], actualObj.getNative().style.color, "Failed to get DOMMNode style color");
	});

	//Add Styles
	it('styles: add valid style to DOMMNode', function () {
		var firstStyleKey = "color";
		var firstStyleValue = "blue";

		var actualObj = new DOMMNode('<div>');
		actualObj.styles(firstStyleKey, firstStyleValue);
		var style = actualObj.styles("color");

		assert.equal(style, "blue", "Failed to add a style.");
	});

	it('styles: add invalid style to DOMMNode', function () {
		var firstStyleKey = "colorrrrr";
		var firstStyleValue = "blueeeee";

		var actualObj = new DOMMNode('<div>');
		actualObj.styles(firstStyleKey, firstStyleValue);
		var style = actualObj.styles(firstStyleKey);

		assert.equal(style, undefined, "Failed to add a style.");
	});

	it('styles: add valid and invalid style to DOMMNode', function () {
		var firstStyleKey = "color";
		var firstStyleValue = "blue";
		var secondStyleKey = "colorrrrrr";
		var secondStyleValue = "redddddd";

		var actualObj = new DOMMNode('<div>');
		actualObj.styles(firstStyleKey, firstStyleValue);
		actualObj.styles(secondStyleKey, secondStyleValue);
		var styles = actualObj.styles();
		var resultObj = {};
		resultObj[firstStyleKey] = firstStyleValue
		assert.equal(actualObj.getNative().style.colorrrrrr, undefined, "Failed to exclude unexisting style property");
		assert.equal(actualObj.getNative().style.color, "blue", "Failed to add a style.");
	});

	it('styles: add(object) valid style to DOMMNode', function () {
		var firstStyleKey = "color";
		var firstStyleValue = "blue";

		var actualObj = new DOMMNode('<div>');
		var inputObj = {}
		inputObj[firstStyleKey] = firstStyleValue;
		actualObj.styles(inputObj);
		var styles = actualObj.styles();
		var resultObj = {};
		resultObj[firstStyleKey] = firstStyleValue;

		assert.equal(actualObj.getNative().style.color, "blue", "Failed to add a style object");
	});

	it('styles: add(with object) valid and invalid style to DOMMNode', function () {
		var firstStyleKey = "color";
		var firstStyleValue = "blue";
		var secondStyleKey = "colorrrrrr";
		var secondStyleValue = "redddddd";

		var actualObj = new DOMMNode('<div>');
		var inputObj = {}
		inputObj[firstStyleKey] = firstStyleValue;
		inputObj[secondStyleKey] = secondStyleValue;
		actualObj.styles(inputObj);
		var styles = actualObj.styles();
		var resultObj = {};
		resultObj[firstStyleKey] = firstStyleValue

		assert.equal(actualObj.getNative().style.colorrrrrr, undefined, "Failed to exclude unexisting style property using object");
		assert.equal(actualObj.getNative().style.color, "blue", "Failed to add a style using object.");
	});

	//Remove styles
	it('removeStyles: Remove single existing style in DOMMNode.', function () {
		var firstStyleKey = "background-color";
		var firstStyleValue = "blue";

		var actualObj = new DOMMNode('<div>');
		actualObj.styles(firstStyleKey, firstStyleValue);
		actualObj.removeStyles(firstStyleKey);

		assert.equal(actualObj._node.style[firstStyleKey], "", "Failed to remove single style.");
	});

	it('removeStyles: Remove many existing styles in DOMMNode.', function () {
		var firstStyleKey = "background-color";
		var firstStyleValue = "blue";
		var secondStyleKey = "color";
		var secondStyleValue = "red";
		var thirdStyleKey = 'font-weight';
		var thirdStyleValue = 'bold';

		var actualObj = new DOMMNode('<div>');
		actualObj.styles(firstStyleKey, firstStyleValue);
		actualObj.styles(secondStyleKey, secondStyleValue);
		actualObj.styles(thirdStyleKey, thirdStyleValue);
		actualObj.removeStyles(firstStyleKey, secondStyleKey, thirdStyleKey);

		assert.equal(actualObj._node.style[firstStyleKey], "", "Failed to remove multiple styles.");
		assert.equal(actualObj._node.style[secondStyleKey], "", "Failed to remove multiple styles.");
		assert.equal(actualObj._node.style[thirdStyleKey], "", "Failed to remove multiple styles.");
	});

	it('removeStyles: Remove many existing styles in DOMMNode (with array input)', function () {
		var firstStyleKey = "background-color";
		var firstStyleValue = "blue";
		var secondStyleKey = "color";
		var secondStyleValue = "red";
		var thirdStyleKey = 'font-weight';
		var thirdStyleValue = 'bold';

		var actualObj = new DOMMNode('<div>');
		actualObj.styles(firstStyleKey, firstStyleValue);
		actualObj.styles(secondStyleKey, secondStyleValue);
		actualObj.styles(thirdStyleKey, thirdStyleValue);
		actualObj.removeStyles([firstStyleKey, secondStyleKey, thirdStyleKey]);

		assert.equal(actualObj._node.style[firstStyleKey], "", "Failed to remove multiple styles.");
		assert.equal(actualObj._node.style[secondStyleKey], "", "Failed to remove multiple styles.");
		assert.equal(actualObj._node.style[thirdStyleKey], "", "Failed to remove multiple styles.");
	});

	it('removeStyles: Remove many existing styles in DOMMNode (with no args)', function () {
		var firstStyleKey = "background-color";
		var firstStyleValue = "blue";
		var secondStyleKey = "color";
		var secondStyleValue = "red";
		var thirdStyleKey = 'font-weight';
		var thirdStyleValue = 'bold';

		var actualObj = new DOMMNode('<div>');
		actualObj.styles(firstStyleKey, firstStyleValue);
		actualObj.styles(secondStyleKey, secondStyleValue);
		actualObj.styles(thirdStyleKey, thirdStyleValue);
		actualObj.removeStyles();

		assert.equal(actualObj._node.style[firstStyleKey], "", "Failed to remove multiple styles.");
		assert.equal(actualObj._node.style[secondStyleKey], "", "Failed to remove multiple styles.");
		assert.equal(actualObj._node.style[thirdStyleKey], "", "Failed to remove multiple styles.");
	});

	it('Testing hide(): check if the method sets the display property corectly', function () {

		var actualObj = new DOMMNode('<div>');
		actualObj.hide();

		assert.equal(actualObj._node.style["display"], "none", "Failed to hide the element.");
	});

	it('Testing show(): check if the method sets the display property corectly', function () {
		
				var actualObj = new DOMMNode('<div>').hide();
				actualObj.show();		
				assert.equal(actualObj._node.style["display"], "block", "Failed to show the element.");
	});
};