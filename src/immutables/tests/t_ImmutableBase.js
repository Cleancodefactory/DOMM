//#using "/devtools/testing/gear.js"

//#using "../ImmutableBase.js"

var immutableBaseTests= function(){
	
	describe('Testing the static IsImmutable() method.', function(){
		
		it('An instance of the ImmutableBase class is immutable.', function (){					
			assert.equal(ImmutableBase.IsImmutable(new ImmutableBase()), true);		
		});
		
		it('An normal obj is not immutable.', function (){	
		
			assert.notEqual(ImmutableBase.IsImmutable({prop:1}), true);
		});
	});
};