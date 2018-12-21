var dommNodeCollectionInsertionTests = function () {

	it('append() : Appends the DOMMNodeCollection elements as children to the target(DOMMNode)', function () {
		
		var parent = new DOMMNode('<span>');
		parent.append(document.createElement('h1'));

		var firstCollChild = new DOMMNode("<div>").text('First Child');
		var secondCollChild = new DOMMNode("<span>").text('Second Child');
		var coll = new DOMMNodeCollection([firstCollChild, secondCollChild]);

		parent.append(coll);

		assert.equal(parent.getChildren().get(1).isEqualTo(firstCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(1).isReferenceOf(firstCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(2).isEqualTo(secondCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().get(2).isReferenceOf(secondCollChild), true, "Children are not equal");
		assert.equal(parent.getChildren().length, 3, "Children length is not equal");
	});

	it('prepend() : Prepends DOMMNodeCollection elements as children to the target(DOMMNode)', function () {
		
		var parent = new DOMMNode('<span>');
		parent.append(document.createElement('h1'));

		var firstCollChild = new DOMMNode("<div>").text('First Child');
		var secondCollChild = new DOMMNode("<span>").text('Second Child');
		var coll = new DOMMNodeCollection([firstCollChild, secondCollChild]);

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
};