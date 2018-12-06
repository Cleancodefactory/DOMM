//#using "/devtools/testing/gear.js"

//#using "/DOMM/DOMM.js"
//#using "/DOMM/DOMMNode.js"
//#using "/DOMM/immutables/ImmutableCollection.js"

var dommNodeRelativesTests = function () {

	//GetNext method
	it('getNext(): Gets the next sibling of DOMMNode', function () {
		var firstNode = new DOMMNode("<p>");
		var firstChild = new DOMMNode("<div>");
		var secondChild = document.createElement('h1');

		firstNode.append(firstChild, secondChild);

		assert.equal(firstChild.getNext()._node, secondChild, "The sibling does not match.");
	});

	it('getNext(): Tries to get the next sibling of DOMMNode when the sibling is null', function () {
		var firstNode = new DOMMNode("<p>");
		var firstChild = new DOMMNode("<h1>");
		var secondChild = new DOMMNode("<div>");

		firstNode.append(firstChild, secondChild);

		assert.equal(firstChild.getNext()._node, secondChild._node, "The sibling does not match.");
		assert.equal(firstChild.getNext().isEqualTo(secondChild), true, "The sibling does not match.");
		assert.equal(firstChild.getNext().isReferenceOf(secondChild), true, "The sibling does not match.");
		assert.equal(secondChild.getNext()._node, null, "The result for getting 3rd child is not null.");
	});

	//GetPrev method
	it('getPrev(): Gets the prev sibling of DOMMNode', function () {
		var firstNode = new DOMMNode("<p>");
		var firstChild = new DOMMNode("<h1>");
		var secondChild = new DOMMNode("<div>");

		firstNode.append(firstChild, secondChild);

		assert.equal(secondChild.getPrev()._node, firstChild._node, "The sibling does not match.");
	});

	it('getPrev(): Tries to get the prev sibling of DOMMNode when the sibling is null', function () {
		var firstNode = new DOMMNode("<p>");
		var firstChild = new DOMMNode("<h1>");
		var secondChild = new DOMMNode("<div>");

		firstNode.append(firstChild, secondChild);

		assert.equal(firstChild.getPrev()._node, null, "The result for getting 0 index child is not null.");
		assert.equal(secondChild.getPrev()._node, firstChild._node, "The sibling does not match.");
	});

	//GetParent method
	it('getParent(): Gets the parent of the current DOMMNode', function () {
		var firstNode = new DOMMNode("<span>");
		var firstChild = new DOMMNode("<p>");

		firstNode.append(firstChild);

		assert.equal(firstNode.getParent()._node, null, "The result of getting the parent should be null.");
		assert.equal(firstChild.getParent()._node, firstNode._node, "The result of getting the parent is wrong.");
		assert.equal(firstChild.getParent().isEqualTo(firstNode), true, "The result of getting the parent is wrong.");
		assert.equal(firstChild.getParent().isReferenceOf(firstNode), true, "The result of getting the parent is wrong.");
	});

	//Clone method
	it('clone(): Deep clones a DOMMNode', function () {
		var firstNode = new DOMMNode("<span>").append(document.createElement('div'));
		var secondNode = firstNode.clone()
		var thirdNode = firstNode.clone(true)

		assert.equal(firstNode.isEqualTo(secondNode), true, "The two nodes are not equal.");
		assert.equal(firstNode.isReferenceOf(secondNode), false, "The two nodes should not be equal by reference.");
		assert.equal(firstNode.isEqualTo(thirdNode), true, "The two nodes are not equal.");
		assert.equal(firstNode.isReferenceOf(thirdNode), false, "The two nodes should not be equal by reference.");
	});

	it('clone(): Clones a DOMMNode', function () {
		var firstNode = new DOMMNode("<span>").append(document.createElement('div'));
		var secondNode = firstNode.clone()
		var thirdNode = firstNode.clone(false)

		assert.equal(firstNode.isEqualTo(secondNode), true, "The two nodes are not equal.");
		assert.equal(firstNode.isReferenceOf(secondNode), false, "The two nodes should not be equal by reference.");
		assert.equal(firstNode.isEqualTo(thirdNode), false, "The two nodes should not be equal..");
		assert.equal(firstNode.isReferenceOf(thirdNode), false, "The two nodes should not be equal by reference.");
	});
}
