// #using "/devtools/testing/gear.js"

// #using "/DOMM/DOMM.js"
// #using "/DOMM/DOMMNode.js"
// #using "/DOMM/DOMMNodeCollection.js"
// #using "/DOMM/immutables/ImmutableCollection.js"

var dommNodeCollectionOthers = function () {

	//AsHtml
	//Filter
	//Clone

	describe('Testing asHtml(), filter() and clone()', function () {

		//ToString method
		it('asHtml(): Testing asHtml() method', function () {
			var coll = new DOMMNodeCollection();
			var firstNode = new DOMMNode("<div>");
			var secondNode = new DOMMNode("<div>");
			coll = coll.push(firstNode);
			coll = coll.push(secondNode);

			var native = document.createElement("div");
			var native1 = document.createElement("div");
			var native2 = document.createElement("div");
			native.innerHTML += native1.outerHTML + native2.outerHTML;


			assert.equal(coll.outerHtml(), native.innerHTML, "Failed: both strings are not equal.");
		});
		it('filter(): Testing filter() method', function () {
			var coll = new DOMMNodeCollection();
			var firstNode = new DOMMNode("<div>").classes("test1");
			var secondNode = new DOMMNode("<div>").classes("test2");
			var thirdNode = new DOMMNode("<div>").classes("test2");
			
			coll = coll.push(firstNode);
			coll = coll.push(secondNode);
			coll = coll.push(thirdNode);

			assert.equal(coll.filter(".test1").length, 1, "Failed: filter does not return one element.");
			assert.equal(coll.filter(".test2").length, 2, "Failed: filter does not return two elements.");
			assert.equal(coll.filter("div").length, 3, "Failed: filter does not return three elements.");
		});

		it('clone(): Testing clone() method', function () {
			var coll = new DOMMNodeCollection();
			var firstNode = new DOMMNode("<div>").classes("test1");
			var secondNode = new DOMMNode("<div>").classes("test2");
			var thirdNode = new DOMMNode("<div>").classes("test2");
			
			coll = coll.push(firstNode);
			coll = coll.push(secondNode);
			coll = coll.push(thirdNode);

			var cloning = coll.clone(true);

			assert.equal(coll.outerHtml(), cloning.outerHtml(), "Failed: cloning is not the same as the original.");

		});
	})
};