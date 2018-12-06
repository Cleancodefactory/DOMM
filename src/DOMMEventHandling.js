/*!
 * DOMM - v 1.0.0 2018-06-12
 * Copyright Clean Code Factory cleancodefactory.de
 */

/**
 * Future Considerations/TODOs/Questions:
 * -----
 * 	1. The _g_DomDataPropertyName = domm_data property should be created somewhere else, the important prop for this section is domm_data.events (Misho)
 *  2. Make other possible triggers (ask Michael what is needed (if needed))
 * -----
 * 
 * Usage of the events interface
 * -----
 * Capture:
 * <DOMMNode>.events(<'eventName'>, <'eventName1'>, <'eventName2'>).capture.add(<handler>, <priority(bool, number)>).data({a: 1, b:2}).once()
 * 
 * Bubble:
 * <DOMMNode>.events(<'eventName'>, <'eventName1'>, <'eventName2'>, ...).add(<handler>, <priority(bool, number)>).data({a: 1, b:2}).once()
 * <DOMMNode>.events(<'eventName'>, <'eventName1'>, <'eventName2'>, ...).bubble.add(<handler>, <priority(bool, number)>).data({a: 1, b:2}).once()
 * 
 * What's beneath:
 * 
 * [Registrator(eventName1, eventName2 ...)]<capture/bubble>(optional, by default bubble)<add/remove/trigger>[Registration(optional)]<data/once>
 * 
 * Classes:
 * 1. Registrator - Registers the event init information and provides with interface for further add/remove/trigger functionality.
 * 2. Registration - Used to add additional information/functionality to the event/event handlers
 * 3. Invocator - Used in the global Omni handler to manage the invocation of all the already set handlers
 * 4. Cookie - Unique idenfifier for every handler information object
 * 
 * Structure of the domm_data.events property
 * -----
 * 1. What is the purpose of domm_data.events -> to hold the information for the handlers for the certain event
 * 2. Structure
 * domm_data.events = {
 * 		"eventName": {
 * 			capture: [
 * 				//All handlers information below
 * 				{ 
 * 					handler: <function ref>,
 * 					priority: <bool | number> (false by default),
 * 					once: <bool> (false by default),
 * 					cookie: new Cookie(),
 * 					data: <whatever you want> (null by default) -> this data will be the 2nd argument in the current handler
 * 				},...
 * 			],
 * 			bubble: [
 * 				{ 
 * 					handler: <function ref>,
 * 					priority: <bool | number> (false by default),
 * 					once: <bool> (false by default),
 * 					cookie: new Cookie(),
 * 					data: <whatever you want> (null by default) -> this data will be the 2nd argument in the current handler
 * 				},...
 * 			]
 * 		}
 * }
 */

/**
 * Creating polyfil for CustomEvent for the older browsers
 */
(function () {
	if (typeof window.CustomEvent === "function") return;
  
	function CustomEvent (event, params) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	};
  
	CustomEvent.prototype = window.Event.prototype;
  
	window.CustomEvent = CustomEvent;
})();

