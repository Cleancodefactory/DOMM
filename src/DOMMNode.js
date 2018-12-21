/*!
 * DOMM - v 1.0.0 2018-06-12
 * Copyright Clean Code Factory cleancodefactory.de
 */

(function () {
	//---------- CREATING AND DESTROYING A DOMMNODE OBJECT section ---------- 
	DOMMNode = function (element) {
		this._node = null; 
		if (!element) return;
		
		if (typeof element == "string"){
			var regex = /^\s*<\s*([a-zA-Z0-9_\-]+)\s*>\s*$/g;
			var pattern = new RegExp(regex);

			if (pattern.test(element)) {
				var elementType = element.replace(regex, "$1");
				this._node = document.createElement(elementType);
			}
		} else if (isProperNode(element)) {
			this._node = element;
		}
	};
	
	DOMMNode.prototype.remove = function (selector) {
		this.detach();

		if (selector){
			var queryResult = DOMM(selector, this._node);

			queryResult.foreach(function() {
				this.remove();
			});
	
			return this;
		}

		var nodeEventProp = this._g_DomDataPropertyName != undefined ? this._g_DomDataPropertyName : "domm_data";

		//We remove the listeners before delete the element
		if (nodeEventProp != undefined && nodeEventProp.length > 0){
			if(this._node[nodeEventProp] != undefined && this._node[nodeEventProp].events != undefined) {
				for (var eventName in this._node[nodeEventProp].capture) {
					this._node.removeEventListener(eventName, ROmniEventHandlerCapture, true);
				}

				for (var eventName in this._node[nodeEventProp].bubble) {
					this._node.removeEventListener(eventName, ROmniEventHandlerBubble, false);
				}
			}
		}
	
		delete this._node[nodeEventProp];
		this.innerHtml(""); //removes the children
		this._node = null;
	};
	
	//CASE 1: Test if this removes the node from the DOM Tree also
	//CASE 2: Test the mothod if there is no parent and the node is not attached
	DOMMNode.prototype.detach = function () {
		var nodeParent = this.getParent();
		if (nodeParent && nodeParent._node) nodeParent._node.removeChild(this._node);
	
		return this;
	};
	
	//---------- QUERIES section ----------	
	
	DOMMNode.prototype.contains = function (element) {
		if (!this._node) return false;
	
		if (element instanceof DOMMNode) element = element._node;
		if (isProperNode(element)) return this._node.contains(element);
	
		return false;
	};
	
	//Consider: What does this nearest do and do we actually need it
	DOMMNode.prototype.select = function (selector, nearest) {
		if (this._node && selector && typeof selector == "string") {
			var queryRes = DOMM(selector, this._node);
						
			if(nearest) {				
				var target__ = this._node;
				var min = 0;
				var nrst = [];
				
				var findMe = function(node_, target_, i) {
					if (!(isProperNode(node_) && isProperNode(target_))) return -1;
					if (node_ === target_){
						return i;
					} else {
						return findMe(node_.parentElement, target_, ++i);
					}
				}
				
				//Explanation: Every time we find lower than min lvl we delete 
				//the old result array and add the elements with the lower lvl.
				//In the end we are left with the elements from the lowest lvl.
				//Need test
				queryRes.foreach(function(ittobj) {
					var currLvl = findMe(this._node, target__, 0);
					if(ittobj.itt == 0) min = currLvl;
					
					if(currLvl === min){
						nrst.push(this)
					}
	
					if(currLvl < min){
						min = currLvl;
						nrst = [];
						nrst.push(this);
					}
				});
	
				return new DOMMNodeCollection(nrst);
			}
			
			return queryRes;
		}
	
		return new DOMMNodeCollection([]);
	};
	
	DOMMNode.prototype.selectNearest= function(selector) {
		return this.select(selector, true);
	};
	
	//---------- CONTENT STRING REPRESENTATION section ----------
	
	DOMMNode.prototype.toString = function () {
		return  this.outerHtml();
	};
	
	DOMMNode.prototype.outerHtml = function () {
		if (!this._node) return undefined;
	
		return this._node.outerHTML;
	};
	
	DOMMNode.prototype.innerHtml = function (htmlMarkup) {
		if (htmlMarkup != undefined) {
			if (!this._node) return this;
			if (typeof htmlMarkup != 'string') return this;
	
			this._node.innerHTML = htmlMarkup;
	
			return this;
		}
	
		if (!this._node) return undefined;
	
		return this._node.innerHTML;
	};
	
	DOMMNode.prototype.text = function(text, returnInnerText) {
		if (text == '' || (text && typeof text === 'string')) {
			if (!this._node) return this;
	
			this._node.textContent = text; //Warning! Removes all the element nodes and replaces them with a single text node.
			return this;
		}
		
		if (!this._node) return undefined;

		if(!returnInnerText || typeof returnInnerText != 'boolean') return this._node.textContent;
		return (returnInnerText == true) ? this._node.innerText : this._node.textContent;
	};
	
	//---------- CHILD NODES MANIPULATION section ---------- 
	
	//private methods
	
	var _attachChild = function (args, isAppend) {
		if (!this._node) return this;
		if (args.length == 0) return this;
	
		var children = DOMM((args.length === 1) ? args[0] : Array.prototype.slice.call(args));
		if (!children || children.length == 0) return this;
		
		if (isAppend == true){
			for(var i = 0; i < children.length; i++) {
				this._node.appendChild(children[i]);
			}
		}else if (isAppend == false){
			for(var i = children.length - 1; i >= 0; i--) {
				this._node.insertBefore(children[i], this._node.childNodes[0]);
			}
		}
	
		return this;
	};
	
	//Attention: Please test what happends when arg is query and DOMMNodeCollection
	var _attachChildTo = function(arg, isAppend){
		if (!this._node) return this;
		if (!arg || typeof isAppend != 'boolean') return this;
	
		if (arg.length == 1) arg = arg[0];
		if (typeof arg === "string") arg = DOMM(arg);
		if (arg instanceof DOMMNodeCollection) {
			return isAppend ? arg.push(this) : arg.unshift(this);
		} 
		if (arg instanceof DOMMNode && arg._node) arg = arg._node;
	
		if (!isProperNode(arg)) return this;

		if (isAppend == true){
			arg.appendChild(this._node);
		}else if (isAppend == false){
			arg.insertBefore(this._node, arg.firstChild);
		}
		
		return this;
	};
	
	var _attachWith = function(args, isAppend){
		if (!this._node) return this;
		if (!args || typeof isAppend != 'boolean') return this;
	
		var newColl = new DOMMNodeCollection([]);
	
		if (isAppend == true) newColl = newColl.push(this);
	
		for (var i = 0; i < args.length; i++) {
			var currNode = args[i];
			if (currNode instanceof DOMMNode) currNode = currNode._node;
			if (isProperNode(currNode)){
				newColl = newColl.push(currNode);
			};
		}
	
		if (isAppend == false) newColl = newColl.push(this);
		
		return newColl;
	};
	
	var _insertChild = function(inputElement, index, isAfter){
		if (!this._node) return this;
		if (!inputElement || typeof isAfter != 'boolean') return this;
		if (inputElement instanceof DOMMNode) inputElement = inputElement._node;
		if (!isProperNode(inputElement)) return this;
		if (!this._node.children) {
			this._node.append(inputElement);
			return;
		}

		if (index < 0 || index > this._node.children.length) return this;
		
		if (isAfter == true){
			var existingElement = (this._node.childNodes[index + 1]) ? this._node.childNodes[index + 1] : this._node.childNodes[this._node.children.length - 1].nextSibling
			this._node.insertBefore(inputElement, existingElement);
		}else if (isAfter == false){
			this._node.insertBefore(inputElement, this._node.childNodes[index]);
		}
	
		return this;
	};
	
	//public methods
	//DOCUMENTATION: This function will return ONLY the children elements
	DOMMNode.prototype.getChildren = function () {
		return (!this._node) ? new DOMMNodeCollection([]) : new DOMMNodeCollection(this._node.children);
	};
	
	DOMMNode.prototype.append = function(){
		return _attachChild.call(this, arguments, true);
	};
	
	DOMMNode.prototype.prepend = function(){
		return _attachChild.call(this, arguments, false);
	};
	
	//CAREFUL: This method clones the DOMMNode!
	//CAREFUL: This method may lead to duplicate elements with same ID if not used carefully
	DOMMNode.prototype.appendTo = function () {
		return _attachChildTo.call(this, arguments, true);
	};
	
	DOMMNode.prototype.prependTo = function () {
		return _attachChildTo.call(this, arguments, false);
	};
	
	//Check the references in the result
	DOMMNode.prototype.appendWith = function(){
		return _attachWith.call(this, arguments, true);
	};
	
	//Check the references in the result
	DOMMNode.prototype.prependWith = function(){
		return _attachWith.call(this, arguments, false);
	};
	
	DOMMNode.prototype.insertChildBefore = function (index, inputElement) {
		return _insertChild.call(this, inputElement, index, false);
	};
	
	DOMMNode.prototype.insertChildAfter = function (index, inputElement) {
		return _insertChild.call(this, inputElement, index, true);
	};
	
	//TEST the behavior or removing children(not childNodes(incl. textNodes))
	DOMMNode.prototype.removeChild = function (child) {
		if (!this._node) return this;
	
		if (child instanceof DOMMNode) child = child._node;
		if (isProperNode(child)) {
			this._node.removeChild(child);
		} else if(!isNaN(arguments[0]) && typeof arguments[0] == 'number'){
			var index = arguments[0]
	
			if(index >= 0 && index < this._node.children.length){
				this._node.removeChild(this._node.children[index]);
			}
		}
	
		return this;
	};
	
	//---------- RELATIVES section ---------- 
	
	DOMMNode.prototype.getPrev = function () {
		if (!this._node) return this;
		return new DOMMNode(this._node.previousElementSibling);
	};
	
	DOMMNode.prototype.getNext = function () {
		if (!this._node) return this;
		return new DOMMNode(this._node.nextElementSibling);
	};
	
	DOMMNode.prototype.getParent = function () {
		if (!this._node) return this;
		return new DOMMNode(this._node.parentElement);
	};
	
	DOMMNode.prototype.getAllParents = function () {
		var parentNode = this.getParent()._node;
		var parentsChain = [];

		while (parentNode) {
			if(parentNode.nodeName == "body" || parentNode == undefined) break;

			parentsChain.push(parentNode);
			parentNode = parentNode.parentElement;
		}
	
		return new DOMMNodeCollection(parentsChain);
	};
	
	DOMMNode.prototype.closestParent = function (selector) {
		if (!this._node) return this;
		if (typeof selector != "string") return this.getParent();
	
		var isMatched;
		var element = this.getParent();
	
		while (element) {
			isMatched = Sizzle.matchesSelector(element, selector);
			if(isMatched) return new DOMMNode(element);

			element = element.parentElement;
		}
	
		return new DOMMNode(element);
	};
	
	//---------- PROPERTIES section ---------- 
	DOMMNode.prototype.properties = function (propName, propValue) {
		if (!this._node) return this;
		if (typeof propName != "string") return this;

		if (arguments.length == 2){ 
			this._node[propName] = propValue;
			
			return this;
		} else if (arguments.length == 1) {
			return this._node[propName];
		}
	};
	
	DOMMNode.prototype.hasProperty = function (propName) {
		return (!this._node) ? false : (!(!this._node[propName]));
	};
	
	//---------- ATTRIBUTES section ---------- 
	//Consider: On missing attribute should we return null instead of undefined ?
	var _getAttributeValue = function (attrName) { 
		if (!this._node) return undefined;
		if (!attrName || (typeof attrName != 'string')) return undefined; 	
		if (!this.hasAttributes(attrName)) return undefined;
		
		var attrValue = this._node.getAttribute(attrName.toLowerCase());
		return (attrValue != null) ? attrValue : undefined;
	};
	
	var _setAttribute = function (key, value) { 
		if (!this._node) return this;
		if (typeof key != "string") return this;
	
		if (key == 'style') {
			this.removeStyles();
			this.attributes("style", value.toString());
		} else {
			this._node.setAttribute(key.toLowerCase(), value);
		}
	
		return this;
	};
	
	DOMMNode.prototype.id = function (value){
		if (arguments.length ==  0) return this.attributes("id");
		if (typeof value != 'string') return this;

		if (value.length == 0) {
			this.removeAttributes("id");
			return this;
		}

		this.attributes("id", value);

		return this;
	};
	
	//Consider what to return when called without arguments (.attributes())
	DOMMNode.prototype.attributes = function (arg) {
		switch(arguments.length){
			case 0:
				if(!this._node) return undefined;
				// return this._node.attributes;

				var objResult = {};
				for (var i = 0; i < this._node.attributes.length; i++) {
					var attr = this._node.attributes[i];
					
					// var newAttrObj = {}
					// newAttrObj[attr.name] = attr.value;
					objResult[attr.name] = attr.value;
					//objResult.push(newAttrObj);
				}

				return objResult;
			case 1:
				if (typeof arg == 'string') {
					return _getAttributeValue.call(this, arg);
				} else if (typeof arg === 'object' && !Array.isArray(arg)) {
					var inputObject = arg;
					var inputObjectKeys = Object.getOwnPropertyNames(inputObject);
		
					for (var i = 0; i < inputObjectKeys.length; i += 1) {
						var currAttr = inputObjectKeys[i];

						_setAttribute.call(this, currAttr, inputObject[currAttr]);
					}
		
					return this;
				}
				break;
			case 2:
				var attrKey = arguments[0];
				var attrValue = arguments[1];
		
				return _setAttribute.call(this, attrKey, attrValue);
		}
	};
	
	//DOCUMENTATION: if multiple attr are to be checked it returns true 
	//ONLY if all of them are there
	DOMMNode.prototype.hasAttributes = function (attr) {
		if (typeof attr != "string" || attr.length == 0) return false;
		if (this._node.hasAttribute(attr.toLowerCase())) return true;
	
		return false;
	};
	
	//TESTS: Remove style attribute with this method
	DOMMNode.prototype.removeAttributes = function (attr) {
		if (!this._node) return this;
		if (typeof attr != "string") return this;
		if (attr == 'style') this._node.setAttribute('style', '');
	
		this._node.removeAttribute(attr.toLowerCase());
	
		return this;
    };

    DOMMNode.prototype.getComputedStyles = function (input) {
        if (!this._node) return this;

        if (arguments.length == 0) return getComputedStyle(this._node);
        if (arguments.length > 0 && typeof input == 'string') {
			if (input.length == 0 || !_isValidStyle.call(this, input)) return undefined;

			return getComputedStyle(this._node)[input];
        }
    };
	
	//---------- CLASSES section ---------- 
	
	//private methods
	
	var _manipClasses = function (argsArr, func) {
		if (!this._node) return this; 
		var args = argsArr[0];
	
		var argsIsArray = (typeof args === 'object' && Array.isArray(args)); //use instanceof
		var classes = (argsIsArray) ? args : argsArr;
	
		if (argsArr.length == 1 && (typeof args == 'string') && !argsIsArray) {
			var classSplitRegex = /\s+/g;
			classes = args.split(classSplitRegex);
		}
	
		var existingClasses = (this._node.className.length != 0) ? this._node.className.split(' ') : [];
	
		for (var i = 0, classesLength = classes.length; i < classesLength; i += 1) {
			var currClass = classes[i];
	
			if ((typeof currClass != "string") || (currClass.trim().length == 0)) continue;
	
			var index = existingClasses.indexOf(currClass);
	
			func(currClass, index, existingClasses, classes);
		}
	
		if (existingClasses.length > 0) {
			this._node.className = existingClasses.sort().join(' ').trim();
		} else {
			this.removeAttributes("class");
		}
	
		return this;
	};
	
	//public methods
	
	DOMMNode.prototype.classes = function (){ 
		if(!this._node) return this;
		
		if (arguments.length == 0){
			var classSplitRegex = /\s+/g;
			return (this.hasAttributes('class')) ? _getAttributeValue.call(this, 'class').split(classSplitRegex).sort() : [];
		}else{
			return _manipClasses.call(this, arguments, function (currClass, index, existingClasses, classes) {
				if (index == -1) {
					existingClasses.push(currClass);
				}
			});
		}
	};
	
	DOMMNode.prototype.toggleClasses = function (args) {
		if(!this._node) return this;
	
		return _manipClasses.call(this, arguments, function (currClass, index, existingClasses, classes) {
			if (index != -1) {
				existingClasses.splice(index, 1);
			} else {
				existingClasses.push(currClass);
			}
		});
	};
	
	DOMMNode.prototype.removeClasses = function () {
		if(!this._node) return this;
	
		if (arguments.length == 0) {
			this.removeAttributes('class');
			return this;
		}
	
		return _manipClasses.call(this, arguments, function (currClass, index, existingClasses, classes) {
			if (index != -1) {
				existingClasses.splice(index, 1);
			}
		});
	};
	
	//DOCUMENTATION: if multiple arguments(classes) are given
	//the function will return true ONLY if all the classes are 
	//contained within the node
	DOMMNode.prototype.hasClasses = function (args) {
		if (!this._node) return this;
		if (arguments.length == 0) {
			return this._node.className.length > 0 ? true : false;
		}
	
		var argsIsArray = (typeof args === 'object' && Array.isArray(args));
		var classes = (argsIsArray) ? args : arguments;
	
		if (arguments.length == 1 && (typeof args == "string") && !argsIsArray) {
			var classSplitRegex = /\s+/g;
			classes = args.split(classSplitRegex);
		}
	
		var existingClasses = (this._node.className.length != 0) ? this._node.className.split(' ') : [];
	
		for (var i = 0; i < classes.length; i += 1) {
			if (existingClasses.indexOf(classes[i]) == -1) return false;
		}
	
		return true;
	};
	
	//---------- STYLES section ---------- 
	
	//private methods
	
	var _isValidStyle = function (inputStyle) {
		return this._node.style[inputStyle.toString()] != undefined;
	};
	
	//public methods
	
	DOMMNode.prototype.styles = function (input) {
		if (!this._node) return this;

		if (arguments.length == 0) {
			var newAttrObj = {};
			for (var i = 0; i < this._node.style.length; i++) {
				var attr = this._node.style[i];
				newAttrObj[attr] = this._node.style[attr];
			}
			return newAttrObj;
		}
		if (arguments.length == 1) {
			if (typeof input === 'object' && !Array.isArray(input)) {
				var argkeys = Object.getOwnPropertyNames(input);
	
				for (var i = 0; i < argkeys.length; i += 1) {
					var styleKey = argkeys[i];
					if (_isValidStyle.call(this, styleKey.toString())) {
						this._node.style[styleKey] = input[styleKey].toString();
					}
				}
			} else if (typeof input == 'string') {
				if (input.length == 0 || !_isValidStyle.call(this, input)) return undefined;
	
				return this._node.style[input];
			} 
		} else if (arguments.length == 2) {
			var key = arguments[0];
			var value = arguments[1].toString();
	
			if (_isValidStyle.call(this, key) && value.length > 0) {
				this._node.style[key] = value;
			}
		}
	
		return this;
	};

	//TODO: Test with array
	DOMMNode.prototype.removeStyles = function (args) {
		if (!this._node) return this; 
		if (arguments.length == 0) {
			this.removeAttributes('style');
		} else if (arguments.length >= 1) {
			if (!this.hasAttributes('style') || _getAttributeValue.call(this, 'style').trim().length == 0) return this;
	
			var arrCheck = (arguments.length == 1 && Array.isArray(args));
			var styles = (!arrCheck) ? arguments : args;
	
			for (var i = 0; i < styles.length; i++) {
				var style = styles[i];
	
				if (typeof style != "string" || !_isValidStyle.call(this, style)) continue; //throw new Error('Invalid style to be removed.');
	
				this._node.style[style] = "";
			}
		}
	
		if(this._node.style.length === 0) this.removeAttributes('style');
	
		return this;
	};
	
	//---------- EQUALS section ---------- 
	
	DOMMNode.prototype.isEqualTo = function (node) {
		node = (node instanceof DOMMNode) ? node._node : node;
	
		if(isProperNode(this._node) && this._node.isEqualNode(node)) return true;
		
		return false;
	};
	
	DOMMNode.prototype.isReferenceOf = function (node) {
		node = (node instanceof DOMMNode) ? node._node : node;
		node = (isProperNode(this._node)) ? node : null;
	
		if(this._node === node) return true;
		
		return false;
	};
	
	//---------- RELATIVES section ---------- 
	
	//public methods
	DOMMNode.prototype.clone = function (deep) {
		if (!this._node) return this;
		if (deep == undefined) deep = true;
		
		return new DOMMNode(this._node.cloneNode(deep));
	};
	
	//-------- new functions ---------
	DOMMNode.prototype.isDummy = function () {
		return !this._node;
	};
	
	DOMMNode.prototype.empty = function () {
		this.innerHtml('');
		return this;
	};
	
	DOMMNode.prototype.getNative = function () {
		return this._node;
	};
	
	// //Question: ????
	// DOMMNode.prototype.getAttributes = function (filt) {
	// 	if (!this._node) return this;

	// 	var a = {};
			
	// 	var reFilt = (filt == null) ? null : new RegExp(filt, "i");
	// 	var matches = null;
	// 	var attrs = this.attributes();
	
	// 	// for(var i in attrs){
	// 	// 	matches = null;
	// 	// 	if (reFilt == null) {
	// 	// 		a[i] = attrs[i];
	// 	// 	} else {
	// 	// 		matches = attrs[i].match(reFilt);
	// 	// 		if (matches != null && matches.length > 0) {
	// 	// 			if (matches[1] == null) {
	// 	// 				a[''] = attrs[i];
	// 	// 			} else {
	// 	// 				a[matches[1]] = attrs[i];
	// 	// 			}
	// 	// 		}
	// 	// 	}
	// 	// }
	// 	for(var i = 0; i < attrs.length; i++) {
	// 		matches = null;
	// 		if (reFilt == null) {
	// 			a[i.name] = attrs[i].value;
	// 		} else {
	// 			matches = attrs[i].name.match(reFilt);
	// 			if (matches != null && matches.length > 0) {
	// 				if (matches[1] == null) {
	// 					a[''] = attrs[i].value;
	// 				} else {
	// 					a[matches[1]] = attrs[i].value;
	// 				}
	// 			}
	// 		}
	// 	}
	
	// 	return a;
	// };
	
	DOMMNode.prototype.properties = function (args) {
		if(!this._node) return this;
		if (arguments.length == 0){
			return this._node;
		} else if (arguments.length == 1) {
			if (typeof args == 'string') {
				return this._node[args];
	
			} else if (typeof args === 'object' && !Array.isArray(args)) { 
				var argsKeys = Object.getOwnPropertyNames(args);
	
				for (var i = 0, argKeysLength = argsKeys.length; i < argKeysLength; i += 1) {
					var currProp = argsKeys[i];
					this._node[currProp] = args[currProp]
				}
	
				return this;
			}
		} else if (arguments.length == 2) { 
			var propKey = arguments[0];
			var propValue = arguments[1];
			
			this._node[propKey] = propValue;
	
			return this;
		}
	};
	
	DOMMNode.prototype.is = function(filter){
		return Sizzle.matchesSelector(this._node, filter);
	};
	
	DOMMNode.prototype.getElementIndex = function(){
		if (!this._node) return -1;
	
		var index = 0;
		var el = this._node;
	
		while (el = el.previousElementSibling) {
			index++; 
		}
		
		return index;
	};

	DOMMNode.prototype.hide = function () {
		if(this._node){
			if(this._node.style.display && this._node.style.display != 'none'){
				this.properties('data-DOMM-display', this._node.style.display);
			} else{
				var compDisp = this._node.style.display;
				if(compDisp != 'none'){
					this.properties('data-DOMM-display', compDisp);
				}
			}
	
			this._node.style.display = 'none';
		}
	
		return this;
	};
	
	DOMMNode.prototype.show = function () {
		if(this._node){
			this._node.style.display = (this.properties('data-DOMM-display')) ? this.properties('data-DOMM-display') : 'block';
			
			if(this.properties('data-DOMM-display')){
				_removeProperty('data-DOMM-display');
			}
	
			// this._node.style.display = 'initial';
			// this._node.style.display = 'block';
		}
	
		return this;
	};

	DOMMNode.prototype.focus = function(){
		if (!this._node) return this;

		this._node.focus();

		return this;
	};

	DOMMNode.prototype.blur = function(){
		if (!this._node) return this;

		this._node.blur();

		return this;
	};
	
	DOMMNode.prototype.scrollTop = function(val){
		if (!this._node) return this;
		if (arguments.length == 0) return this._node.scrollTop;
			
		this._node.scrollTop = val;

		return this;
	};
	
	DOMMNode.prototype.scrollLeft = function(val){
		if (!this._node) return this;
		if (arguments.length == 0) return this._node.scrollLeft;
	
		this._node.scrollLeft = val;

		return this;
	};

	//Important: This function to be reviewed due to possable bugs
    DOMMNode.prototype.offset = function (pos) {
		if (!this._node) return this;
		var computedStyles = getComputedStyle(this._node);
	
		if(arguments.length == 0){
			//M: Sometimes, very very rare, 'computedStyles.width' and 'computedStyles.height' returns value in '%' instead of 'px'(the following two rows might be wrong) - beware!!!
			// var w = (this._node.offsetWidth) ? this._node.offsetWidth : +computedStyles.width.slice(0, computedStyles.width.length - 2);
			// var h = (this._node.offsetHeight) ? this._node.offsetHeight : +computedStyles.height.slice(0, computedStyles.height.length - 2);
	
			return{
				top: this._node.offsetTop,
				left: this._node.offsetLeft,
				width: this._node.offsetWidth,
				height: this._node.offsetHeight,
				x: this._node.offsetLeft,
				y: this._node.offsetTop,
				bottom: this._node.offsetTop + this._node.offsetHeight,
				right: this._node.offsetLeft + this._node.offsetWidth
			}
		} else {
			//if absolute
			var marginTop = computedStyles.marginTop.slice(0, computedStyles.marginTop.length - 2);
			var marginLeft = computedStyles.marginLeft.slice(0, computedStyles.marginLeft.length - 2);
	
			if(pos.y != undefined){
				this._node.style.top = pos.y - marginTop + 'px';
			}
			
			if(pos.x != undefined){
				this._node.style.left = pos.x - marginLeft + 'px';
			}
	
			var paddingLeft = computedStyles.paddingLeft.slice(0, computedStyles.paddingLeft.length - 2);
			var paddingRight = computedStyles.paddingRight.slice(0, computedStyles.paddingRight.length - 2);
			var paddingTop = computedStyles.paddingTop.slice(0, computedStyles.paddingTop.length - 2);
			var paddingBottom = computedStyles.paddingBottom.slice(0, computedStyles.paddingBottom.length - 2);
			var bordergLeft = computedStyles.borderLeftWidth.slice(0, computedStyles.borderLeftWidth.length - 2);
			var bordergRight = computedStyles.borderRightWidth.slice(0, computedStyles.borderRightWidth.length - 2);
			var bordergTop = computedStyles.borderTopWidth.slice(0, computedStyles.borderTopWidth.length - 2);
			var bordergBottom = computedStyles.borderBottomWidth.slice(0, computedStyles.borderBottomWidth.length - 2);
	
			if(computedStyles.boxSizing == 'border-box'){
				if(pos.w){
					this._node.style.width = pos.w + 'px';
				}
	
				if(pos.h){
					this._node.style.height = pos.h + 'px';
				}
			} else {
				if(pos.w){
					this._node.style.width = pos.w - bordergLeft - bordergRight - paddingLeft - paddingRight + 'px';
				}
				
				if(pos.h){
					this._node.style.height = pos.h - bordergTop - bordergBottom - paddingTop - paddingBottom + 'px';
				}
			}
		}
	};
	
	DOMMNode.prototype.client = function (pos) {
		if (!this._node) return this;
		if (arguments.length == 0){
			return{
				top: this._node.clientTop,
				left: this._node.clientLeft,
				width: this._node.clientWidth,
				height: this._node.clientHeight,
				x: this._node.clientTop,
				y: this._node.clientLeft,
				bottom: this._node.clientTop + this._node.clientHeight,
				right: this._node.clientLeft + this._node.clientWidth
			}
		} else {
			var computedStyles = getComputedStyle(this._node);
			var paddingLeft = computedStyles.paddingLeft.slice(0, computedStyles.paddingLeft.length - 2);
			var paddingRight = computedStyles.paddingRight.slice(0, computedStyles.paddingRight.length - 2);
			var paddingTop = computedStyles.paddingTop.slice(0, computedStyles.paddingTop.length - 2);
			var paddingBottom = computedStyles.paddingBottom.slice(0, computedStyles.paddingBottom.length - 2);
			var bordergLeft = computedStyles.borderLeftWidth.slice(0, computedStyles.borderLeftWidth.length - 2);
			var bordergRight = computedStyles.borderRightWidth.slice(0, computedStyles.borderRightWidth.length - 2);
			var bordergTop = computedStyles.borderTopWidth.slice(0, computedStyles.borderTopWidth.length - 2);
			var bordergBottom = computedStyles.borderBottomWidth.slice(0, computedStyles.borderBottomWidth.length - 2);

			//if absolute
			if(computedStyles.boxSizing == 'border-box'){
				this._node.style.width = pos.width + (this._node.offsetWidth - this._node.clientWidth) + 'px';
				this._node.style.height = pos.height + (this._node.offsetHeight - this._node.clientHeight) + 'px';
			} else {
				this._node.style.width = pos.width - bordergLeft - bordergRight + (this._node.offsetWidth - this._node.clientWidth) - paddingLeft - paddingRight + 'px';
				this._node.style.height = pos.height - bordergTop - bordergBottom + (this._node.offsetHeight - this._node.clientHeight) - paddingTop - paddingBottom  + 'px';
			}
		}
	};
	
	//Important: This function to be reviewed and tested
	//Note: return false only if the element is not in the dom tree
	//on parent.style.visibility = 'hidden' the element is CONSIDERED visible
	//and the function return true
	//Is that bug or we want it like that ???
	DOMMNode.prototype.isVisible = function () {
		var el = this._node;
	
		while (el) {
			// if(!el.ownerDocument ||
			// 	(el.style.visibility && el.style.visibility == 'hidden') || 
			// 	(el.style.display && el.style.display == 'none') || 
			// 	(el.style.visibility && el.style.visibility == 'collapse') ||
			// 	(el.style.opacity && el.style.opacity == '0')){
			// 	return false;
			// }
	
			if (el.offsetWidth == 0 && el.offsetHeight == 0) return false;
	
			el = el.parentElement;
		}
	
		return true;
	};

	//-----Additional helper functions-----
	var isProperNode = function(node) {
		if(!node || !(node instanceof Node)) return false;

		var nodeType = node.nodeType;
		return ((nodeType == Node.ELEMENT_NODE) || (nodeType == Node.DOCUMENT_NODE));
	};

	var _removeProperty = function (prop) {
		if (!this._node || typeof prop != "string") return this;
	
		delete this._node[prop];
		if(this._node[prop] != undefined) this._node[prop] = '';
	
		return this;
	};
})();