//#using "/devtools/testing/gear.js"

//#using "../ImmutableCollection.js"

var immutableCollectionTests= function(){
	
	var coll= new ImmutableCollection([1,2,3,4]);
	var expected= "[1,2,3,4]";
	
	it('Testing the toString() method.', function () {
		assert.equal(coll.toString(), expected);
	});
	
	it('Testing the length() method.', function(){
		var expected= 4;
		assert.equal(coll.length, expected);
	});
	
	it('Testing the get(index) method.', function(){
		var expected= 3;
		assert.equal(coll.get(2), expected);
	});
	
	it('Testing the first() method.', function(){
		var expected= 1;
		assert.equal(coll.first(), expected);
	});
	
	describe('Testing the immutability of an ImmutableCollection object.', function() {
		
		it('Testing the pop() method.', function(){
			coll.pop();	
			assert.equal(coll.toString(), expected);
		});	
		
		it('Testing the push() method.', function(){
			coll.push(5);
			assert.equal(coll.toString(), expected);
		});	
	});
};
