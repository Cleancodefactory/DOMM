var dommNodeChainingTests = function () {
	//Chaining tests to be made
	describe('Testing DOMMNode chaining.', function () {
		it('Creating DOMMNode with classes, styles and id', function () {
			// var node = new DOMMNode('<div>');
			// node.id('unique').classes('btn', 'btn-success').styles();
			var actualObject = new DOMMNode('<div>');
			actualObject.classes('class1').styles('color', 'blue').id('unique');

			assert.equal(actualObject.classes(), 'class1', 'Failed to apply class when chaining');			
			assert.equal(actualObject.styles('color'), 'blue', 'Failed to apply style when chaining');
			assert.equal(actualObject.id(), 'unique', 'Failed to apply id when chaining');
		});
	});
};