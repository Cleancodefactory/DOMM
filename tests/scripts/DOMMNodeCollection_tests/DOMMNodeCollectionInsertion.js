var dommNodeCollectionInsertionTests = function () {

	//appendTo
	//prependTo
	//insertAfter
	//insertBefore

	it('appendTo() : Appends the DOMMNodeCollection elements as children to the target', function () {
		
		var parent = new DOMMNode('<span>');
		parent.append(document.createElement('h1'));

		var firstCollChild = new DOMMNode("<div>").text('First Child');
		var secondCollChild = new DOMMNode("<span>").text('Second Child');
		var coll = new DOMMNodeCollection([firstCollChild, secondCollChild]);

		//coll.appendTo(parent);
		parent.append(coll);

		assert.equal(parent.getChildren().get(1).isEqualTo(firstCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(1).isReferenceOf(firstCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(2).isEqualTo(secondCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(2).isReferenceOf(secondCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().length, 3, "Children length is not equal");
	});

	it('prependTo() : Prepends DOMMNodeCollection elements as children to the target', function () {
		
		var parent = new DOMMNode('<span>');
		parent.append(document.createElement('h1'));

		var firstCollChild = new DOMMNode("<div>").text('First Child');
		var secondCollChild = new DOMMNode("<span>").text('Second Child');
		var coll = new DOMMNodeCollection([firstCollChild, secondCollChild]);

		//coll.prependTo(parent);
		parent.prepend(coll);

		assert.equal(parent.getChildren().get(0).isEqualTo(firstCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(0).isReferenceOf(firstCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(1).isEqualTo(secondCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(1).isReferenceOf(secondCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().length, 3, "Children length is not equal");
	});

	//InsertBefore function
	it('insertBefore() : Insert DOMMNodeCollection before target(first)', function () {
		var parent = new DOMMNode('<span>');
		var child = new DOMMNode('<title>');
		parent.append(child);
		parent.append(document.createElement('div'));
		parent.append(document.createElement('h1'));

		var firstCollChild = new DOMMNode("<div>").text('First Child');
		var secondCollChild = new DOMMNode("<span>").text('Second Child');
		var coll = new DOMMNodeCollection([firstCollChild, secondCollChild]);

		coll.insertBefore(child);

		assert.equal(parent.getChildren().get(0).isEqualTo(firstCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(0).isReferenceOf(firstCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(1).isEqualTo(secondCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(1).isReferenceOf(secondCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().length, 5, "Children length is not equal");
	});

	it('insertBefore() : Insert DOMMNodeCollection before target', function () {
		var parent = new DOMMNode('<span>');
		var child = new DOMMNode('<title>');
		parent.append(document.createElement('div'));
		parent.append(child);
		parent.append(document.createElement('h1'));

		var firstCollChild = new DOMMNode("<div>").text('First Child');
		var secondCollChild = new DOMMNode("<span>").text('Second Child');
		var coll = new DOMMNodeCollection([firstCollChild, secondCollChild]);

		coll.insertBefore(child);

		assert.equal(parent.getChildren().get(1).isEqualTo(firstCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(1).isReferenceOf(firstCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(2).isEqualTo(secondCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(2).isReferenceOf(secondCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().length, 5, "Children length are not equal");
	});

	it('insertBefore() : Insert DOMMNodeCollection before target in the DOM Tree', function () {
		// var node = DOMQuery('div')

		// var firstCollChild = new DOMMNode("<div>").text('First Child');
		// var secondCollChild = new DOMMNode("<span>").text('Second Child');
		// var coll = new DOMMNodeCollection([firstCollChild, secondCollChild]);

		// coll = coll.insertBefore(node);

		// assert.equal(node.get(0).getPrev()._node, secondCollChild._node, "Children are not equal");
		// assert.equal(node.get(0).getPrev().getPrev()._node, firstCollChild._node, "Children are not equal");
	});

	//InsertAfter function
	it('insertAfter() : Insert DOMMNodeCollection After target(last)', function () {
		var parent = new DOMMNode('<span>');
		var child = new DOMMNode('<title>');
		parent.append(document.createElement('div'));
		parent.append(document.createElement('h1'));
		parent.append(child);

		var firstCollChild = new DOMMNode("<div>").text('First Child');
		var secondCollChild = new DOMMNode("<span>").text('Second Child');
		var coll = new DOMMNodeCollection([firstCollChild, secondCollChild]);

		coll.insertAfter(child);

		assert.equal(parent.getChildren().get(parent.getChildren().length - 2).isEqualTo(firstCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(parent.getChildren().length - 2).isReferenceOf(firstCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(parent.getChildren().length - 1).isEqualTo(secondCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(parent.getChildren().length - 1).isReferenceOf(secondCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().length, 5, "Children length are not equal");

		coll.remove();
	});

	it('insertAfter() : Insert DOMMNodeCollection before target', function () {
		var parent = new DOMMNode('<span>');
		var child = new DOMMNode('<title>');
		parent.append(document.createElement('div'));
		parent.append(child);
		parent.append(document.createElement('h1'));

		var firstCollChild = new DOMMNode("<div>").text('First Child');
		var secondCollChild = new DOMMNode("<span>").text('Second Child');
		var coll = new DOMMNodeCollection([firstCollChild, secondCollChild]);

		coll.insertAfter(child);

		assert.equal(parent.getChildren().get(2).isEqualTo(firstCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(2).isReferenceOf(firstCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(3).isEqualTo(secondCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(3).isReferenceOf(secondCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().length, 5, "Children length are not equal");
	});

	it('insertAfter() : Insert DOMMNodeCollection before target in the DOM Tree', function () {
		// var node = DOMQuery('div')

		// var firstCollChild = new DOMMNode("<div>").text('First Childd');
		// var secondCollChild = new DOMMNode("<span>").text('Second Childd');
		// var coll = new DOMMNodeCollection([firstCollChild, secondCollChild]);

		// coll.insertAfter(node);

		// assert.equal(node.get(0).getNext().isEqualTo(firstCollChild), true, "Children are not equal");
		// assert.equal(node.get(0).getNext().isReferenceOf(firstCollChild), true, "Children are not equal");
		// assert.equal(node.get(0).getNext().getNext().isEqualTo(secondCollChild), true, "Children are not equal");
		// assert.equal(node.get(0).getNext().getNext().isReferenceOf(secondCollChild), true, "Children are not equal");

		// coll.remove();
	});
};