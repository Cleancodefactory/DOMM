// #using "/devtools/testing/gear.js"

// #using "/DOMM/DOMM.js"
// #using "/DOMM/DOMMNode.js"
// #using "/DOMM/DOMMNodeCollection.js"
// #using "/DOMM/immutables/ImmutableCollection.js"

var dommNodeCollectionCreateRemoveTests = function () {

	//Create Collection in different ways
	//Remove Collection
	//Detach Elements from Collection 

	//Creating Collection
	it('constructor(): Creating an empty new DOMMNodeCollection.', function () {
		var empty = new DOMMNodeCollection();

		assert.equal(empty instanceof DOMMNodeCollection, true, 'The variable is not instance of DOMMNodeCollection.')
	})

	it('constructor(): Creating a new DOMMNodeCollection with empty array.', function () {
		var emptyArray = new DOMMNodeCollection([]);

		assert.equal(emptyArray instanceof DOMMNodeCollection, true, 'The variable is not instance of DOMMNOdeCollection.')
	})

	it('constructor(): Creating a new DOMMNodeCollection with Nodes in Array.', function () {

		var firstNode = new DOMMNode('<div>');
		var secondNode = document.createElement('span');
		var coll = new DOMMNodeCollection([firstNode, secondNode]);
		
		assert.equal(coll instanceof DOMMNodeCollection, true, 'The variable is not instance of DOMMNodeCollection.')
		assert.equal(coll[0], firstNode._node, 'The first child is not equal.')
		assert.equal(coll[1], secondNode, 'The second child is not equal.')
		
	})

	//Detach - Detach Elements in the Collection

	it('detach(): Detach all collection elements from their parents', function () {

		var coll = new DOMMNodeCollection();
		var parentA = new DOMMNode("<div>");
		var childA = new DOMMNode("<div>");
		var parentB = new DOMMNode("<div>");
		var childB = new DOMMNode("<div>");

		parentA.append(childA);
		parentB.append(childB);

		coll = coll.push(childA);
		coll = coll.push(childB);
		coll = coll.detach();

		assert.equal(parentA.getChildren().length, 0, "ChildA is not detached from the parent.")
		assert.equal(parentB.getChildren().length, 0, "ChildB is not detached from the parent.")
		assert.equal(childA.getParent()._node, null, "Child A shouldn't have a parent");
		assert.equal(childB.getParent()._node, null, "Child B shouldn't have a parent");
		assert.equal(coll[0].parentElement, null, "1st child shouldn't have a parent");
		assert.equal(coll[1].parentElement, null, "2nd child shouldn't have a parent");
	})

	//Remove function
	it("remove(): deletes the whole collection's elements", function () {

		var coll = new DOMMNodeCollection();
		var parentA = new DOMMNode("<div>");
		var childA = new DOMMNode("<div>");
		var parentB = new DOMMNode("<div>");
		var childB = new DOMMNode("<div>");

		parentA.append(childA);
		parentB.append(childB);

		coll = coll.push(childA);
		coll = coll.push(childB);
		coll = coll.remove();

		assert.equal(coll, null, "Collection should be null.")
		assert.equal(parentA.getChildren().length, 0, "ChildA is not detached from the parent.")
		assert.equal(parentB.getChildren().length, 0, "ChildB is not detached from the parent.")
		assert.equal(childA.getParent()._node, null, "Child A shouldn't have a parent");
		assert.equal(childB.getParent()._node, null, "Child B shouldn't have a parent");
	})
};
