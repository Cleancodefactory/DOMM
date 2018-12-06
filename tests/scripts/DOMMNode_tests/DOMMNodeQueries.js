//#using "/devtools/testing/gear.js"

//#using "/DOMM/DOMM.js"
//#using "/DOMM/DOMMNode.js"
//#using "/DOMM/immutables/ImmutableCollection.js"

var dommNodeQueriesTests = function () {

	describe('contains() tests.', function () {
		var mainDiv = new DOMMNode("<div>");
		var innerDiv = new DOMMNode("<div>");
		it('Should return true with DOMMNode', function () {
			mainDiv.append(innerDiv);
			assert(mainDiv.contains(innerDiv));
		});
		it('Should return true with Node', function () {
			var mainDiv = new DOMMNode("<div>");
			var innerDiv = document.createElement("div");
			mainDiv.append(innerDiv);
			assert(mainDiv.contains(innerDiv));
		});
	});
	describe('select() tests.', function () {
		it('Should return true if the element is found', function () {	
			var mainDiv = new DOMMNode("<div>");
			var innerDiv = new DOMMNode("<div>").classes("selector");		
			mainDiv.append(innerDiv);
			assert(mainDiv.select(".selector")[0].nodeName == "DIV");
		});
		it('Should return true if the elements count = 2', function () {
			var mainDiv = new DOMMNode("<div>");
			var innerDiv = new DOMMNode("<div>").classes("selector");
			var innerDiv2 = new DOMMNode("<div>").classes("selector");
			var innerDiv3 = new DOMMNode("<div>").classes("selector123");
			mainDiv.append(innerDiv);
			mainDiv.append(innerDiv2);
			var res = mainDiv.select(".selector");
			assert.equal(res.length, 2, "");
		});
		it('Should return true if span element is found', function () {
			var mainDiv = new DOMMNode("<div>");
			var innerDiv = new DOMMNode("<div>").classes("selector");
			var innerDiv2 = new DOMMNode("<div>").classes("selector");
			var innerSpan = new DOMMNode("<span>").classes("spanClass");
			innerDiv.append(innerSpan);
			mainDiv.append(innerDiv);
			mainDiv.append(innerDiv2);			
			var res = mainDiv.select("span.spanClass");
			assert.equal(res[0].nodeName, "SPAN", "The node is not selected properly");
		});
		it('Should return true if span element with specific class is found', function () {
			var mainDiv = new DOMMNode("<div>");
			var innerDiv = new DOMMNode("<div>").classes("selector");
			var innerDiv2 = new DOMMNode("<div>").classes("selector");
			var innerSpan = new DOMMNode("<span>").classes("spanClass");
			innerDiv.append(innerSpan);
			mainDiv.append(innerDiv);
			mainDiv.append(innerDiv2);			
			var res = mainDiv.select("span.spanClass");
			assert.equal(res[0].nodeName, "SPAN", "The node is not selected properly");
		});
	});
}		
