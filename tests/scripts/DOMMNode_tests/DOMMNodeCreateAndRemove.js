// #using "/devtools/testing/gear.js"

// #using "/DOMM/DOMM.js"
// #using "/DOMM/DOMMNode.js"
// #using "/DOMM/immutables/ImmutableCollection.js"

var dommNodeCreateRemoveTests = function () {
	it('Creating a new DOMMNode.', function () {
		var dommNode = new DOMMNode('<div>');
		var expected = document.createElement('div');

		assert.equal(dommNode._node.outerHTML, expected.outerHTML, 'DOMMNode constructor fails to create a node.');
	})

	it('Wrapping an existing html element.', function () {
		var element = document.createElement('div');
		element.setAttribute('class', 'hello');
		
		var dommNode = new DOMMNode(element);		
		assert.deepEqual(dommNode._node, element, 'DOMMNode constructor fails to create a node from an Node.');
	})
	
	//----------Tests for Remove are needed----------
};
