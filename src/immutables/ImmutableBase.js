/*!
 * DOMM - v 1.0.0 2018-06-12
 * Copyright Clean Code Factory cleancodefactory.de
 */

/**
* The base class for all immutables.
* @constructor
* @abstract
*/
var ImmutableBase = function(){
	this._isImmutable = true;
};

/**
* Checks whether an object is immutable.
* @static
* @public
* @param {object} obj The target object.
* @returns {boolean} Returns a boolean indicating whether obj is immutable.
*/
ImmutableBase.IsImmutable = function(obj){
	return (obj.hasOwnProperty("_isImmutable")) ? obj._isImmutable : false;
};

/**
* Clones the current Immutable object.
* @public
* @returns {ImmutableBase} Returns a copy of the original ImmutableBase object.
*/
ImmutableBase.prototype.clone = function(){
	return Object.Copy(this);
};