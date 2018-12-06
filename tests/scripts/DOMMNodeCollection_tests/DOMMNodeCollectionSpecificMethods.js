//#using "/devtools/testing/gear.js"

//#using "/DOMM/DOMM.js"
//#using "/DOMM/DOMMNode.js"
//#using "/DOMM/DOMMNodeCollection.js"
//#using "/DOMM/immutables/ImmutableCollection.js"

var dommNodeCollectionSpecificTests = function () {

	//Push
	//Unshift
	//Get

	//Push method
	it('push() : Push with empty arguments.', function () {
		var coll = new DOMMNodeCollection();

		assert.equal(coll, coll.push(), "Invalid behavior");
	});

	it('push() : Push DOMMNode and Native node to the collection.', function () {
		var coll = new DOMMNodeCollection();
		var firstNode = new DOMMNode("<div>");
		var secondNode = document.createElement("span");

		coll = coll.push(firstNode);
		coll = coll.push(secondNode)

		assert.equal(coll.length, 2, "Invalid children's length");
		assert.equal(coll[0], firstNode._node, "First child do not match");
		assert.equal(coll[1], secondNode, "Second child do not match");

		//Clarify the behavior
		assert.equal(coll.get(0).isEqualTo(firstNode), true, "First child do not match");
		assert.equal(coll.get(0).isReferenceOf(firstNode), true, "First child do not match");
		assert.equal(coll.get(1).isEqualTo(secondNode), true, "Second child do not match");
		assert.equal(coll.get(1).isReferenceOf(secondNode), true, "Second child do not match");
	});

	//Unshift
	it('unshift() : Unshift with empty arguments.', function () {
		var coll = new DOMMNodeCollection();

		assert.equal(coll, coll.unshift(), "Invalid behavior");
	});

	it('unshift() : Unshift DOMMNode and Native node to the collection.', function () {
		var coll = new DOMMNodeCollection();
		var firstNode = new DOMMNode("<div>");
		var secondNode = document.createElement("span");

		coll = coll.unshift(firstNode);
		coll = coll.unshift(secondNode)

		assert.equal(coll.length, 2, "Invalid children's length");
		assert.equal(coll[1], firstNode._node, "First child do not match");
		assert.equal(coll[0], secondNode, "Second child do not match");

		//Clarify the behavior
		assert.equal(coll.get(1).isEqualTo(firstNode), true, "First child do not match");
		assert.equal(coll.get(1).isReferenceOf(firstNode), true, "First child do not match");
		assert.equal(coll.get(0).isEqualTo(secondNode), true, "Second child do not match");
		assert.equal(coll.get(0).isReferenceOf(secondNode), true, "Second child do not match");
	});

	//Get
	it('get() : Get item from collection as DOMMNode.', function () {
		var coll = new DOMMNodeCollection();
		var firstNode = new DOMMNode("<div>");
		var secondNode = document.createElement("div");

		coll = coll.push(firstNode);
		coll = coll.push(secondNode);

		assert.equal(coll.length, 2, "Invalid children's length");
		//FirstChild
		assert.notEqual(coll.get(0), firstNode, "The two nodes should not be equal by ref because get() creates new DOMMNode(new ref)")
		assert.equal(coll.get(0).isEqualTo(firstNode), true, "FirstChild not equals")
		assert.equal(coll.get(0).isReferenceOf(firstNode), true, "FirstChild not equals")
		//SecondChild
		assert.notEqual(coll.get(1), secondNode, false, "The two nodes should not be equal by ref because get() creates new DOMMNode(new ref)")
		assert.equal(coll.get(1).isEqualTo(secondNode), true, "Second not equals")
		assert.equal(coll.get(1).isReferenceOf(secondNode), true, "Second not equals")
		//Mixed
		assert.equal(coll.get(0).isEqualTo(secondNode), true, "The two nodes should be equal")
		assert.equal(coll.get(0).isReferenceOf(secondNode), false, "The two nodes should not be identical")
	});
}
