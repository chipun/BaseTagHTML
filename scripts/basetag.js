var baseTag = (function() {
    
    var indexFile = (location.pathname.match(/\/(index[^\.]*\.html)/) || ['', ''])[1],
        rUrl = /(#!\/|api|index[^\.]*\.html).*$/,
        baseUrl = location.href.replace(rUrl, indexFile),
        headEl = document.getElementsByTagName('head')[0],
        sync = true;

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

    var setupTags = function(list) {
        console.log("Start looping...");

         for (var item in list) {

            var keyName = Object.keys(list[item])[0];

            switch(keyName)
            {
                case "script":
                     addTag(keyName, list[item].script, sync);
                break;

                case "link":
                     addTag(keyName, list[item].link, sync);
                break;
            };
            
            console.log(list[item]);
        }

        console.log("End looping...")
    }


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

    return {

        init: function(s) {
            setupTags(s);
        }

    }



})();
