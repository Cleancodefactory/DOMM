//#using "/devtools/testing/gear.js"

//#using "/DOMM/DOMM.js"
//#using "/DOMM/DOMMNode.js"
//#using "/DOMM/immutables/ImmutableCollection.js"

var dommNodeEqualsTests = function () {
	it('isEqualTo(): Checks current DOMMNode with other DOMMNodes if they are equal(by html representation)', function () {
		var firstNode = new DOMMNode("<p>");
		var secondNode = new DOMMNode('<p>');
		var thirdNode = new DOMMNode('<p>');

		firstNode.append(document.createElement('div'));
		firstNode.append(document.createElement('span'));
		secondNode.append(document.createElement('div'));
		secondNode.append(document.createElement('span'));
		thirdNode.append(document.createElement('span'));

		assert.equal(firstNode.isEqualTo(secondNode), true, "The nodes are not equal.");
		assert.equal(firstNode.isEqualTo(thirdNode), false, "The nodes shoud not be equal");
	});

	it('isEqualTo(): Checks current DOMMNode with Native Node if they are equal(by html representation)', function () {
		var firstNode = new DOMMNode("<p>");
		var secondNode = document.createElement('p');
		var thirdNode = document.createElement('p');

		firstNode.append(document.createElement('div'));
		firstNode.append(document.createElement('span'));
		secondNode.appendChild(document.createElement('div'));
		secondNode.appendChild(document.createElement('span'));
		thirdNode.appendChild(document.createElement('span'));

		assert.equal(firstNode.isEqualTo(secondNode), true, "The nodes are not equal.");
		assert.equal(firstNode.isEqualTo(thirdNode), false, "The nodes shoud not be equal");
	});

	//isReferenceOf method
	it('isReferenceOf(): Checks current DOMMNode with other DOMMNodes if they are equal(by reference)', function () {
		var firstNode = new DOMMNode("<p>");
		var secondNode = new DOMMNode('<p>');
		var thirdNode = new DOMMNode('<p>');
		
		firstNode.append(secondNode);
		firstNode.append(thirdNode);

		assert.equal(secondNode.isReferenceOf(firstNode.getChildren().get(0)), true, "The nodes are not equal.");
		assert.equal(secondNode.isReferenceOf(firstNode.getChildren()[0]), true, "The nodes are not equal.");
		assert.equal(secondNode.isReferenceOf(firstNode.getChildren().get(1)), false, "The nodes are not equal.");
		assert.equal(thirdNode.isReferenceOf(firstNode.getChildren().get(1)), true, "The nodes are not equal.");
	});

	//WTF
	it('isReferenceOf(): Checks current DOMMNode with Native Node if they are equal(by reference)', function () {
		var firstNode = new DOMMNode("<p>");
		var secondNode = document.createElement('p');
		firstNode.append(secondNode);

		assert.equal(secondNode === (firstNode.getChildren()[0]), true, "The nodes are not equal.");
	});
}