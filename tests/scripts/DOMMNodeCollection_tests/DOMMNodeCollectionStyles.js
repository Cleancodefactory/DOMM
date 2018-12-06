var dommNodeCollectionStylesTests = function () {

	//Styles
	//RemoveStyles	

	//Add Styles to the collection
	it('styles(): add valid style to DOMMNodeCollection', function () {
		var firstStyleKey = "color";
		var firstStyleValue = "blue";

		var firstChild = new DOMMNode("<div>");
		var secondChild = new DOMMNode("<span>");
		var collection = new DOMMNodeCollection([firstChild, secondChild]);


		collection.styles(firstStyleKey, firstStyleValue);

		collection.foreach(function(){
			assert.equal(this.styles(firstStyleKey), firstStyleValue, "Failed to add a style.");
		})
	});

	it('styles(): add invalid style to DOMMNode', function () {
		var firstStyleKey = "colorrrrr";
		var firstStyleValue = "blueeeee";

		var firstChild = new DOMMNode("<div>");
		var secondChild = new DOMMNode("<span>");
		var collection = new DOMMNodeCollection([firstChild, secondChild]);


		collection.styles(firstStyleKey, firstStyleValue);

		collection.foreach(function(){
			assert.equal(this.styles(firstStyleKey), undefined, "Failed to add a style.");
		})
	});

	it('styles(): add valid and invalid style to DOMMNode', function () {
		var firstStyleKey = "color";
		var firstStyleValue = "blue";
		var secondStyleKey = "colorrrrrr";
		var secondStyleValue = "redddddd";

		var firstChild = new DOMMNode("<div>");
		var secondChild = new DOMMNode("<span>");
		var collection = new DOMMNodeCollection([firstChild, secondChild]);

		var resultObj = {};
		resultObj[firstStyleKey] = firstStyleValue

		collection.styles(firstStyleKey, firstStyleValue);
		collection.styles(secondStyleKey, secondStyleValue);

		collection.foreach(function(){
			assert.equal(this.getNative().style.colorrrrrr, undefined, "Failed to exclude unexisting style property using object");
			assert.equal(this.getNative().style.color, "blue", "Failed to add a style using object.");
		})
	});

	it('styles(): add(object) valid style to DOMMNode', function () {
		var firstStyleKey = "color";
		var firstStyleValue = "blue";

		var firstChild = new DOMMNode("<div>");
		var secondChild = new DOMMNode("<span>");
		var collection = new DOMMNodeCollection([firstChild, secondChild]);

		var inputObj = {}
		inputObj[firstStyleKey] = firstStyleValue;
		var resultObj = {};
		resultObj[firstStyleKey] = firstStyleValue

		collection.styles(inputObj);

		collection.foreach(function(){
			assert.equal(this.getNative().style.color, "blue", "Failed to add a style using object.");
		})



		// var actualObj = new DOMMNode('<div>');
		// var inputObj = {}
		// inputObj[firstStyleKey] = firstStyleValue;
		// actualObj.styles(inputObj);
		// var styles = actualObj.styles();
		// var resultObj = {};
		// resultObj[firstStyleKey] = firstStyleValue

		// assert.equal(JSON.stringify(styles), JSON.stringify(resultObj), "Failed with adding 1 style with object");
	});

	it('styles(): add(with object) valid and invalid style to DOMMNode', function () {
		var firstStyleKey = "color";
		var firstStyleValue = "blue";
		var secondStyleKey = "colorrrrrr";
		var secondStyleValue = "redddddd";

		var firstChild = new DOMMNode("<div>");
		var secondChild = new DOMMNode("<span>");
		var collection = new DOMMNodeCollection([firstChild, secondChild]);

		var inputObj = {}
		inputObj[firstStyleKey] = firstStyleValue;
		inputObj[secondStyleKey] = secondStyleValue;
		var resultObj = {};
		resultObj[firstStyleKey] = firstStyleValue

		collection.styles(inputObj);

		collection.foreach(function(){
			assert.equal(this.getNative().style.colorrrrrr, undefined, "Failed to exclude unexisting style property using object");
			assert.equal(this.getNative().style.color, "blue", "Failed to add a style using object.");
		})


	});

	//Remove styles
	it('removeStyles(): Remove single existing style in DOMMNode.', function () {
		var firstStyleKey = "background-color";
		var firstStyleValue = "blue";

		var firstChild = new DOMMNode("<div>");
		var secondChild = new DOMMNode("<span>");
		var collection = new DOMMNodeCollection([firstChild, secondChild]);

		collection.styles(firstStyleKey, firstStyleValue);
		collection.removeStyles(firstStyleKey);

		collection.foreach(function(){
			assert.equal(this._node.style[firstStyleKey], "", "Failed to remove single style.");
		})
	});

	it('removeStyles(): Remove many existing styles in DOMMNode.', function () {
		var firstStyleKey = "background-color";
		var firstStyleValue = "blue";
		var secondStyleKey = "color";
		var secondStyleValue = "red";
		var thirdStyleKey = 'font-weight';
		var thirdStyleValue = 'bold';

		var firstChild = new DOMMNode("<div>");
		var secondChild = new DOMMNode("<span>");
		var collection = new DOMMNodeCollection([firstChild, secondChild]);

		collection.styles(firstStyleKey, firstStyleValue);
		collection.styles(secondStyleKey, secondStyleValue);
		collection.styles(thirdStyleKey, thirdStyleValue);
		collection.removeStyles(firstStyleKey, secondStyleKey, thirdStyleKey);

		collection.foreach(function(){
			assert.equal(this._node.style[firstStyleKey], "", "Failed to remove multiple styles.");
			assert.equal(this._node.style[secondStyleKey], "", "Failed to remove multiple styles.");
			assert.equal(this._node.style[thirdStyleKey], "", "Failed to remove multiple styles.");
		})
	});

	it('removeStyles(): Remove many existing styles in DOMMNode (with array input)', function () {
		var firstStyleKey = "background-color";
		var firstStyleValue = "blue";
		var secondStyleKey = "color";
		var secondStyleValue = "red";
		var thirdStyleKey = 'font-weight';
		var thirdStyleValue = 'bold';

		var firstChild = new DOMMNode("<div>");
		var secondChild = new DOMMNode("<span>");
		var collection = new DOMMNodeCollection([firstChild, secondChild]);

		collection.styles(firstStyleKey, firstStyleValue);
		collection.styles(secondStyleKey, secondStyleValue);
		collection.styles(thirdStyleKey, thirdStyleValue);
		collection.removeStyles([firstStyleKey, secondStyleKey, thirdStyleKey]);

		collection.foreach(function(){
			assert.equal(this._node.style[firstStyleKey], "", "Failed to remove multiple styles.");
			assert.equal(this._node.style[secondStyleKey], "", "Failed to remove multiple styles.");
			assert.equal(this._node.style[thirdStyleKey], "", "Failed to remove multiple styles.");
		})
	});
};