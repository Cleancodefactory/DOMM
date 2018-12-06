/**
* Provides an inheritance mechanism.
* @protected
* @param {function} Parent constructor.
*/

Function.prototype.inherits = function(superCtor){
    this.prototype = Object.create(superCtor.prototype);
    this.prototype.base = superCtor;
    this.prototype.constructor = this;

    return this;
};

/**
* Extends an object using another object's properties.
* @static
* @param {object} obj An Object instance, on which to add new properties.
* @param {object} source An Object instance, from which to extract the properties.
* @returns {object} Returns the obj with the additional properties added.
*/
Object.Extend = function(obj, source) {
	for (var prop in source) {
	  obj[prop] = Object.Copy(source[prop]);
	}
	
	return obj;
};

/**
* Copies a given object
* @static
* @param obj {Object} The object to be copied.
* @returns Returns a copy of obj.
*/
Object.Copy = function(obj) {
  if (!typeof obj === 'object') return obj;
  return (Array.IsArray(obj)) ? obj.slice() : Object.Extend({}, obj);
};

Object.Clone = function(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}