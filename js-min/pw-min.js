function $(a){return document.getElementById(a)}function acceptFocus(a){var b=a.srcElement;state.gotFocus||(b.value="",state.gotFocus=!0)}function entropyChanged(a){state.security_param=a.srcElement.value,maybe_generate()}function generate_pw(){var a=Math.ceil(state.security_param/log2(dict.words.length)),b=[],c;for(c=0;c<a;c++)b.push(dict.words[gen1(dict.words.length)]);return b.join(" ")}function generate(){var a=1,b=[],c;$("pw-status").style.display="none";for(c=0;c<a;c++){var d=$("pw-"+c);d.style.display="inline-block",d.firstChild.nodeValue=generate_pw()}}function maybe_generate(){var a=state.seed.length/2;if(a>0){var b;a>state.security_param?(b="...computing...",generate()):b="Collected "+a+" of "+state.security_param+"; need MORE!",$("pw-status").firstChild.nodeValue=b}}function gotInput(a){var b=a.srcElement,c=a.keyCode,d=!1,e=5;for(i=0;i<e&&!d;i++)state.last_n[i]==c&&(d=!0);if(!d){var f=state.last_n;f.length==e&&(f=f.slice(1)),f.push(c),state.last_n=f,state.seed.push((new Date).getTime()%100),state.seed.push(a.keyCode),maybe_generate()}}function sha_to_shorts(a){var b=CryptoJS.SHA512(a),c=[],d;for(d=0;d<b.words.length;d++)word=b.words[d],c.push(word&65535),c.push((word>>16)+32767);return console.log("sha_to_shorts: "+a+" -> "+c.toString()),c}function _gen1(){if(state.randshorts.length===0){var a=state.seed.concat(state.lasthash),b=sha_to_shorts(a.toString());state.lasthash=b.slice(0),state.randshorts=b}var c=state.randshorts.pop();return console.log("_gen1() -> "+c),c}function log2(a){return Math.log(a)/Math.log(2)}function gen1(a){console.log("hi = "+a);var b=Math.ceil(log2(a)),c=-1;console.log("nibts: "+b);var d=~(2147483647<<b);console.log("mask: "+d);while(c<0||c>=a)c=_gen1()&d;return console.log("gen1() -> "+c),c}var state={seed:[],last_n:[],getFocus:!1,randshorts:[],prev:[],security_param:58};