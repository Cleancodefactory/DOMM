var DOMM = function(selector){   
    var _validateNodeType = function(node) {
		if (!node || !(node instanceof Node)) return false;

		return ((node.nodeType == Node.ELEMENT_NODE) || (node.nodeType == Node.DOCUMENT_NODE));
    };
    
	var _select = function(selector, node){
		if(!selector || !(typeof selector == "string")) return new DOMMNodeCollection([]);
		
		var matchedNode = _validateNodeType(node);
		var root = (node && matchedNode) ? node : document;	
		var res = [];
		
		res = Sizzle(selector, root); 
		return new DOMMNodeCollection(res);
	};

	if (!selector) return new DOMMNodeCollection([]);
	
	if (arguments.length > 1) {
		var selector = arguments[0];
		var node = arguments[1];

		return _select(selector, node);
	};
 
	if (selector instanceof DOMMNodeCollection) return selector;
	if (selector instanceof DOMMNode) return new DOMMNodeCollection([selector._node]);
	if (selector instanceof Node) return new DOMMNodeCollection([selector]);
	if (selector instanceof Object && selector.length != undefined) return new DOMMNodeCollection(selector); //Why we did it like that ?
	if (!typeof selector == "string" || selector.length == 0) return new DOMMNodeCollection([]);
	
	//try to create a single NodeElement from the collectiona
	var newNode = new DOMMNode(selector);
	var nodeColl = new DOMMNodeCollection([]);
	var resColl = (newNode._node) ? nodeColl.push(newNode._node) : nodeColl;

	//try to create from markup
	if (resColl.length == 0) {
		//We create and meterialize the inner children
		var dummyParent = document.createElement("div");	
		dummyParent.innerHTML = (selector).trim();

		var docFragment = document.createDocumentFragment();

		while(dummyParent.childNodes.length > 0) {
			docFragment.appendChild(dummyParent.childNodes[0]);
		};

		var resColl = new DOMMNodeCollection([]);
		
		for(var i = 0; i < docFragment.childNodes.length; i++) {
			resColl = resColl.push(new DOMMNode(docFragment.childNodes[i]));
		};
	};
	
	if (resColl.length > 0) return resColl;

	var queryRes = _select(selector);
	resColl = new DOMMNodeCollection(queryRes);
	
	return resColl;
};

//-----DOMM aliases-----
var DOMQuery = DOMM;
var $$ = DOMM;
var _ = DOMM;

// validateNodeType
// select -> query