//#using "/devtools/testing/gear.js"

//#using "/DOMM/DOMM.js"
//#using "/DOMM/DOMMNode.js"
//#using "/DOMM/DOMMNodeCollection.js"
//#using "/DOMM/immutables/ImmutableCollection.js"

var dommNodeCollectionClassesTests = function () {

	//Classes
	//ToggleClasses
	//RemoveClasses
	//HasClasses

	describe('Working with DOMMNodeCollection classes.', function () {

		// function reInitElements() {
		// 	console.log('asdadsd');
		// }
		it('Testing hasClasses', function () {
			var coll = new DOMMNodeCollection();
			var firstNode = new DOMMNode("<div>");
			var secondNode = document.createElement("span");

			coll = coll.push(firstNode);
			coll = coll.push(secondNode)
			coll.classes("test1");

			assert(coll.hasClasses("test1"));
			assert(!coll.hasClasses("test2"));
		});

		it('Adding classes', function () {
			var coll = new DOMMNodeCollection();
			var firstNode = new DOMMNode("<div>");
			var secondNode = document.createElement("span");

			coll = coll.push(firstNode);
			coll = coll.push(secondNode)
			coll.classes("test1 test2");

			assert(coll.get(0).hasClasses("test1 test2"));
			assert(coll.get(1).hasClasses("test1 test2"));
		});

		it('Toggling classes', function () {
			var coll = new DOMMNodeCollection();
			var firstNode = new DOMMNode("<div>");
			var secondNode = document.createElement("span");

			coll = coll.push(firstNode);
			coll = coll.push(secondNode)
			coll.classes("test1 test2");

			assert(coll.get(0).hasClasses("test1 test2"));
			assert(coll.get(1).hasClasses("test1 test2"));

			coll.toggleClasses("test1 test2");

			assert(!coll.get(0).hasClasses("test1 test2"));
			assert(!coll.get(1).hasClasses("test1 test2"));
		});

		it('Remove classes', function () {
			var coll = new DOMMNodeCollection();
			var firstNode = new DOMMNode("<div>");
			var secondNode = document.createElement("span");

			coll = coll.push(firstNode);
			coll = coll.push(secondNode)
			coll.classes("test1 test2");

			coll.removeClasses("test1 test2");

			assert(!coll.get(0).hasClasses("test1 test2"));
			assert(!coll.get(1).hasClasses("test1 test2"));
		});
	});
};