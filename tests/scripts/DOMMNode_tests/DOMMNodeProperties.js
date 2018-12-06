// #using "/devtools/testing/gear.js"

// #using "/DOMM/DOMM.js"
// #using "/DOMM/DOMMNode.js"
// #using "/DOMM/immutables/ImmutableCollection.js"

var dommNodePropertiesTests = function () {
	var dommNode = new DOMMNode('<div>');
	var expected = document.createElement('div');

	it('Should return "DIV" for nodeName value.', function () {
		assert.equal(dommNode.properties('nodeName'), expected.nodeName, "Failed: both strings are not equal!!!");
	});

	it('Should set "textContent" to "New text content".', function () {
		var text = 'New text content';

		dommNode.properties('textContent',text);
		expected.textContent = text;
		assert.equal(dommNode._node.textContent, expected.textContent, "Failed: both strings are not equal!!!");
	});

	it('Should return "true" for .hasProperty("textContent")', function () {

		assert.isOk(dommNode.hasProperty("textContent"), "False is not equal to true!");
	})

	it('Should return "false" - .textContent=""', function () {
		dommNode.properties('textContent','');
		assert.isNotOk(dommNode.hasProperty("textContent"), "False is not equal to true!");
	})
};