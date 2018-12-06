// #using "/devtools/testing/gear.js"

// #using "/DOMM/DOMM.js"
// #using "/DOMM/DOMMNode.js"
// #using "/DOMM/immutables/ImmutableCollection.js"

var dommNodeStringRepesentationTests = function () {
	//ToString method
	it('toString(): Testing toString() method', function () {
		var dommNode = new DOMMNode('<div>');
		var expected = document.createElement('div');

		assert.equal(dommNode._node.toString(), expected.toString(), "Failed: both strings are not equal.");
	})

	it('toString(): Testing toString() method with _node == null', function () {
		var dommNode = new DOMMNode('<div>');
		dommNode._node = null;

		assert.equal(dommNode.toString(), undefined, "Failed: both strings are not equal.");
	})

	//AsHtml method
	it('outerHtml(): Testing outerHtml() method', function(){
		var dommNode = new DOMMNode('<div>');
		var child = new DOMMNode('<span>');
		dommNode.append(child);
		var expected = document.createElement('div');
		expected.appendChild(document.createElement('span'));

		assert.equal(dommNode.outerHtml(), expected.outerHTML, "Failed: both strings are not equal!!!");
	})

	//Html method
	it('innerHtml(): Testing innerHtml() method', function(){
		var dommNode = new DOMMNode('<div>');
		dommNode.append(new DOMMNode('<div>'));
		var expected = document.createElement('div');
		expected.appendChild(document.createElement('div'));

		assert.equal(dommNode.innerHtml(), expected.innerHTML, "Failed: both strings are not equal!!!");
	})

	it('innerHtml(): Testing innerHtml(markUp) input method', function(){
		var dommNode = new DOMMNode('<div>');
		dommNode.append(new DOMMNode('<div>'));
		var expected = document.createElement('div');
		expected.appendChild(document.createElement('div'));

		assert.equal(dommNode.innerHtml(), expected.innerHTML, "Failed: both strings are not equal!!!");
	})

	//Text method
	it('text(): Testing text() method', function(){
		var dommNode = new DOMMNode('<div>');
		dommNode._node.textContent = 'Tuuum Tuuuum Tu tu tu tuuum tuuuum(Star Wars)';

		assert.equal(dommNode.text(), 'Tuuum Tuuuum Tu tu tu tuuum tuuuum(Star Wars)', "Failed: both strings are not equal!!!");
	})

	it('text(): Testing text(text) input method', function(){
		var dommNode = new DOMMNode('<div>');
		dommNode.append(new DOMMNode('<div>'));
		dommNode.text('Tuuum Tuuuum Tu tu tu tuuum tuuuum(Star Wars)');
		var expected = document.createElement('div');
		expected.textContent = 'Tuuum Tuuuum Tu tu tu tuuum tuuuum(Star Wars)'

		assert.equal(dommNode.text(), expected.innerHTML, "Failed: both strings are not equal!!!");
	})
};