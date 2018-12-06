var dommNodeChildManipTests = function () {
	//GetChildren method
	it('getChildren() : Get direct children of the DOMMNode', function () {
		var mainDiv = new DOMMNode("<div>");
		mainDiv._node.appendChild(document.createElement("h1"));
		mainDiv._node.appendChild(document.createElement("span"));

		assert.equal(mainDiv.getChildren().length, 2, "Invalid children's length");
		assert.equal((mainDiv.getChildren() instanceof DOMMNodeCollection), true, "The method returns a different type. It should be DOMMNodeCollection");
		assert.equal(mainDiv.getChildren()[0].tagName, "H1", "Invalid child order");
		assert.equal(mainDiv.getChildren()[1].tagName, "SPAN", "Invalid child order");
	});

	//Append Method
	it('append() : Appends few elements with input (Node|DOMMNode) to a DOMMNode', function () {
		var mainDiv = new DOMMNode("<div>");
		mainDiv.append(document.createElement("h1"));
		mainDiv.append(document.createElement("span"));
		mainDiv.append(new DOMMNode("<div>"));

		assert.equal(mainDiv.getChildren().length, 3, "Invalid children's length"); //getChildren returns only element types, text node won't be included
		assert.equal(mainDiv._node.childNodes[0].nodeName, "H1", "Invalid child order");
		assert.equal(mainDiv._node.childNodes[1].nodeName, "SPAN", "Invalid child order");
		assert.equal(mainDiv._node.childNodes[2].nodeName, "DIV", "Invalid child order");
	});

	it('append() : Appends few elements with input (Node|DOMMNode) to a DOMMNode', function () {
		var mainDiv = new DOMMNode("<div>");
		mainDiv.append(document.createElement("h1"));
		mainDiv.append(document.createElement("span"));
		mainDiv.append(new DOMMNode("<div>"));

		assert.equal(mainDiv.getChildren().length, 3, "Invalid children's length"); //getChildren returns only element types, text node won't be included
		assert.equal(mainDiv._node.childNodes[0].nodeName, "H1", "Invalid child order");
		assert.equal(mainDiv._node.childNodes[1].nodeName, "SPAN", "Invalid child order");
		assert.equal(mainDiv._node.childNodes[2].nodeName, "DIV", "Invalid child order");
	});

	// it('append() : Appends few elements with input (queryString) to a DOMMNode', function () {
	// 	var mainDiv = new DOMMNode("<div>");
	// 	mainDiv.append('div');
	// 	mainDiv.append('<span>');
	// 	mainDiv.append('<h1');
	// 	mainDiv.append('h2>');
	// 	mainDiv.append('<h3');
	// 	mainDiv.append('<h4></h4><h5></h5><h6></h6');

	// 	assert.equal(mainDiv.getChildren().length, 8, "Invalid children's length"); //getChildren returns only element types, text node won't be included
	// 	assert.equal(mainDiv._node.childNodes[0].nodeName, "DIV", "Invalid child order");
	// 	assert.equal(mainDiv._node.childNodes[1].nodeName, "SPAN", "Invalid child order");
	// 	assert.equal(mainDiv._node.childNodes[2].nodeName, "H1", "Invalid child order");
	// 	assert.equal(mainDiv._node.childNodes[3].nodeName, "H2", "Invalid child order");
	// 	assert.equal(mainDiv._node.childNodes[4].nodeName, "H3", "Invalid child order");
	// 	assert.equal(mainDiv._node.childNodes[5].nodeName, "H4", "Invalid child order");
	// 	assert.equal(mainDiv._node.childNodes[6].nodeName, "H5", "Invalid child order");
	// 	assert.equal(mainDiv._node.childNodes[7].nodeName, "H6", "Invalid child order");
	// });

	//Prepend Method
	it('prepend() : Prepends few elements with input (Node|DOMMNode) to a DOMMNode', function () {
		var mainDiv = new DOMMNode("<div>");
		mainDiv.prepend(document.createElement("h1"));
		mainDiv.prepend(document.createElement("span"));
		mainDiv.prepend(new DOMMNode("<div>"));

		assert.equal(mainDiv.getChildren().length, 3, "Invalid children's length"); //getChildren returns only element types, text node won't be included
		assert.equal(mainDiv._node.childNodes[2].nodeName, "H1", "Invalid child order");
		assert.equal(mainDiv._node.childNodes[1].nodeName, "SPAN", "Invalid child order");
		assert.equal(mainDiv._node.childNodes[0].nodeName, "DIV", "Invalid child order");
	});

	//AppendTo Method
	it('appendTo() : Append elements to DOMMNode', function () {
		var parent = new DOMMNode('<div>');
		var firstChild = new DOMMNode('<span>');
		var secondChild = new DOMMNode('<h1>');
		firstChild.appendTo(parent);
		secondChild.appendTo(parent);

		assert.equal(parent.getChildren()[0], firstChild._node, "First child does not match");
		assert.equal(parent.getChildren()[1], secondChild._node, "Second child does not match");
	});

	it('appendTo() : Append elements to Node Element', function () {
		var parent = document.createElement('div');
		var firstChild = new DOMMNode('<span>');
		var secondChild = new DOMMNode('<h1>');
		firstChild.appendTo(parent);
		secondChild.appendTo(parent);

		assert.equal(parent.childNodes[0], firstChild._node, "First child does not match");
		assert.equal(parent.childNodes[1], secondChild._node, "Second child does not match");
	});

	//PrependTo Method
	it('prependTo() : Prepend elements DOMMNode', function () {
		var parent = new DOMMNode('<div>');
		var firstChild = new DOMMNode('<span>');
		var secondChild = new DOMMNode('<h1>');
		firstChild.prependTo(parent);
		secondChild.prependTo(parent);

		assert.equal(parent.getChildren()[1], firstChild._node, "First child does not match");
		assert.equal(parent.getChildren()[0], secondChild._node, "Second child does not match");
	});

	it('prependTo() : Prepend elements to Node Element', function () {
		var parent = document.createElement('div');
		var firstChild = new DOMMNode('<span>');
		var secondChild = new DOMMNode('<h1>');
		firstChild.prependTo(parent);
		secondChild.prependTo(parent);

		assert.equal(parent.childNodes[1], firstChild._node, "First child does not match");
		assert.equal(parent.childNodes[0], secondChild._node, "Second child does not match");
	});

	//AppendWith method
	it('appendWith() : AppendWith another DOMMNode', function () {
		var firstNode = new DOMMNode('<span>');
		var secondNode = new DOMMNode('<h1>');
		var collection = firstNode.appendWith(secondNode);

		assert.equal((collection instanceof DOMMNodeCollection), true, "Result is not DOMMNodeCollection");
		assert.equal(collection[0], firstNode._node, "First child does not match");
		assert.equal(collection[1], secondNode._node, "Second child does not match");
	});

	it('appendWith() : AppendWith another Native Element', function () {
		var firstNode = new DOMMNode('<span>');
		var secondNode = document.createElement('span');
		var collection = firstNode.appendWith(secondNode);

		assert.equal((collection instanceof DOMMNodeCollection), true, "Result is not DOMMNodeCollection");
		assert.equal(collection[0], firstNode._node, "First child does not match");
		assert.equal(collection[1], secondNode, "Second child does not match");
	});

	it('appendWith() : AppendWith another few DOMMNodes and Native Elements', function () {
		var firstNode = new DOMMNode('<span>');
		var secondNode = new DOMMNode('<h1>');
		var thirdNode = document.createElement('h2');
		var fourthNode = document.createElement('h3');
		var collection = firstNode.appendWith(secondNode, thirdNode, fourthNode);

		assert.equal((collection instanceof DOMMNodeCollection), true, "Result is not DOMMNodeCollection");
		assert.equal(collection[0], firstNode._node, "First child does not match");
		assert.equal(collection[1], secondNode._node, "Second child does not match");
		assert.equal(collection[2], thirdNode, "Third child does not match");
		assert.equal(collection[3], fourthNode, "Fourth child does not match");
	});

	//PrependWith method
	it('prependWith() : PrependWith another DOMMNode', function () {
		var firstNode = new DOMMNode('<span>');
		var secondNode = new DOMMNode('<h1>');
		var collection = firstNode.prependWith(secondNode);

		assert.equal((collection instanceof DOMMNodeCollection), true, "Result is not DOMMNodeCollection");
		assert.equal(collection[1], firstNode._node, "First child does not match");
		assert.equal(collection[0], secondNode._node, "Second child does not match");
	});

	it('prependWith() : PrependWith another Native Element', function () {
		var firstNode = new DOMMNode('<span>');
		var secondNode = document.createElement('span');
		var collection = firstNode.prependWith(secondNode);

		assert.equal((collection instanceof DOMMNodeCollection), true, "Result is not DOMMNodeCollection");
		assert.equal(collection[1], firstNode._node, "First child does not match");
		assert.equal(collection[0], secondNode, "Second child does not match");
	});

	it('prependWith() : PrependWith another few DOMMNodes and Native Elements', function () {
		var firstNode = new DOMMNode('<span>');
		var secondNode = new DOMMNode('<h1>');
		var thirdNode = document.createElement('h2');
		var fourthNode = document.createElement('h3');
		var collection = firstNode.prependWith(secondNode, thirdNode, fourthNode);

		assert.equal((collection instanceof DOMMNodeCollection), true, "Result is not DOMMNodeCollection");
		assert.equal(collection[3], firstNode._node, "First child does not match");
		assert.equal(collection[0], secondNode._node, "Second child does not match");
		assert.equal(collection[1], thirdNode, "Third child does not match");
		assert.equal(collection[2], fourthNode, "Fourth child does not match");
	});

	//InsertChildBefore method
	it('insertChildBefore() : Insert child(DOMMNode) in first position', function () {
		var parent = new DOMMNode('<span>');
		parent.append(document.createElement('div'));
		parent.append(document.createElement('h1'));
		var child = new DOMMNode('<div>');
		parent.insertChildBefore(0, child);

		assert.equal(parent.getChildren()[0], child._node, "Children are not equal");
	});

	it('insertChildBefore() : Insert child(DOMMNode) in before last position', function () {
		var parent = new DOMMNode('<span>');
		parent.append(document.createElement('div'));
		parent.append(document.createElement('h1'));
		var child = new DOMMNode('<div>');
		parent.insertChildBefore(1, child);

		assert.equal(parent.getChildren()[1], child._node, "Children are not equal");
	});

	it('insertChildBefore() : Insert child(DOMMNode) with invalid index', function () {
		var parent = new DOMMNode('<span>');
		parent.append(document.createElement('div'));
		parent.append(document.createElement('h1'));
		var child = new DOMMNode('<div>');
		parent.insertChildBefore(22, child);

		assert.equal(parent.getChildren().length, 2, "Children lenght does not match");
	});

	//InsertChildAfter method
	it('insertChildAfter() : Insert child(DOMMNode) in second position', function () {
		var parent = new DOMMNode('<span>');
		parent.append(document.createElement('div'));
		parent.append(document.createElement('h1'));
		var child = new DOMMNode('<div>');
		parent.insertChildAfter(0, child);

		assert.equal(parent.getChildren().length, 3, "Children lenght does not match");
		assert.equal(parent.getChildren()[1], child._node, "Children are not equal");
	});

	it('insertChildAfter() : Insert child(DOMMNode) in last position', function () {
		var parent = new DOMMNode('<span>');
		parent.append(document.createElement('div'));
		parent.append(document.createElement('h1'));
		var child = new DOMMNode('<div>');
		child.text("blbqblq")
		parent.insertChildAfter(1, child);

		assert.equal(parent.getChildren().length, 3, "Children lenght does not match");
		assert.equal(parent.getChildren()[2], child._node, "Children are not equal");
	});

	it('insertChildAfter() : Insert child(DOMMNode) with invalid index', function () {
		var parent = new DOMMNode('<span>');
		parent.append(document.createElement('div'));
		parent.append(document.createElement('h1'));
		var child = new DOMMNode('<div>');
		parent.insertChildAfter(22, child);

		assert.equal(parent.getChildren().length, 2, "Children lenght does not match");
	});

	//RemoveChild method
	it('removeChild() : Remove existing child', function () {
		var parent = new DOMMNode('<span>');
		var child = new DOMMNode('<div>');
		parent.append(child);
		parent.removeChild(child);

		assert.equal(parent.getChildren().length, 0, "Children lenght does not match");
	});

	it('removeChild() : Remove existing child', function () {
		var parent = new DOMMNode('<span>');
		var firstChild = new DOMMNode('<div>');
		var secondChild = new DOMMNode('<h1>');
		parent.append(firstChild, secondChild);
		parent.removeChild(secondChild);

		assert.equal(parent.getChildren().length, 1, "Children lenght does not match");
		assert.equal(parent.getChildren()[0], firstChild._node, "Remaining child does not match");
	});
	//with index
	it('removeChild() : Remove existing child by reference', function () {
		var parent = new DOMMNode('<span>');
		var firstChild = new DOMMNode('<div>');
		var secondChild = new DOMMNode('<h1>');
		parent.append(firstChild, secondChild);
		parent.removeChild(secondChild);

		assert.equal(parent.getChildren().length, 1, "Children lenght does not match");
		assert.equal(parent.getChildren()[0], firstChild._node, "Remaining child does not match");
	});

	it('removeChild() : Remove existing child at first index', function () {
		var parent = new DOMMNode('<span>');
		var firstChild = new DOMMNode('<div>');
		var secondChild = new DOMMNode('<h1>');
		parent.append(firstChild, secondChild);
		parent.removeChild(0);

		assert.equal(parent.getChildren().length, 1, "Children lenght does not match");
		assert.equal(parent.getChildren()[0], secondChild._node, "Remaining child does not match");
	});

	it('removeChild() : Remove existing child at last index', function () {
		var parent = new DOMMNode('<span>');
		var firstChild = new DOMMNode('<div>');
		var secondChild = new DOMMNode('<h1>');
		parent.append(firstChild, secondChild);
		parent.removeChild(1);

		assert.equal(parent.getChildren().length, 1, "Children lenght does not match");
		assert.equal(parent.getChildren()[0], firstChild._node, "Remaining child does not match");
	});
}
