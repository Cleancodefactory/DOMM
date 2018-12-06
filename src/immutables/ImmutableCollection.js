/*!
 * DOMM - v 1.0.0 2018-06-12
 * Copyright Clean Code Factory cleancodefactory.de
 */


/**
* An implementation of a immutable collection structure. Wrapper for a native javascript Array.
* @constructor
* @extends ImmutableBase
* @param {array} arr A native javascript array.
* @returns {ImmutableCollection} An instance of the ImmutableCollection class.
*/
var ImmutableCollection= function(arr){
	ImmutableBase.call(this);

	var isArr = Array.isArray(arr)
	if(!isArr) arr = [];

	for(var itt= 0; itt< arr.length; itt++){
		this[itt] = arr[itt];
	}

	this.length = arr.length;
};

ImmutableCollection.inherits(ImmutableBase);

ImmutableCollection.prototype.slice = Array.prototype.slice;
ImmutableCollection.prototype.join = Array.prototype.join;

/**
* Appends a new item to the end of the collection.
* @public
* @param {object} obj Item to be appended.
* @returns {ImmutableCollection} A copy of the collection, containing the new item!
*/
ImmutableCollection.prototype.push = function (obj) {
	var clonned_arr = this.slice();
	clonned_arr.push(obj);

	return new this.constructor(clonned_arr);
};

/**
* Prepends a new item to the end of the collection.
* @public
* @param {object} obj Item to be prepended.
* @returns {ImmutableCollection} A copy of the collection, containing the new item!
*/
ImmutableCollection.prototype.unshift = function(obj){
	var clonned_arr = this.slice();
	clonned_arr.unshift(obj);

	return new this.constructor(clonned_arr);
};

/**
* Removes an item from the collection.
* @public
* @param {integer} index The index of the item to be removed.
* @returns {ImmutableCollection} A copy of the collection, without the removed item!
*/
ImmutableCollection.prototype.removeAt = function(index){
	if(!this.hasIndex(index)) return this;
	var clonned_arr= this.slice();
	clonned_arr.splice(index, 1);

	return new this.constructor(clonned_arr);
};


/**
* Peeks an item from the top of the collection.
* @public
* @returns {object} The poped item.
*/
ImmutableCollection.prototype.peek = function(){
	return this.last();
};

/**
* Returns a clone of the collection, without the top element.
* @public
* @returns {ImmutableCollection} A cloned collection.
*/
ImmutableCollection.prototype.pop = function(){
	var clonned_arr= this.slice();
	clonned_arr.pop();

	return new this.constructor(clonned_arr);
};

/**
* Checks whether the item at a specific index is not undefined.
* @public
* @param {integer} index The index of the item to be checked.
* @returns {boolean} "True", if the checked item is not undefined!
*/
ImmutableCollection.prototype.hasIndex= function(index)
{
	return (this[index] != undefined);
};

/**
* Gets an item from the collection.
* @public
* @param {integer} index The item index.
* @returns {object} An item from the collection.
*/
ImmutableCollection.prototype.get = function(index){
	//...
	return this[index];
};

/**
* Gets the first item from the collection.
* @public
* @returns {object} The first item of the collection.
*/
ImmutableCollection.prototype.first = function(){
	return this.get(0);
};

/**
* Gets the last item from the collection.
* @public
* @returns {object} The last item of the collection.
*/
ImmutableCollection.prototype.last = function(){
	return this.get(this.length-1);
};

//...maybe add more array methods

//TODO Test
/**
* Loops though each item in the collection, applying some transformation to it.
* @public
* @param args {arguments} Additional arguments, that will be passed to the "func" callback.
* @param {callback} func A function which is called on each item. The first argument of the call is an object, containing the following:{itterational_index {integer}, collection_length {integer}, collection_reference {ImmutableCollection},  reverse_itterational_index (collection_length - 1 - itterational_index) {integer} }.
The additional arguments ("args") are passed after the object (argument #0).
*/
ImmutableCollection.prototype.foreach= function(){
	var funcArgs = [];
	var func;

	if(arguments.length >= 1 && ((typeof arguments[arguments.length-1] == "function"))){
		funcArgs = [].slice.call(arguments);
		func= funcArgs.pop();
	}
	else return;

	funcArgs.unshift({itt: 0, length: this.length, coll: this, ritt: this.length-1});

	for(; funcArgs[0].itt < funcArgs[0].length; funcArgs[0].itt += 1){
		if (funcArgs.length ==1) func.apply(this.get(funcArgs[0].itt), [funcArgs[0]]);
		else func.apply(this.get(funcArgs[0].itt), funcArgs);
		funcArgs[0].ritt--;
	}
};

//TODO Test
/**
* Appends another collection to the end of this one.
* @public
* @param {Array | ImmutableCollection} right The collection, which should be appended to the end of the current one.
* @returns {ImmutableCollection} A new collection consisting of both the current one and the appended.
*/
ImmutableCollection.prototype.concat = function(right){

	right = (right instanceof ImmutableCollection || right instanceof Array) ? right.slice(): undefined;
	if(!right) return this;

	var clonned_arr = this.slice();
	return new this.constructor(clonned_arr.concat(right));
};

/**
* @public
* @returns {string} A new empty collection.
*/
ImmutableCollection.prototype.empty = function(){
	//fake empty
	return new this.constructor([]);
};

/**
* An override of the toString() method.
* @public
* @returns {string} A concatenated version of the wrapped array in the format: [el1, el2, el3, ...].
*/
ImmutableCollection.prototype.toString = function(){
	return "[" + this.join() + "]";
};
