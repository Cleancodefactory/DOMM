var dommNodeAttributesTests = function () {
		//id function
	it('id: return existing id', function () {
		var idValue = 'unique';
		var actual = new DOMMNode('<div>');
		actual.id(idValue);

		assert.equal(actual.id(), idValue, "Failed! The returned id value is not correct.");
	});

	it('id: return non-existing id', function () {
		var actual = new DOMMNode('<div>');

		assert.equal(actual.id(), undefined, "Failed! The returned id value is not correct.");
	});

	//Check the actual behavior
	it('id: remove (set to "" - id("")) existing id', function () {
		var idValue = 'unique';
		var actual = new DOMMNode('<div>');
		actual.id(idValue);
		actual.id('');

		assert.equal(actual.id(), undefined, "Failed! The returned id value is not correct.");
	});

	//Check the actual behavior
	it('id: remove non-existing id', function () {
		var actual = new DOMMNode('<div>');
		actual.id('');

		assert.equal(actual._node.id, '', "Failed! The returned id value is not correct.");
	});

	//-----attributes function-----

	//Add attributes
	it('attributes: add new attribute', function () {
		var actual = new DOMMNode('<div>');
		actual.attributes("class", "button");

		assert.equal(actual._node.className, 'button', "Failed! The returned attributes are not correct.");
	});

	it('attributes: add few new attributes with object', function () {
		var actual = new DOMMNode('<div>');
		actual.attributes({"id": "login-form", "class": "for-droids", "title": "Admin is (Si)3PO"});

		assert.equal(actual._node.id, 'login-form', "Failed! The returned attribute is not correct.");
		assert.equal(actual._node.className, 'for-droids', "Failed! The returned attribute is not correct.");
		assert.equal(actual._node.title, 'Admin is (Si)3PO', "Failed! The returned attribute is not correct.");
	});

	//Get attributes
	it('attributes: return all when there are few / also checks for result alphabetic order', function () {
		var actual = new DOMMNode('<div>');
		actual.attributes("class", "button");
		actual.attributes("title", "No Title");
		actual.id("form")
		var currentAttributes = actual.attributes();

		assert.equal(currentAttributes['class'], "button", "Failed! The returned attributes are not correct.");
		assert.equal(currentAttributes['id'], "form", "Failed! The returned attributes are not correct.");
		assert.equal(currentAttributes['title'], "No Title", "Failed! The returned attributes are not correct.");
		
	});

	it('attributes: return current attribute', function () {
		var actual = new DOMMNode('<div>');
		actual.attributes("class", "button");

		assert.equal(actual.attributes("class"), "button", "Failed! The returned attribute is not correct");
	});

	it('attributes: return all when there are none', function () {
		var actual = new DOMMNode('<div>');

		assert.equal(JSON.stringify(actual.attributes()), JSON.stringify({}), "Failed! The returned value is not correct.");
	});

	//HasAttribute
	it('hasAttribute: checks if has existing attribute', function () {
		var styleAttrKey = 'class';
		var styleAttrValue = 'button';
		var actual = new DOMMNode('<div>');
		actual.attributes(styleAttrKey, styleAttrValue);

		assert.equal(actual.hasAttributes(styleAttrKey), true, "The attribute actually does not exist.");
	});

	it('hasAttribute: checks if has non-existing attribute', function () {
		var actual = new DOMMNode('<div>');

		assert.equal(actual.hasAttributes('class'), false, "It does exist...");
	});


	//Remove
	it('removeAttribute: remove one attribute from new DOMMNode.', function () {
		var styleAttrKey = 'class';
		var styleAttrValue = 'button';
		var actual = new DOMMNode('<div>');
		actual.attributes(styleAttrKey, styleAttrValue);
		actual.removeAttributes(styleAttrKey);

		assert.equal(actual.hasAttributes(styleAttrKey), false, "Failed to remove an attribute.");
	});

	it('removeAttribute: removes few attributes from new DOMMNode.', function () {
		var styleAttrKey = 'class';
		var styleAttrValue = 'background';
		var customAttrKey = 'title';
		var customAttrValue = 'some title';
		var actual = new DOMMNode('<div>');
		actual.attributes(styleAttrKey, styleAttrValue);
		actual.attributes(customAttrKey, customAttrValue);
		actual.removeAttributes(styleAttrKey);
		actual.removeAttributes(customAttrKey);

		assert.equal(actual.hasAttributes(styleAttrKey), false, "Failed remove many attributes.");
		assert.equal(actual.hasAttributes(customAttrKey), false, "Failed remove many attributes.");
	});

	it('getAttributes: gets attributes from the DOMMNode object.', function () {

		var actual = new DOMMNode('<div>').id('testId').styles("background", "red").hide();
		var attrs = {id: "testId", style: "background: red; display: none;"}

		assert.equal(actual.attributes()['id'], attrs.id, "The id is not the expected value.");
		assert.equal(actual.attributes()['style'], attrs.style, "The styles are not the expected.");
	});
};