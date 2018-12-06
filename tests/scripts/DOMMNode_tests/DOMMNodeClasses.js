//#using "/devtools/testing/gear.js"

//#using "/DOMM/DOMM.js"
//#using "/DOMM/DOMMNode.js"
//#using "/DOMM/immutables/ImmutableCollection.js"

var dommNodeClassesTests = function () {

	it('Adding classes to new DOMMNode', function () {
		var dommDivStr = '<div>';
		var divStr = 'div';
		var dommNode = new DOMMNode('<div>');
		var expected = document.createElement('div');
		var firstClass = 'firstClass';
		var secondClass = 'secondClass';
		var thirdClass = 'thirdClass'
		var multiClassString = 'newClass1 newClass2';
		var arr = [firstClass, secondClass, thirdClass];

		dommNode.classes(firstClass);
		expected.setAttribute('class', firstClass);

		assert.equal(dommNode._node.outerHTML, expected.outerHTML, "DOMMNode fails to add himself a single class.");

		dommNode = new DOMMNode(dommDivStr);
		expected = document.createElement(divStr);

		dommNode.classes(multiClassString);
		expected.setAttribute('class', multiClassString);

		assert.equal(dommNode._node.outerHTML, expected.outerHTML, "Failed to Add many classes from string");

		dommNode = new DOMMNode(dommDivStr);
		expected = document.createElement(divStr);

		dommNode.classes(firstClass, secondClass, thirdClass);
		expected.setAttribute('class', firstClass + ' ' + secondClass + ' ' + thirdClass);

		assert.equal(dommNode._node.outerHTML, expected.outerHTML, "Failed to Add many classes (string)");

		dommNode = new DOMMNode(dommDivStr);
		expected = document.createElement(divStr);

		dommNode.classes(arr);
		expected.setAttribute('class', firstClass + ' ' + secondClass + ' ' + thirdClass);

		assert.equal(dommNode._node.outerHTML, expected.outerHTML, "Failed to Add many classes (array)");
	});

	// it('Set on no arguments should throw error.', function(){
	// 	var dommNode= new DOMMNode("<div>");

	// 	assert.throws(function() { dommNode.setClasses() }, Error, null, 'Failed to throw error for set class with no arguments.');
	// });

	// it('Set on one non string argument should throw error.', function(){
	// 	var dommNode= new DOMMNode("<div>");

	// 	assert.throws(function(){dommNode.setClasses({obj: 'adsasd'})}, Error, null, "Failed to throw an error for non string argument.");
	// });

	// it('Set on multiple non string arguments should throw error.', function(){
	// 	var dommNode= new DOMMNode("<div>");

	// 	assert.throws(function(){dommNode.setClasses('class1', [])}, Error, null, "Failed to throw an error for non string argument.");
	// });

	it('Removing classes from a new DOMMNode.', function () {
		var firstClassToBeRemoved = 'beRemoved1';
		var secondClassToBeRemoved = 'beRemoved2';
		var classToStay = "MayTheForceBeWithYou"; //nice
		var allClassesStr = classToStay + ' ' + firstClassToBeRemoved + ' ' + secondClassToBeRemoved;
		var twoClassesStr = classToStay + ' ' + firstClassToBeRemoved;
		var classesToBeRemoved = firstClassToBeRemoved + ' ' + secondClassToBeRemoved;
		var classArray = [firstClassToBeRemoved, secondClassToBeRemoved];

		var dommNode = new DOMMNode("<div>");
		dommNode.classes(twoClassesStr);
		dommNode.removeClasses(firstClassToBeRemoved);

		var expected = document.createElement('div');
		expected.setAttribute('class', classToStay);

		assert.equal(dommNode._node.outerHTML, expected.outerHTML, "Failed to remove single class");

		dommNode = new DOMMNode("<div>");
		dommNode.classes(twoClassesStr);
		dommNode.removeClasses(classesToBeRemoved);
		expected = document.createElement('div');
		expected.setAttribute('class', classToStay); //check this case

		assert.equal(dommNode._node.outerHTML, expected.outerHTML, "Failed to remove many classes(string) from DOMMNode");

		dommNode = new DOMMNode("<div>");
		dommNode.classes(allClassesStr);
		dommNode.removeClasses(classesToBeRemoved);
		expected = document.createElement('div');
		expected.setAttribute('class', classToStay);

		assert.equal(dommNode._node.outerHTML, expected.outerHTML, "Failed to remove many classes from DOMMNode");

		dommNode = new DOMMNode("<div>");
		dommNode.classes(allClassesStr);
		dommNode.removeClasses(classArray);

		expected = document.createElement('div');
		expected.setAttribute('class', classToStay);

		assert.equal(dommNode._node.outerHTML, expected.outerHTML, "Failed to remove many classes(array) from DOMMNode");

		dommNode = new DOMMNode("<div>");
		dommNode.classes(allClassesStr);
		dommNode.removeClasses();

		expected = document.createElement('div');

		assert.equal(dommNode._node.outerHTML, expected.outerHTML, "Failed to remove all classes from DOMMNode");
	});

	//TODO: implement removeclasses with array of class objects

	/*it('Remove on multiple arguments with non string argument should throw error.', function(){
		var dommNode= new DOMMNode("<div>");

		assert.throws(function(){dommNode.removeClasses('class1', [])}, Error, null, "Failed to throw an error for non string argument.");
	});*/

	it('Checking for classes in a new DOMMNode.', function () {
		var firstClass = 'newClass0';
		var secondClass = 'newClass1';
		var classesStr = firstClass + ' ' + secondClass;
		var arr = [firstClass, secondClass];
		var dommNode = new DOMMNode("<div>");

		dommNode.classes(firstClass);

		assert.equal(dommNode.hasClasses(firstClass), true, "Failed to check if DOMMNode has a specific class.");

		dommNode = new DOMMNode("<div>");
		dommNode.classes(classesStr);

		assert.equal(dommNode.hasClasses(classesStr), true, "Failed to check if DOMMNode has a specific list of classes(string).");

		dommNode = new DOMMNode("<div>");
		dommNode.classes(firstClass, secondClass);

		assert.equal(dommNode.hasClasses(firstClass, secondClass), true, "Failed to check if DOMMNode has a specific list of classes(two strings).");


		var dommNode = new DOMMNode("<div>");
		dommNode.classes(arr);

		assert.equal(dommNode.hasClasses(arr), true, "Failed to check if DOMMNode has a specific class.");
	});

	// 	assert.equal(dommNode.hasClasses(arr), true, "Failed to check if DOMMNode has a specific class.");
	// });

	/*it('HasClass on no arguments throw error.', function(){
		var dommNode= new DOMMNode("<div>");

		assert.throws(function(){dommNode.hasClasses()}, Error, null, "Failed to throw an error for input arguments.");
	});*/

	/*it('HasClass on multiple arguments with non string argument should throw error.', function(){
		var dommNode= new DOMMNode("<div>");

		assert.throws(function(){dommNode.hasClasses('class1', [])}, Error, null, "Failed to throw an error for non string argument.");
	});*/

	it('Get classes from a new DOMMNode.', function () {
		var classesNames = 'firstClass secondClass';
		var dommNode = new DOMMNode("<div>");
		dommNode.classes(classesNames);

		var expected = ['firstClass', 'secondClass'];

		assert.deepEqual(dommNode.classes(), expected, "Failed to retrieve the DOMMNode classes.");

		dommNode = new DOMMNode("<div>");

		assert.deepEqual(dommNode.classes(), [], "Failed to retrieve no classes default value.");
	});

	it('Toggle classes to a new DOMMNode.', function () {
		var singleClassName = 'toggledClass';
		var singleClassName2 = 'toggledClass2';
		var multipleClasses = 'toggledClass1 toggledClass2';
		var classNamesArr = [singleClassName, singleClassName2];
		var dommNode = new DOMMNode("<div>");

		dommNode.toggleClasses(singleClassName);

		assert.equal(dommNode.hasClasses(singleClassName), true, "Failed to toggle (add) class.");

		dommNode = new DOMMNode("<div>");
		dommNode.classes(singleClassName);
		dommNode.toggleClasses(singleClassName);

		assert.equal(dommNode.hasClasses(singleClassName), false, "Failed to toggle (remove) class.");

		dommNode = new DOMMNode("<div>");
		dommNode.toggleClasses(multipleClasses);

		assert.equal(dommNode.hasClasses(multipleClasses), true, "Failed to toggle (add) classes.");

		var dommNode = new DOMMNode("<div>");
		dommNode.toggleClasses(classNamesArr);

		assert.equal(dommNode.hasClasses(classNamesArr), true, "Failed to toggle classes (add, array).");

		dommNode = new DOMMNode("<div>");

		dommNode.classes(singleClassName);
		dommNode.toggleClasses(singleClassName, singleClassName2);

		assert.equal(dommNode.hasClasses(singleClassName), false, "Failed to toggle classes(remove preset class).");
		assert.equal(dommNode.hasClasses(singleClassName2), true, "Failed to toggle classes(add class).");

		dommNode = new DOMMNode("<div>");
		dommNode.classes(singleClassName);
		dommNode.toggleClasses(classNamesArr);

		assert.equal(dommNode.hasClasses(singleClassName), false, "Failed to toggle classes(remove, array).");
		assert.equal(dommNode.hasClasses(singleClassName2), true, "Failed to toggle classes.(add, array)");
		assert.equal(dommNode.hasClasses(classNamesArr), false, "Failed to toggle classes.");
		dommNode.toggleClasses(singleClassName);
		assert.equal(dommNode.hasClasses(classNamesArr), true, "Failed to toggle classes.");
	});
};