(function () {
	/**
	 *	Because of our global handlers structure
	 *	we need to override the stopImmediatePropagation
	 *	so we can know when the is immediately stopped. 
	 *	Event class does not provide property for that by default
     *
	 *	Argument is set to true to work always for now. 
	 *	Later implementation of switch on/off will be needed I guess (Ask Michael)
	 */
	if(true){
		var stopImmProp = Event.prototype.stopImmediatePropagation;
		Event.prototype.stopImmediatePropagation = function(){
			this.isImmediatePropagationStopped = true;
			stopImmProp.call(this, arguments);
		}
	}

	/**
	 *	Attaching the events logic to the DOMMNode
	 */
	DOMMNode.prototype.events = function(eventName1, eventName2, eventName3){
		if (this._node == null || this._node == undefined) throw 'Events cannot be added/removed/executed on non existing node';
		if ((this._node.nodeType != Node.ELEMENT_NODE) && (this._node.nodeType != Node.DOCUMENT_NODE)) {
			throw 'Events cannot be added/removed/executed on node with different nodeType than element.';
		};

		var registratorArgs = [];
		registratorArgs.push(this._node);
	
		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			
			if(typeof arg != 'string' || arg.length == 0) continue;
	
			registratorArgs.push(arg);
		}

		return new Registrator(registratorArgs);
	}

	/**
	 * Name of the property in the node with the events information
	 */
	DOMMNode.prototype._g_DomDataPropertyName = "domm_data";

	/**
	 * Helper function which ensures that domm_data property exists and return it
	 */
	function RDomData(dom) {
		//temp hardcoded
		// if (dom[this._g_DomDataPropertyName] == null) {
			// dom[this._g_DomDataPropertyName] = {};
		// }
		if (dom["domm_data"] == null) {
			dom["domm_data"] = {};
		}

		return dom["domm_data"];
	};

	/**
	 * Helper function which ensures that domm_data.events property exists and return it
	 */
	function RDomDataEvents(dom) {
		var domNodeObject = RDomData(dom);
		if (domNodeObject.events == null) {
			domNodeObject.events = {
				capture: { },
				bubble: { }
			};
		}

		return domNodeObject.events;
	};

	/**
	 *	This cookie generator is used to be set as unique identificator for every DOMMNode event handler information object
	 *	It is the same idea as id in html
	 */
	var _g_cookiecounter = 0;
	function Cookie() {
		var cookie = new Date().getTime() + "" + _g_cookiecounter ++;
		if (_g_cookiecounter > 9007199254740991) _g_cookiecounter = 0;

		return cookie;
	};

	/**
	 *	Global handler function for the capture phase of the event
	 *	that invokes all added handlers for this event for the current node
	 *	
	 *	Note: Notice that the handler is the same for all events
	 *	however the event argument information is always different
	 *	and by that information we know which target handlers to invoke
	 */
	function OmniEventHandlerCapture(event) {
		var rawnode = event.currentTarget; 
		var invocator = new Invocator(rawnode);

		invocator.handleEvent(event, true);
	};

	/**
	 *	Global handler function for the capture phase of the event
	 *	that invokes all added handlers for this event for the current node
	 *	
	 *	Note: Notice that the handler is the same for all events
	 *	however the event argument information is always different
	 *	and by that information we know which target handlers to invoke
	 */
	function OmniEventHandlerBubble(event) {
		var rawnode = event.currentTarget; 
		var invocator = new Invocator(rawnode);

		invocator.handleEvent(event, false);
	};

	/**
	 * Register the current event(s) information and provides interface for further add/remove/trigger functionality
	 */
	var Registrator = function Registrator(argsAsArray) {
		var dom = argsAsArray[0];

		this.$dom = dom;
		this.eventnames = [];

		for (var i = 1; i < argsAsArray.length; i++){
			this.eventnames.push(argsAsArray[i]);
		}

		this.events = RDomDataEvents(dom);
		var that = this;

		this.capture = {
			add: function(handler, priority) {
				return addHandler(handler, priority, true)
			},
			remove: function(cookie) {
				removeHandler(cookie, true);
			},
		}

		this.bubble = {
			add: function(handler, priority) {
				return addHandler(handler, priority, false)
			},
			remove: function(cookie) {
				removeHandler(cookie, false);
			},
		}

		this.add = function(handler, priority) {
			return addHandler(handler, priority, false);
		}

		this.remove = function(cookie) {
			removeHandler(cookie, false);
		}

		this.trigger = function(input) {
			if(input instanceof Event){
				var event = input;
				that.$dom.dispatchEvent(event);
			}else{
				var eventParams = input;
				triggerEvents(eventParams, false);
			}
		}

		//The actual functions
		var addHandler = function(handler, priority, isCapture) {
			var registrations = [];

			//Register the event handler information
			for (var i = 0; i < that.eventnames.length; i++) {
				var registration = that.$registerHandlerInformation(that.eventnames[i], handler, priority, isCapture);
				registrations.push(registration);
			}

			return new Registration(registrations);
		};

		var removeHandler = function(cookie, isCapture){
			for (var i = 0; i < that.eventnames.length; i++) {
				that.$removeHandlerInformation(that.eventnames[i], cookie, isCapture);
			}
		};

		var triggerEvents = function(params) {
			for (var i = 0; i < that.eventnames.length; i++) {
				var currentEvent = new CustomEvent(that.eventnames[i], params);

				that.$dom.dispatchEvent(currentEvent);
			}
		};

		return {
			capture: this.capture,
			bubble: this.bubble,
			add: this.add,
			remove: this.remove,
			trigger: this.trigger
		}
	}

	Registrator.$registerHandlerInformation = function (eventHandlersInfo, newHandlerInfo){
		for (var i = 0; i < eventHandlersInfo.length; i++) {
			if (Registrator.$compareRegs(eventHandlersInfo[i], newHandlerInfo) < 0) {
				eventHandlersInfo.splice(i, 0, newHandlerInfo);
				return;
			}
		}

		eventHandlersInfo.push(newHandlerInfo);
	};

	/**
	 * Register the handler's information object stored in domm_data.events.<eventName>.<eventPhase>
	 */
	Registrator.prototype.$registerHandlerInformation = function(eventName, handler, priority, capture) {
		var events = (capture == true) ? this.events.capture : this.events.bubble;

		var cookie = Cookie();
		var result = {
			handler: handler,
			priority: priority,
			once: false,
			cookie: cookie,
			data: null
		};

		if (result.priority == undefined) result.priority = false;

		// Create branch if missing
		if (events[eventName] == null || events[eventName] == undefined) {
			events[eventName] = [];

			if (capture == true){
				this.$dom.addEventListener(eventName, OmniEventHandlerCapture, true);
			}else{
				this.$dom.addEventListener(eventName, OmniEventHandlerBubble, false);
			}
		}

		// Done that way because the registration is more than just push - it requires comparison inorder to find the right place according to the priority
		Registrator.$registerHandlerInformation(events[eventName], result);

		return result; 
	};

	/**
	 * Remove the handler's information object from the domm_data.events.<eventName>.<eventPhase>
	 */
	Registrator.prototype.$removeHandlerInformation = function(eventName, cookie, capture) {
		var events = (capture) ? this.events.capture : this.events.bubble;

		if (cookie && typeof cookie == 'string'){
			for (var i = 0; i < events[eventName].length; i++) {
				var handlerInfo = events[eventName][i];

				if (handlerInfo.cookie == cookie){
					events[eventName].splice(i, 1);
	
					break;
				}
			}
		} else if(!cookie){
			events[eventName].splice(0, this.registrations.length);
		}
		
		if (events[eventName].length == 0){
			if (capture == true){
				this.$dom.removeEventListener(eventName, OmniEventHandlerCapture, true);
			} else {
				this.$dom.removeEventListener(eventName, OmniEventHandlerBubble, false);
			}

			delete events[eventName];
		}
	};

	/**
	 *	The comparator for the handlers order
	 */
	Registrator.$compareRegs = function(regA, regB) {
		var regAPriority = Registrator.$parsePriority(regA.priority);
		var regBPriority = Registrator.$parsePriority(regB.priority);
		
		if (typeof regAPriority == 'boolean' && regAPriority == true) return 1;
		if (typeof regBPriority == 'boolean' && regBPriority == true) return -1;
		if (typeof regAPriority == 'boolean' && typeof regAPriority != 'boolean') return -1;
		if (typeof regBPriority == 'boolean' && typeof regBPriority != 'boolean') return 1;

		return regAPriority >= regBPriority ? -1 : 1;
	};

	/**
	 *	Helper comparator function
	 *	Makes sure that every priority have type (bool or number)
	 */
	Registrator.$parsePriority = function(priority) {
		if (priority == undefined || priority == null) return false;
		if (typeof priority == 'string'){
			if (priority == 'true' || priority == 'false') return (priority == 'true');
			if (!isNaN(Number(priority))) return Number(priority);
		} else if(typeof priority == 'boolean' || typeof priority == 'number'){
			return priority;
		}

		return false;
	};

	/**
	 * This class is used after Registrator class and provides additional functionality to the Registrator
	 */
	var Registration = function Registration (arrRegistrations) {
		this.registrations = arrRegistrations;

		if (this.registrations == null) {
			this.registrations = [];
		}
	};

	/**
	 * Make the event handler being invoked only once, after it is removed;
	 */
	Registration.prototype.once = function(isOnce) {
		var isHandlerOnceInvokedOnly = (isOnce == "true" || isOnce == true || isOnce == undefined) ? true : false;

		for (var i = 0;i < this.registrations.length;i++) {
			this.registrations[i].once = isHandlerOnceInvokedOnly;
		}
		
		return this;
	};

	/**
	 * Provides additional data to the event handler
	 */
	Registration.prototype.data = function(data) {
		for (var i = 0; i < this.registrations.length; i++) {
			this.registrations[i].data = data;
		}

		return this;
	};

	/**
	 * This class is used to manage the invocation of the all handlers for a certain event inside the Omni global handler
	 */
	var Invocator = function Invocator(dom) {
		this.$dom = dom;
		this.events = RDomDataEvents(dom);
	};

	/**
	 * The actual invocation of all the handlers of the current event for the current phase
	 */
	Invocator.prototype.handleEvent = function(event, isCapture) {
		var elementHandlers = isCapture == true ? this.events.capture : this.events.bubble;
		var eventName = event.type;
		var onceEventsCookies = [];

		for (var i = 0; i < elementHandlers[eventName].length; i++) {
			var currHandlerInfo = elementHandlers[eventName][i];
			var handler = currHandlerInfo.handler;
			var handlerData = currHandlerInfo.data != undefined ? currHandler.data : undefined;

			handler.call(this.$dom, event, handlerData);

			if(currHandlerInfo.once == true){
				onceEventsCookies.push(currHandlerInfo.cookie);
			}

			if(event.isImmediatePropagationStopped == true) break;
		}

		//Once handling implementation
		if(onceEventsCookies.length > 0){
			var newElementHandlers = elementHandlers[eventName].filter(function(element){
				for (let i = 0; i < onceEventsCookies.length; i++) {
					var currCookie = onceEventsCookies[i];
					if(element.cookie == currCookie) return false;
				}
				
				return false;
			});
	
			elementHandlers[eventName] = newElementHandlers;

			if(elementHandlers[eventName].length == 0){
				if(isCapture == true){
					this.$dom.removeEventListener(eventName, OmniEventHandlerCapture, true);
				}else{
					this.$dom.removeEventListener(eventName, OmniEventHandlerBubble, false);
				}
	
				delete elementHandlers[eventName];
			}
		}
	};
})();