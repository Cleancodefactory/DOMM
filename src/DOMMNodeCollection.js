(function () {
//CREATING A DOMMNODECOLLECTION section
DOMMNodeCollection = function (inputNodeCollection) {
	ImmutableCollection.call(this);
	var nodeCollection = inputNodeCollection;

	if (arguments.length > 1) nodeCollection = arguments;
	if (nodeCollection instanceof Object && nodeCollection.length){
		var index = 0;
		for (var itt = 0; itt < nodeCollection.length; itt++) {
			var element = nodeCollection[itt];
			
			if (element instanceof DOMMNode) element = element._node;
			if (element == undefined || !isProperNode(element)) continue;

			this[index] = element;
			index++;
		}

		this.length = index;
	}
};

DOMMNodeCollection.inherits(ImmutableCollection);

//COLLECTION SPECIFIC METHODS section

DOMMNodeCollection.prototype.push = function (item) {
	if (!item) return this;
	if (!isProperNode(item) && !isProperDOMMNode(item)) return this;
	item = (item instanceof DOMMNode) ? item._node : item;
	
	return (ImmutableCollection.prototype.push.call(this, item));
};

DOMMNodeCollection.prototype.unshift = function (item) {
	if (!item) return this;
	if (!isProperNode(item) && !isProperDOMMNode(item)) return this;
	item = (item instanceof DOMMNode) ? item._node : item;
	
	return (ImmutableCollection.prototype.unshift.call(this, item));
};

DOMMNodeCollection.prototype.get = function (index) {
	return new DOMMNode(this[index]);
};


//COLLECTION CLASS MANIPULATION section

//TEST: WITH MULTIPLE ARGUMENTS!!!!!
DOMMNodeCollection.prototype.classes = function (args) {
	if (arguments.length > 0) {
		this.foreach(arguments, function (ittobj, args_) {
			this.classes.apply(this, args_);
		});
	}

	return this;
};

//TEST: WITH MULTIPLE ARGUMENTS!!!!!
DOMMNodeCollection.prototype.toggleClasses = function (args) {
	this.foreach(arguments, function (ittobj, args_) { 
		this.toggleClasses.apply(this, args_); 
	});
	return this;
};

DOMMNodeCollection.prototype.removeClasses = function (args) {
	this.foreach(arguments, function (ittobj, args_) { this.removeClasses.apply(this, args_); });
	return this;
};

DOMMNodeCollection.prototype.hasClasses = function (args) {
	var res = false;

	this.foreach(arguments, function (ittobj, args_) {
		res = this.hasClasses.apply(this, args_);
		if (res == false) return;
	});

	return res;
};


//COLLECTION STYLES MANIPULATION section

DOMMNodeCollection.prototype.styles = function (args) {
	if (arguments.length> 0){
		this.foreach(arguments, function (ittobj, args_) {
			this.styles.apply(this, args_);
		});	
	}        
};

DOMMNodeCollection.prototype.removeStyles = function (args) {
	this.foreach(arguments, function (ittobj, args_) {
		this.removeStyles.apply(this, args_);
	});
	
	return this;
};

//COLLECTION INSERTION section

DOMMNodeCollection.prototype.concat = function(dommStructure) {
	if(dommStructure == null) return this;
	var res = new DOMMNodeCollection([]);
	if(dommStructure instanceof DOMMNodeCollection) {
		res = this.concat(dommStructure);
	} else if(dommStructure instanceof DOMMNode){
		res = this.push(dommStructure);
	} else {
		res = this;
	}
	return res;
}

// DOMMNodeCollection.prototype.appendTo = function (target) {
// 	if (!target) return this;
// 	if (isProperNode(target)) target = new DOMMNode(target);
// 	if (target instanceof DOMMNodeCollection || isProperDOMMNode(target)){
// 		//  this.foreach(function(){
// 		// 	target = this.appendTo(target);
// 		// });
// 		target = this.concat(target);
// 	}

// 	return target;
// };

// DOMMNodeCollection.prototype.prependTo = function (target) {
// 	if (!target) return this;
// 	if (isProperNode(target)) target = new DOMMNode(target);
// 	if (target instanceof DOMMNodeCollection || isProperDOMMNode(target)){
// 		this.foreach(function(ittobj){
// 			ittobj.coll.get(ittobj.ritt).prependTo(target);
// 		});
// 	}

// 	return target;
// };

DOMMNodeCollection.prototype.remove = function (/*no args, use filter if needed - comment for the users*/) {        
   this.foreach(function(){
	   this.remove();
   });

   return null;
};

DOMMNodeCollection.prototype.detach = function (/*no args, use filter if needed - comment for the users*/) {
	this.foreach(function(){
	   this.detach();
	});

	return this;
};

//Problem should occur here if we use this
//function on DOMMNodeCollection
DOMMNodeCollection.prototype.insertAfter = function (target) {
	if (!target) return this;

	var currTarget = target;

	if (typeof currTarget === 'string') currTarget = DOMM(currTarget);
	if (currTarget instanceof DOMMNodeCollection) currTarget = currTarget.get(0);
	
	if (isProperNode(currTarget) || isProperDOMMNode(currTarget)){
		currTarget = (currTarget instanceof DOMMNode) ? currTarget : new DOMMNode(currTarget);
		var parent = currTarget.getParent();

		if(!parent) return this;
		var index;

		for (var i = 0; i < parent._node.children.length; i++) {
			if(currTarget.isEqualTo(parent._node.children[i])
			&& currTarget.isReferenceOf(parent._node.children[i])){
				index = i;
				break;
			}
		}

		if(index == undefined) return this;

		this.foreach(function(){
			parent.insertChildAfter(index, this);
			index++;
		})
	}

	return this;
};

DOMMNodeCollection.prototype.insertBefore = function (target) {
	if (!target) return this;
	var currTarget = target;

	if (typeof currTarget === 'string') currTarget = DOMM(currTarget);
	if (currTarget instanceof DOMMNodeCollection) currTarget = currTarget.get(0);
	
	if (isProperNode(currTarget) || isProperDOMMNode(currTarget)){

		currTarget = (currTarget instanceof DOMMNode) ? currTarget : new DOMMNode(currTarget);
		var parent = currTarget.getParent();

		if (!parent) return this;
		var index;

		for (var i = 0; i < parent._node.children.length; i++) {
			if (currTarget.isEqualTo(parent._node.children[i])
			&& currTarget.isReferenceOf(parent._node.children[i])){
				index = i;
				break;
			}
		}

		this.foreach(function(ittobj){
			parent.insertChildBefore(index, ittobj.coll[ittobj.ritt]);
		})
	}

	return this;
};

DOMMNodeCollection.prototype.clone = function (deep) {
	var resultArr = [];
	this.foreach(function(){
		resultArr.push(this.clone(deep));
	});      

	return new DOMMNodeCollection(resultArr);
};


//When events are done!
//THIS SHOULD WORK THOUGH DOMMNode ???
// DOMMNodeCollection.prototype.cloneWithEvents = function (deep) {
//     //It is working, neverthless I do not think this is most elegant solution
//     //ToDo with slice
// };

//string and func regimes
DOMMNodeCollection.prototype.filter = function (selector) {
	//over collection -> use foreach of ImmutableCollection
	var res = [];
	if (typeof selector === "string") {
		res = Sizzle.matches(selector, this);            
	} else if (typeof selector == "function") {
		this.foreach(function () { if (selector(this)) res.push(this); });
	}

	return new DOMMNodeCollection(res);
};

DOMMNodeCollection.prototype.outerHtml = function () {
	var res = "";
	this.foreach(function () {
		res += this.outerHtml();
	});

	return res;
};

DOMMNodeCollection.prototype.toString = function(){
	var res = "";

	this.foreach(function(ittobj){
		if (ittobj.itt > 0) res += ", ";
		res += this.toString();
	})

	return "[" + res + "]";
};

DOMMNodeCollection.prototype.toArray = function(){
	var res = [];

	for (var i = 0; i < this.length; i++) {
		res.push(this[i]);
	}

	return res;
};

DOMMNodeCollection.prototype.isEmpty = function(){
	return this.length == 0;
}

DOMMNodeCollection.prototype.has = function (selector) {
	//over collection -> use foreach of ImmutableCollection
	var res = [];
	if (typeof selector === "object") {
		for (let i = 0, len = this.length; i < len; i++) {
			var el = this[i];

			if (selector instanceof DOMMNode) selector = selector._node;
			if (el.contains(selector)) res.push(el);	
		}
	} else if (typeof selector == "string") {
		for (let i = 0, len = this.length; i < len; i++) {
			var el = this[i];

			if (el.select(selector).length > 0) res.push(el);	
		}
	}

	return new DOMMNodeCollection(res);
};

//-----Private helper functions-----
var isProperNode = function(node) {
	if (!node || !(node instanceof Node)) return false;

	var nodeType = node.nodeType;
	return ((nodeType == Node.ELEMENT_NODE) || (nodeType == Node.DOCUMENT_NODE));
};

var isProperDOMMNode = function(node){
	if (!node) return false;

	return node instanceof DOMMNode && node._node != undefined;
};
})();
