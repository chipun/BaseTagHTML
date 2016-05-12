 // create an functional expression to wrap our code
 (function() {

     var indexFile = (location.pathname.match(/\/(index[^\.]*\.html)/) || ['', ''])[1],
         rUrl = /(#!\/|api|index[^\.]*\.html).*$/,
         baseUrl = location.href.replace(rUrl, indexFile),
         headEl = document.getElementsByTagName('head')[0],
         sync = true;

     // define our constructor
     this.baseTag = function() {

         // Define option defaults 
         var defaults = {
             autoOpen: false,
             className: 'fade-and-drop',
             closeButton: true,
             content: "",
             maxWidth: 600,
             minWidth: 280,
             overlay: true
         }

         // Create options by extending defaults with the passed in arugments
         if (arguments[0] && typeof arguments[0] === "object") {
             this.options = extendDefaults(defaults, arguments[0]);
         }

     }

     // Utility method to extend defaults with options
     function extendDefaults(source, properties) {
         var property;
         for (property in properties) {
             if (properties.hasOwnProperty(property)) {
                 source[property] = properties[property];
             }
         }
         return source;
     }

     //Public Methods
     baseTag.prototype.insertTags = function(list) {

             if (!Array.isArray(list)) {
                 throw "The parameter value is not an Array";

             }

             for (var item in list) {

                 var keyName = Object.keys(list[item])[0];

                 switch (keyName) {
                     case "script":
                         addTag(keyName, list[item].script, sync);
                         break;

                     case "link":
                         addTag(keyName, list[item].link, sync);
                         break;
                 };
             }

         }

    baseTag.prototype.insertTag = function(name, attributes, sync)  
    {
         var el = document.createElement(name),
             attrName;

         for (attrName in attributes) {
             el.setAttribute(attrName, attributes[attrName]);
         }

         sync ? document.write(outerHTML(el)) : headEl.appendChild(el);
    }   

    //End Public Methods

     // Private Methods
     function addTag(name, attributes, sync) {
         var el = document.createElement(name),
             attrName;

         for (attrName in attributes) {
             el.setAttribute(attrName, attributes[attrName]);
         }

         sync ? document.write(outerHTML(el)) : headEl.appendChild(el);
     }

     function outerHTML(node) {
         // if IE, Chrome take the internal method otherwise build one
         return node.outerHTML || (
             function(n) {
                 var div = document.createElement('div'),
                     h;
                 div.appendChild(n);
                 h = div.innerHTML;
                 div = null;
                 return h;
             })(node);
     }

     //END Private Methods


     // addTag('base', {
     //     href: baseUrl
     // });
     // addTag('link', {
     //     rel: 'stylesheet',
     //     href: 'css/bootstrap.min.css',
     //     type: 'text/css'
     // });
     // addTag('link', {
     //     rel: 'stylesheet',
     //     href: 'css/bootstrap.css',
     //     type: 'text/css'
     // });

     // addTag('script', {
     //     src: 'scripts/angular-1.5.5/angular.min.js'
     // }, sync);

     // addTag('script', {
     //     src: 'scripts/angular-1.5.5/aa.select2.js'
     // }, sync);

     // addTag('script', {
     //     src: 'scripts/bootstrap.js'
     // }, sync);
     // addTag('script', {
     //     src: 'scripts/bootstrap.min.js'
     // }, sync);



 })();
