var assert = chai.assert;

describe('Testing DOMMNode', function(){

 	describe('Testing DOMMnode Create and Remove Object.', dommNodeCreateRemoveTests);
 	describe('Testomg DOMMNode Queries Function', dommNodeQueriesTests);
    describe('Testing DOMMNode String Representation Functions', dommNodeStringRepesentationTests);
 	describe('Testing DOMMNode Properties Functions', dommNodePropertiesTests);
 	describe('Testing DOMMNode Attributes Functions.', dommNodeAttributesTests);
 	describe('Testing DOMMNode Classes Functions', dommNodeClassesTests);
 	describe('Testing DOMMNode Styles Functions', dommNodeStylesTests);
 	describe('Testing DOMMNode Child Nodes Manipulation Functions', dommNodeChildManipTests);
 	describe('Testing DOMMNode Equals Functions', dommNodeEqualsTests);
 	describe('Testing DOMMNode Relatives Functions', dommNodeRelativesTests);
	describe('DOMMNode Chaining tests', dommNodeChainingTests);
 });

describe('Testing DOMMNodeCollection', function(){
	describe('Testing DOMMNodeCollection Classes Functions', dommNodeCollectionClassesTests);
  	describe('Testing DOMMNodeCollection Styles Functions', dommNodeCollectionStylesTests);
	describe('Testing DOMMNodeCollection Collection Specific Functions', dommNodeCollectionSpecificTests);
	describe('Testing DOMMNodeCollection Create Remove Functions', dommNodeCollectionCreateRemoveTests);
  	describe('Testing DOMMNodeCollection Insertion Functions', dommNodeCollectionInsertionTests);
  	describe('Testing DOMMNodeCollection Others Functions', dommNodeCollectionOthers);
});

describe('Testing ImmutableBase and ImmutableCollection', function(){
	describe('ImmutableBase tests', immutableBaseTests);
 	describe('ImmutableCollection tests', immutableCollectionTests);
});

// window.addEventListener('load', 
	// function() { 
		// describe('Testing Events', function(){
			// describe('Testing Event Functions on DOMMNode', eventsTests);
		// });
// }, false);




//sandbox();
