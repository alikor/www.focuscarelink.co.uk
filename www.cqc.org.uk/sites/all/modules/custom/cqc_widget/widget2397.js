(function (global) {

  // Import the JSON object not available for old browsers on Quirks mode.
  // @refer_to: http://www.json.org/js.html
  "object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(t){return 10>t?"0"+t:t}function quote(t){return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var n,r,o,f,u,i=gap,p=e[t];switch(p&&"object"==typeof p&&"function"==typeof p.toJSON&&(p=p.toJSON(t)),"function"==typeof rep&&(p=rep.call(e,t,p)),typeof p){case"string":return quote(p);case"number":return isFinite(p)?String(p):"null";case"boolean":case"null":return String(p);case"object":if(!p)return"null";if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(p)){for(f=p.length,n=0;f>n;n+=1)u[n]=str(n,p)||"null";return o=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+i+"]":"["+u.join(",")+"]",gap=i,o}if(rep&&"object"==typeof rep)for(f=rep.length,n=0;f>n;n+=1)"string"==typeof rep[n]&&(r=rep[n],o=str(r,p),o&&u.push(quote(r)+(gap?": ":":")+o));else for(r in p)Object.prototype.hasOwnProperty.call(p,r)&&(o=str(r,p),o&&u.push(quote(r)+(gap?": ":":")+o));return o=0===u.length?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+i+"}":"{"+u.join(",")+"}",gap=i,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx,escapable,gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;n>r;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,JSON.parse=function(text,reviver){function walk(t,e){var n,r,o=t[e];if(o&&"object"==typeof o)for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(r=walk(o,n),void 0!==r?o[n]=r:delete o[n]);return reviver.call(t,e,o)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

  // add array index of for old browsers (IE<9)
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
      var i, j;
      i = start || 0;
      j = this.length;
      while (i < j) {
        if (this[i] === obj) {
          return i;
        }
        i++;
      }
      return -1;
    };
  }

  // make a global object to store stuff in
  if(!global.CQCWidget) { global.CQCWidget = {}; };
  var CQCWidget = global.CQCWidget;

  // To keep track of which embeds we have already processed
  if(!CQCWidget.processedScripts) { CQCWidget.processedScripts = []; };
  var processedScripts = CQCWidget.processedScripts;


  if(!CQCWidget.styleTags) { CQCWidget.styleTags = []; };
  var styleTags = CQCWidget.styleTags;

  var scriptTags = document.getElementsByTagName('script');
  var reg = /cqc.*\/widget\.js.*/;

  for(var i = 0; i < scriptTags.length; i++) {
    var scriptTag = scriptTags[i];
    // src matches the url of this request, and not processed it yet.
    if (processedScripts.indexOf(scriptTag) < 0 && scriptTag.src.match(reg)) {
      processedScripts.push(scriptTag);
      var search = scriptTag.src.split('?')[1];
      var param = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

      var protocol = location.protocol;
      var host = param['data-host'];
      var base_url = protocol + '//' + host;
      var callback = 'CQCWidgetDisplayWidget';

      var type = '';
      if (param['type']) {
        type = param['type'];
      }

      // add the style tag into the head (once only)
      if(styleTags.length == 0) {
        var styleTag = document.createElement("link");
        styleTag.rel = "stylesheet";
        styleTag.type = "text/css";
        var custom_style = base_url + '/sites/all/modules/custom/cqc_widget/cleanslate.css';
        styleTag.href =  custom_style;
        styleTag.media = "all";
        document.getElementsByTagName('head')[0].appendChild(styleTag);
        styleTags.push(styleTag);

        var styleTag = document.createElement("link");
        styleTag.rel = "stylesheet";
        styleTag.type = "text/css";
        var custom_style = base_url + '/sites/all/modules/custom/cqc_widget/cqc-widget-styles.css';
        styleTag.href =  custom_style;
        styleTag.media = "all";
        document.getElementsByTagName('head')[0].appendChild(styleTag);
        styleTags.push(styleTag);

      }

      // Create a div
      var div = document.createElement('div');

      // The widget identifier is incremental.
      if (window.cqc_widget_data_container) {
        window.cqc_widget_data_container['cqc_widget_counter'] = window.cqc_widget_data_container['cqc_widget_counter'] + 1;
      } else {
        window.cqc_widget_data_container = {};
        window.cqc_widget_data_container['cqc_widget_counter'] = 1;
      }

      div.id = 'CQCWidget-' + param['data-id'] + '-' + window.cqc_widget_data_container['cqc_widget_counter'];

      var ajax_url = base_url + '/ajax/cqc_widget/' + param['data-id'] + '/' + div.id;

      if (type != '') {
        ajax_url = ajax_url + '/' + type;
      }

      // add the cleanslate classs for extreme-CSS reset.
      div.className = 'cqc-widget cleanslate';
      scriptTag.parentNode.insertBefore(div, scriptTag);
      jsonp(ajax_url)
    }
  }

  function jsonp(url) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement("script");

    url += '?callback=' + callback;
    script.setAttribute("src", url);
    head.appendChild(script);
  }
})(this);

/**
 * Our JSONP callback.
 *
 * Displays the data we receive from the serve in the widget.
 */
function CQCWidgetDisplayWidget(data) {
  var div = document.createElement('div');
  div.innerHTML = data.response;
  document.getElementById(data.id).appendChild(div);
}
