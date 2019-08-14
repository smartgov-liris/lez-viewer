(function(t){function e(e){for(var i,l,o=e[0],r=e[1],c=e[2],d=0,p=[];d<o.length;d++)l=o[d],s[l]&&p.push(s[l][0]),s[l]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i]);u&&u(e);while(p.length)p.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],i=!0,o=1;o<n.length;o++){var r=n[o];0!==s[r]&&(i=!1)}i&&(a.splice(e--,1),t=l(l.s=n[0]))}return t}var i={},s={app:0},a=[];function l(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=t,l.c=i,l.d=function(t,e,n){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)l.d(n,i,function(e){return t[e]}.bind(null,i));return n},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/lez-viewer/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],r=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=r;a.push(["1430","chunk-vendors"]),n()})({"034f":function(t,e,n){"use strict";var i=n("64a9"),s=n.n(i);s.a},1430:function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var i,s=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"main_header"}},[t._m(0),n("div",{staticClass:"w3-bar w3-light-grey"},[n("button",{staticClass:"w3-bar-item w3-button",on:{click:t.selectLez}},[t._v("\n\t\t\t\tLez\n\t\t\t")]),n("button",{staticClass:"w3-bar-item w3-button",on:{click:t.selectViewer}},[t._v("\n\t\t\t\tEmissions\n\t\t\t")])])]),n("div",{attrs:{id:"main_body"}},[n("keep-alive",["lez"==t.selectedTab?n("lez",{ref:"lez"}):t._e(),"viewer"==t.selectedTab?n("viewer",{ref:"viewer"}):t._e()],1)],1)])},l=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w3-container"},[n("h1",[t._v(" LEZ viewer ")])])}],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w3-cell-row",attrs:{id:"viewer-container"}},[n("div",{staticClass:"w3-cell w3-cell-top",attrs:{id:"viewer-toolbar"}},[n("accordion",{attrs:{label:"Data",expand:""}},[n("viewer-data-loader",{ref:"dataLoader",staticClass:"w3-container",on:{loaded:t.handleDataLoaded}})],1),n("accordion",{attrs:{label:"Display"}},[n("display-config",{ref:"displayConfig",attrs:{lmap:t.lmap,boundingBox:t.boundingBox,establishments:t.establishments,tiles:t.tiles}})],1),n("accordion",{attrs:{label:"Zoom"}},[n("zoom-config",{attrs:{lmap:t.lmap}})],1),n("accordion",{attrs:{label:"Tiles",expand:""}},[n("tiles-config",{ref:"colorConfig",attrs:{lmap:t.lmap,tiles:t.tiles,pollutionPeeks:t.pollutionPeeks}})],1)],1),n("div",{staticClass:"w3-cell",attrs:{id:"viewer-map-container"}},[n("div",{attrs:{id:"viewer-map"}}),t.selectedTile?n("tile-popup",{attrs:{tile:t.selectedTile}}):t._e(),t.selectedEstablishment?n("establishment-popup",{attrs:{lmap:t.lmap,establishment:t.selectedEstablishment,establishments:t.establishments}}):t._e()],1)])},r=[],c=(n("8615"),n("7f7f"),n("ac6a"),n("456d"),n("e11e")),u=n.n(c),d=(n("6cc5"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"popupBody"},[n("ul",t._l(t.pollutants,function(e){return n("li",[t._v("\n\t\t\t"+t._s(e)+" : "+t._s(t.tile.pollution[e])+" g/s/m2\n\t\t")])}),0)])}),p=[],h={props:{tile:{type:Object,required:!0}},data:function(){return{pollutants:["N2O","NOx","NH3","VOC","PM","CH4","CO","FC"]}},mounted:function(){return this.$watch("tile",function(t,e){return t.mapObject.bindPopup(this.$refs.popupBody.innerHTML).openPopup()},{immediate:!0})}},m=h,f=n("2877"),b=Object(f["a"])(m,d,p,!1,null,null,null),v=b.exports,g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"popupBody"},[n("ul",[n("li",[t._v(" siret : "+t._s(t.establishment.id)+" ")]),n("li",[t._v(" name : "+t._s(t.establishment.name)+" ")]),n("li",[t._v(" activity : "+t._s(t.establishment.activity)+" ")])])])},w=[],y={props:{establishments:{type:Object,required:!0},establishment:{type:Object,required:!0},lmap:{type:Object,required:!0}},data:function(){return{lines:[]}},methods:{buildRounds:function(){var t,e,n,i,s,a,l;for(t in this.cleanRounds(),l=this,i=this.establishment.rounds,s=[],i)a=i[t],e=this.establishment.location,function(t,n){var i,s,a,o,r;for(o=n.establishments,r=[],i=0,a=o.length;i<a;i++)s=o[i],r.push(function(t){var n;return n=u.a.polyline([e,l.establishments[t].location]),n.addTo(l.lmap),l.lines.push(n),e=l.establishments[t].location}(s))}(0,a),n=u.a.polyline([e,this.establishment.location]),n.addTo(l.lmap),s.push(l.lines.push(n));return s},cleanRounds:function(){var t,e,n,i;for(i=this.lines,t=0,e=i.length;t<e;t++)n=i[t],n.remove();return this.lines=[]}},mounted:function(){var t;return t=this,this.$watch("establishment",function(e,n){return this.establishment.mapObject.bindPopup(this.$refs.popupBody.innerHTML),this.establishment.mapObject.on({popupclose:function(e){return t.cleanRounds()}}),this.establishment.mapObject.openPopup(),this.buildRounds()},{immediate:!0})}},_=y,C=Object(f["a"])(_,g,w,!1,null,null,null),k=C.exports,x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w3-margin"},[n("p",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.display.boundingBox,expression:"display.boundingBox"}],staticClass:"w3-check",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.display.boundingBox)?t._i(t.display.boundingBox,null)>-1:t.display.boundingBox},on:{change:[function(e){var n=t.display.boundingBox,i=e.target,s=!!i.checked;if(Array.isArray(n)){var a=null,l=t._i(n,a);i.checked?l<0&&t.$set(t.display,"boundingBox",n.concat([a])):l>-1&&t.$set(t.display,"boundingBox",n.slice(0,l).concat(n.slice(l+1)))}else t.$set(t.display,"boundingBox",s)},function(e){return t.handleBoxDisplay(e.target.checked)}]}}),n("label",[t._v(" Bounding Box ")])]),n("p",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.display.establishments,expression:"display.establishments"}],staticClass:"w3-check",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.display.establishments)?t._i(t.display.establishments,null)>-1:t.display.establishments},on:{change:[function(e){var n=t.display.establishments,i=e.target,s=!!i.checked;if(Array.isArray(n)){var a=null,l=t._i(n,a);i.checked?l<0&&t.$set(t.display,"establishments",n.concat([a])):l>-1&&t.$set(t.display,"establishments",n.slice(0,l).concat(n.slice(l+1)))}else t.$set(t.display,"establishments",s)},function(e){return t.handleEstablishmentsDisplay(e.target.checked)}]}}),n("label",[t._v(" Establishments ")])]),n("p",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.display.tiles,expression:"display.tiles"}],staticClass:"w3-check",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.display.tiles)?t._i(t.display.tiles,null)>-1:t.display.tiles},on:{change:[function(e){var n=t.display.tiles,i=e.target,s=!!i.checked;if(Array.isArray(n)){var a=null,l=t._i(n,a);i.checked?l<0&&t.$set(t.display,"tiles",n.concat([a])):l>-1&&t.$set(t.display,"tiles",n.slice(0,l).concat(n.slice(l+1)))}else t.$set(t.display,"tiles",s)},function(e){return t.handleTilesDisplay(e.target.checked)}]}}),n("label",[t._v(" Tiles ")])])])},O=[],T={props:{lmap:{required:!0},boundingBox:{required:!0},establishments:{required:!0,type:Object},tiles:{required:!0,type:Object}},data:function(){return{display:{boundingBox:!0,establishments:!0,tiles:!0}}},methods:{handleBoxDisplay:function(t){return t?this.boundingBox.addTo(this.lmap):this.boundingBox.remove()},handleEstablishmentsDisplay:function(t){var e,n,i,s,a,l,o;if(o=this,t){for(e in i=this.establishments,a=[],i)n=i[e],a.push(function(t){return t.mapObject.addTo(o.lmap)}(n));return a}for(e in s=this.establishments,l=[],s)n=s[e],l.push(function(t){return t.mapObject.remove()}(n));return l},handleTilesDisplay:function(t){var e,n,i,s,a,l,o,r,c,u;if(c=this,t){for(a=Object.values(this.tiles),o=[],e=0,i=a.length;e<i;e++)u=a[e],o.push(function(t){var e,n,i,s,a;for(i=Object.values(t),s=[],e=0,n=i.length;e<n;e++)a=i[e],s.push(function(t){return t.mapObject.addTo(c.lmap)}(a));return s}(u));return o}for(l=Object.values(this.tiles),r=[],n=0,s=l.length;n<s;n++)u=l[n],r.push(function(t){var e,n,i,s,a;for(i=Object.values(t),s=[],e=0,n=i.length;e<n;e++)a=i[e],s.push(function(t){return t.mapObject.remove()}(a));return s}(u));return r},refresh:function(){var t,e,n,i;for(t in i=this,e=this.display,n=[],e)e[t],n.push(function(t,e){return i.display[t]=!0}(t));return n}}},E=T,j=Object(f["a"])(E,x,O,!1,null,null,null),$=j.exports,P=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w3-margin"},[n("label",[t._v(" Latitude ")]),n("input",{staticClass:"w3-input",attrs:{type:"number",step:"0.1"},domProps:{value:t.center.lat},on:{input:function(e){return t.updateLat(e.target.value)}}}),n("label",[t._v(" Longitude ")]),n("input",{staticClass:"w3-input",attrs:{type:"number",step:"0.1"},domProps:{value:t.center.lon},on:{input:function(e){return t.updateLon(e.target.value)}}}),n("label",[t._v(" Zoom level ")]),n("input",{staticClass:"w3-input",attrs:{type:"number",step:"0.5"},domProps:{value:t.zoom},on:{input:function(e){return t.updateZoom(e.target.value)}}})])},A=[],R={props:{lmap:{required:!0}},data:function(){return{center:{lat:0,lon:0},zoom:0}},methods:{updateLat:function(t){return this.lmap.setView(L.latLng(t,this.center.lon),this.zoom,{animate:!1})},updateLon:function(t){return this.lmap.setView(L.latLng(this.center.lat,t),this.zoom)},updateZoom:function(t){return this.lmap.setView(L.latLng(this.center.lat,this.center.lon),t)}},mounted:function(){var t;return t=this,this.$nextTick(function(){return t.lmap.on({move:function(e){return t.center.lat=t.lmap.getCenter().lat,t.center.lon=t.lmap.getCenter().lng},zoom:function(e){return t.zoom=t.lmap.getZoom()}})})}},z=R,B=Object(f["a"])(z,P,A,!1,null,null,null),I=B.exports,M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w3-margin"},[n("label",[t._v(" Minimum pollution hue ")]),n("div",{staticClass:"w3-cell-row"},[n("div",{staticClass:"w3-cell color-input"},[n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.minHue,expression:"minHue",modifiers:{number:!0}}],staticClass:"w3-input",attrs:{type:"number",min:"0",max:"360"},domProps:{value:t.minHue},on:{change:t.updateTilesColors,input:function(e){e.target.composing||(t.minHue=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),n("div",{staticClass:"color-preview w3-cell",style:{"background-color":t.linearHueGradient(0)}})]),n("label",[t._v(" Maximum pollution hue ")]),n("div",{staticClass:"w3-cell-row"},[n("div",{staticClass:"w3-cell color-input"},[n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.maxHue,expression:"maxHue",modifiers:{number:!0}}],staticClass:"w3-input",attrs:{type:"number",min:"0",max:"360"},domProps:{value:t.maxHue},on:{change:t.updateTilesColors,input:function(e){e.target.composing||(t.maxHue=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),n("div",{staticClass:"color-preview w3-cell",style:{"background-color":t.linearHueGradient(1)}})]),n("label",[t._v(" Opacity ")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.opacity,expression:"opacity",modifiers:{number:!0}}],staticClass:"w3-input",attrs:{type:"number",min:"0",max:"1",step:"0.1"},domProps:{value:t.opacity},on:{change:t.updateTilesColors,input:function(e){e.target.composing||(t.opacity=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}}),n("label",[t._v(" Pollutant ")]),n("select",{directives:[{name:"model",rawName:"v-model",value:t.pollutant,expression:"pollutant"}],staticClass:"w3-select",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.pollutant=e.target.multiple?n:n[0]}}},t._l(t.pollutants,function(e){return n("option",[t._v(" "+t._s(e)+" ")])}),0),n("label",[t._v(" Pollution Peeks ")]),n("select",{directives:[{name:"model",rawName:"v-model",value:t.pollutionPeeksOrigin,expression:"pollutionPeeksOrigin"}],staticClass:"w3-select",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.pollutionPeeksOrigin=e.target.multiple?n:n[0]}}},t._l(t.pollutionPeeks,function(e,i){return n("option",{domProps:{value:i}},[t._v(" "+t._s(i)+" ")])}),0)])},D=[],H={props:{lmap:{required:!0},tiles:{required:!0,type:Object},pollutionPeeks:{required:!0,type:Object}},data:function(){return{maxHue:0,minHue:200,opacity:.5,pollutants:["CH4","FC","PM","NOx","VOC","CO","N2O","NH3"],pollutant:"NOx",pollutionPeeksOrigin:null}},watch:{pollutant:function(t,e){return this.updateTilesColors()},pollutionPeeks:function(t,e){if(!this.pollutionPeeksOrigin)return this.pollutionPeeksOrigin=Object.keys(e)[0]},pollutionPeeksOrigin:function(t,e){return this.updateTilesColors()}},methods:{linearHueGradient:function(t){return"hsl(".concat(this.minHue+t*(this.maxHue-this.minHue),",100%,50%)")},updateTilesColors:function(){var t,e,n,i,s,a;if(this.pollutionPeeksOrigin){for(s=this,n=Object.values(this.tiles),i=[],t=0,e=n.length;t<e;t++)a=n[t],i.push(function(t){var e,n,i,a,l;for(i=Object.values(t),a=[],e=0,n=i.length;e<n;e++)l=i[e],a.push(function(t){return t.mapObject.setStyle({stroke:!1,fillColor:s.linearHueGradient(Math.min(1,t.pollution[s.pollutant]/s.pollutionPeeks[s.pollutionPeeksOrigin][s.pollutant])),fillOpacity:s.opacity})}(l));return a}(a));return i}}}},S=H,N=(n("20af"),Object(f["a"])(S,M,D,!1,null,null,null)),q=N.exports,F=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w3-margin"},[n("data-loader",{ref:"establishmentsLoader",attrs:{label:"Establishments"},on:{select:function(e){t.establishmentsSelected=!0},loaded:t.handleEstablishmentsLoaded}}),n("data-loader",{ref:"tilesLoader",attrs:{label:"Tiles"},on:{select:function(e){t.tilesSelected=!0},loaded:t.handleTilesLoaded}}),n("button",{staticClass:"w3-green w3-button w3-round",attrs:{disabled:!(t.establishmentsSelected&&t.tilesSelected)},on:{click:t.load}},[n("i",{staticClass:"fa fa-upload fa-lg"}),t._v("\n\t\tLoad data\n\t")])],1)},J=[],V=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.label?n("label",[t._v(" "+t._s(t.label)+" : ")]):t._e(),n("input",{staticClass:"w3-input w3-border-0",attrs:{type:"file",accept:"application/json"},on:{change:function(e){return t.handleChange(e.target.files[0])}}})])},Z=[],G={props:{label:{type:String}},data:function(){return{loadedData:{},file:null}},methods:{handleChange:function(t){return this.file=t,this.$emit("select",t)},load:function(){var t,e;return e=this,t=new FileReader,t.onload=function(){return e.loadedData=JSON.parse(t.result),e.$emit("loaded",e.loadedData)},console.log(this.file),t.readAsText(this.file)},getFile:function(){return this.file}}},U=G,K=Object(f["a"])(U,V,Z,!1,null,null,null),Q=K.exports,W={components:{"data-loader":Q},data:function(){return{establishmentsSelected:!1,establishmentsLoaded:!1,tilesSelected:!1,tilesLoaded:!1,loadedData:{}}},methods:{load:function(){return this.$refs.establishmentsLoader.load(),this.$refs.tilesLoader.load()},handleEstablishmentsLoaded:function(t){if(this.establishmentsLoaded=!0,this.loadedData.establishments=t,this.tilesLoaded)return this.$emit("loaded",this.loadedData)},handleTilesLoaded:function(t){if(this.tilesLoaded=!0,this.loadedData.tiles=t,this.establishmentsLoaded)return this.$emit("loaded",this.loadedData)},getTilesFile:function(){return this.$refs.tilesLoader.getFile()},getEstablishmentsFile:function(){return this.$refs.establishmentsLoader.getFile()}}},X=W,Y=Object(f["a"])(X,F,J,!1,null,null,null),tt=Y.exports,et=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("button",{staticClass:"w3-button w3-large w3-block w3-left-align w3-light-grey",on:{click:function(e){t.show=!t.show}}},[n("i",{staticClass:"fas chevron",class:[t.show?"fa-chevron-down":"fa-chevron-up"]}),t._v("\n\t\t"+t._s(t.label)+"\n\t")]),n("div",{staticClass:"w3-container",class:[t.show?"w3-show":"w3-hide"]},[t._t("default")],2)])},nt=[],it={props:{label:{type:String,required:!0},expand:{type:Boolean,required:!1,default:!1}},data:function(){return{show:!1}},mounted:function(){return this.show=this.expand}},st=it,at=(n("c2a2"),Object(f["a"])(st,et,nt,!1,null,null,null)),lt=at.exports,ot={components:{"tile-popup":v,"establishment-popup":k,"display-config":$,"zoom-config":I,"tiles-config":q,"viewer-data-loader":tt,accordion:lt},data:function(){return{lmap:null,mapInitialized:!1,boundingBox:null,pollutionPeeks:{},establishments:{},selectedEstablishment:null,tiles:{},selectedTile:null}},methods:{buildMap:function(){return this.lmap=u.a.map("viewer-map").setView([0,0],1),u.a.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(this.lmap),u.a.control.scale().addTo(this.lmap)},handleDataLoaded:function(t){return this.clear(),this.buildTiles(t.tiles),this.buildEstablishments(t.establishments)},buildEstablishments:function(t){var e,n,i,s,a;for(a=this,s=[],n=0,i=t.length;n<i;n++)e=t[n],s.push(function(t){var e;return e=u.a.circle(t.location).addTo(a.lmap),Object.keys(t.rounds).length?e.setStyle({color:"black"}):e.setStyle({color:"red"}),e.on({click:function(){return a.selectedEstablishment=t}}),t.mapObject=e,a.$set(a.establishments,t.id,t)}(e));return s},buildTiles:function(t){var e,n,i,s,a,l,o,r;for(s in o=this,o.boundingBox=u.a.rectangle(t.bounds),o.boundingBox.setStyle({fill:!1,color:"black"}),o.boundingBox.addTo(o.lmap),this.mapInitialized||(this.mapInitialized=!0,o.lmap.flyToBounds(t.bounds)),e=o.$refs.dataLoader.getTilesFile().name,o.$set(o.pollutionPeeks,e,{}),a=t.pollutionPeeks,a)i=a[s],function(t,n){o.$set(o.pollutionPeeks[e],t,n)}(s,i);for(n in l=t.tiles,l)r=l[n],function(t,e){var n,i,s;for(n in o.$set(o.tiles,t,{}),i=[],e)s=e[n],i.push(function(e,n){var i;return i=u.a.rectangle(n.bounds).addTo(o.lmap),i.on({click:function(){return o.selectedTile=n}}),n.mapObject=i,o.$set(o.tiles[t],e,n)}(n,s))}(n,r);return o.$refs.colorConfig.updateTilesColors()},clear:function(){var t,e,n,i,s,a,l;for(t in this.boundingBox&&(this.boundingBox.remove(),this.boundingBox=null),s=this.establishments,s)e=s[t],e.mapObject.remove();for(a=Object.values(this.tiles),n=0,i=a.length;n<i;n++)l=a[n],function(t){var e,n,i,s,a;for(i=Object.values(t),s=[],e=0,n=i.length;e<n;e++)a=i[e],s.push(function(t){return t.mapObject.remove()}(a))}(l);return this.selectedEstablishment=null,this.selectedTile=null,this.$refs.displayConfig.refresh()}},mounted:function(){return this.buildMap()}},rt=ot,ct=(n("72e2"),Object(f["a"])(rt,o,r,!1,null,null,null)),ut=ct.exports,dt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w3-cell-row",attrs:{id:"lez-container"}},[n("div",{staticClass:"w3-cell w3-cell-top",attrs:{id:"lez-toolbar"}},[n("accordion",{attrs:{label:"Data"}},[n("div",{staticClass:"w3-margin"},[n("data-loader",{ref:"establishmentsLoader",attrs:{label:"Establishments"},on:{select:function(e){t.establishmentsFileReady=!0},loaded:t.handleLoadedEstablishments}}),n("button",{staticClass:"w3-green w3-button w3-round",attrs:{disabled:!t.establishmentsFileReady},on:{click:t.loadEstablishments}},[n("i",{staticClass:"fa fa-upload fa-lg"}),t._v("\n\t\t\tLoad JSON\n\t\t")]),n("p",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.displayEstablishments,expression:"displayEstablishments"}],staticClass:"w3-check",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.displayEstablishments)?t._i(t.displayEstablishments,null)>-1:t.displayEstablishments},on:{change:[function(e){var n=t.displayEstablishments,i=e.target,s=!!i.checked;if(Array.isArray(n)){var a=null,l=t._i(n,a);i.checked?l<0&&(t.displayEstablishments=n.concat([a])):l>-1&&(t.displayEstablishments=n.slice(0,l).concat(n.slice(l+1)))}else t.displayEstablishments=s},t.handleEstablishmentsDisplay]}}),n("label",[t._v("Display establishments")])])],1)]),n("accordion",{attrs:{label:"Perimiter",expand:""}},[n("perimeter",{ref:"perimeter",staticClass:"w3-margin",attrs:{lmap:t.lmap}})],1),n("accordion",{attrs:{label:"Allowed vehicles",expand:""}},[n("crit-air",{ref:"critAir"})],1),n("accordion",{attrs:{label:"Download",expand:""}},[n("button",{staticClass:"w3-green w3-button w3-round w3-margin",on:{click:t.downloadJson}},[n("i",{staticClass:"fa fa-download fa-lg"}),t._v("\n\t\t\tDownload JSON\n\t\t")])]),n("accordion",{attrs:{label:"Import",expand:""}},[n("div",{staticClass:"w3-margin"},[n("data-loader",{ref:"lezLoader",on:{select:function(e){t.lezFileReady=!0},loaded:t.handleLoadedLez}}),n("button",{staticClass:"w3-green w3-button w3-round",attrs:{disabled:!t.lezFileReady},on:{click:t.loadLez}},[n("i",{staticClass:"fa fa-upload fa-lg"}),t._v("\n\t\t\tLoad JSON\n\t\t")])],1)])],1),n("div",{staticClass:"w3-cell",attrs:{id:"lez-map-container"}},[n("div",{attrs:{id:"lez-map"}}),t.selectedEstablishment?n("establishment-popup",{attrs:{lmap:t.lmap,establishment:t.selectedEstablishment,establishments:t.establishments}}):t._e()],1)])},pt=[],ht=n("aeb1"),mt=n.n(ht),ft=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w3-container"},[n("div",{staticClass:"w3-bar"},["view"==t.mode?n("button",{staticClass:"w3-blue w3-button w3-round w3-margin-right",on:{click:t.buildMode}},[n("i",{staticClass:"fa fa-pencil-ruler fa-lg"})]):t._e(),"build"==t.mode?n("button",{staticClass:"w3-blue w3-button w3-round w3-margin-right",on:{click:t.viewMode}},[n("i",{staticClass:"fa fa-draw-polygon fa-lg"})]):t._e(),n("button",{staticClass:"w3-red w3-button w3-round w3-margin-right",on:{click:t.clear}},[n("i",{staticClass:"fa fa-eraser fa-lg"})])]),"build"==t.mode?n("p",[n("i",[t._v("Click on the map, and use CTRL+Click to add points.")])]):t._e()])},bt=[];i=L.icon({iconUrl:"red_marker.png",iconSize:[30,30],iconAnchor:[15,15]});var vt={props:{lmap:{required:!0}},data:function(){return{ctrlPressed:!1,points:[],lines:[],polygon:null,closeLine:null,mode:"view"}},methods:{buildMode:function(){var t,e,n,i,s,a,l,o,r;for(console.log("Enter build mode"),this.mode="build",this.polygon&&this.polygon.remove(),l=this.points,n=0,s=l.length;n<s;n++)e=l[n],e.addTo(this.lmap);for(o=this.lines,i=0,a=o.length;i<a;i++)t=o[i],t.addTo(this.lmap);return this.closeLine&&this.closeLine.addTo(this.lmap),r=this,this.lmap.on("keydown",function(t){if("ControlLeft"===t.originalEvent.code)return r.ctrlDown=!0}),this.lmap.on("keyup",function(t){if("ControlLeft"===t.originalEvent.code)return r.ctrlDown=!1}),this.lmap.on("click",function(t){if(r.ctrlDown)return r.buildPoint(t.latlng)})},closeLineMoveHandler:function(t){return this.closeLine.setLatLngs([t.latlng,this.closeLine.getLatLngs()[1]])},buildPoint:function(t){var e,n,s,a;if(n=L.marker(t,{icon:i,draggable:!0,autoPan:!0}),n.addTo(this.lmap),this.points.push(n),this.points.length>1&&(a=this.points[this.points.length-2],e=L.polyline([a.getLatLng(),n.getLatLng()]),e.addTo(this.lmap),this.lines.push(e),n.on("move",function(t){return e.setLatLngs([e.getLatLngs()[0],t.latlng])}),a.on("move",function(t){return e.setLatLngs([t.latlng,e.getLatLngs()[1]])})),3===this.points.length&&(this.closeLine=L.polyline([this.points[2].getLatLng(),this.points[0].getLatLng()]).addTo(this.lmap),s=this,this.points[0].on("move",function(t){return s.closeLine.setLatLngs([s.closeLine.getLatLngs()[0],t.latlng])}),this.points[2].on("move",this.closeLineMoveHandler)),this.points.length>3)return this.closeLine.setLatLngs([this.points[this.points.length-1].getLatLng(),this.points[0].getLatLng()]),this.points[this.points.length-2].off("move",this.closeLineMoveHandler),this.points[this.points.length-1].on("move",this.closeLineMoveHandler)},viewMode:function(){var t,e,n,i,s,a,l,o,r,c,u,d;for(this.lmap.off("keydown"),this.lmap.off("keyup"),this.lmap.off("click"),this.mode="view",c=this.points,t=0,i=c.length;t<i;t++)r=c[t],r.remove();for(u=this.lines,e=0,s=u.length;e<s;e++)l=u[e],l.remove();for(this.closeLine&&this.closeLine.remove(),o=[],d=this.points,n=0,a=d.length;n<a;n++)r=d[n],o.push(r.getLatLng());return this.polygon=L.polygon(o,{color:"green"}),this.polygon.addTo(this.lmap)},clear:function(){var t,e,n,i,s,a,l,o;for(l=this.points,n=0,s=l.length;n<s;n++)e=l[n],e.remove();for(o=this.lines,i=0,a=o.length;i<a;i++)t=o[i],t.remove();if(this.closeLine&&this.closeLine.remove(),this.points=[],this.lines=[],this.closeLine=null,this.polygon)return this.polygon.remove()},load:function(t){var e,n,i,s;for(this.clear(),s=this,n=0,i=t.length;n<i;n++)e=t[n],function(t){s.buildPoint(L.latLng(t[0],t[1]))}(e);return s.buildMode()},getPoints:function(){return this.points}}},gt=vt,wt=Object(f["a"])(gt,ft,bt,!1,null,null,null),yt=wt.exports,Lt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w3-container"},t._l(t.critairs,function(e,i){return n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.allowed,expression:"allowed"}],staticClass:"w3-check",attrs:{type:"checkbox"},domProps:{value:i,checked:Array.isArray(t.allowed)?t._i(t.allowed,i)>-1:t.allowed},on:{change:function(e){var n=t.allowed,s=e.target,a=!!s.checked;if(Array.isArray(n)){var l=i,o=t._i(n,l);s.checked?o<0&&(t.allowed=n.concat([l])):o>-1&&(t.allowed=n.slice(0,o).concat(n.slice(o+1)))}else t.allowed=a}}}),n("label",[t._v(" "+t._s(e)+" ")])])}),0)},_t=[],Ct={critairEnum:{critair1:"CRITAIR_1",critair2:"CRITAIR_2",critair3:"CRITAIR_3",critair4:"CRITAIR_4",critair5:"CRITAIR_5"},critairEnumReversed:{CRITAIR_1:"critair1",CRITAIR_2:"critair2",CRITAIR_3:"critair3",CRITAIR_4:"critair4",CRITAIR_5:"critair5"},data:function(){return{critairs:{critair1:"CRIT'air 1",critair2:"CRIT'air 2",critair3:"CRIT'air 3",critair4:"CRIT'air 4",critair5:"CRIT'air 5"},allowed:[]}},methods:{getAllowedCritAirs:function(){return this.allowed},load:function(t){var e,n,i,s,a;for(this.allowed=[],a=this,s=[],n=0,i=t.length;n<i;n++)e=t[n],s.push(function(t){return a.allowed.push(Ot.critairEnumReversed[t])}(e));return s}}},kt=Ct,xt=Object(f["a"])(kt,Lt,_t,!1,null,null,null),Ot=xt.exports,Tt={components:{perimeter:yt,"crit-air":Ot,"data-loader":Q,accordion:lt,"establishment-popup":k},data:function(){return{lmap:null,lezFileReady:!1,establishmentsFileReady:!1,establishments:{},selectedEstablishment:null,displayEstablishments:!0}},methods:{buildMap:function(){return this.lmap=u.a.map("lez-map").setView([0,0],1),console.log(this.lmap),u.a.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(this.lmap),u.a.control.scale().addTo(this.lmap)},centerMap:function(t){var e,n,i,s,a;for(a=[-Infinity,Infinity],e=[Infinity,-Infinity],i=0,s=t.length;i<s;i++)n=t[i],function(t){if(t[0]>a[0]&&(a[0]=t[0]),t[1]<a[1]&&(a[1]=t[1]),t[0]<e[0]&&(e[0]=t[0]),t[1]>e[1])e[1]=t[1]}(n);return console.log("Computed bounds : ".concat(a," ").concat(e)),this.lmap.fitBounds([a,e])},downloadJson:function(){var t,e,n,i,s,a,l,o,r;for(a={perimeter:[],allowed:[]},console.log(Ot),o=this.$refs.perimeter.getPoints(),e=0,i=o.length;e<i;e++)l=o[e],a.perimeter.push([l.getLatLng().lat,l.getLatLng().lng]);for(r=this.$refs.critAir.getAllowedCritAirs(),n=0,s=r.length;n<s;n++)t=r[n],a.allowed.push(Ot.critairEnum[t]);return mt()(JSON.stringify(a,null,"\t"),"lez.json","application/json")},loadLez:function(){return this.$refs.lezLoader.load()},loadEstablishments:function(){return this.$refs.establishmentsLoader.load()},handleLoadedLez:function(t){return this.$refs.perimeter.load(t.perimeter),this.$refs.critAir.load(t.allowed),this.centerMap(t.perimeter)},handleLoadedEstablishments:function(t){var e,n,i,s,a;for(a=this,n=[],i=0,s=t.length;i<s;i++)e=t[i],function(t){var e;e=u.a.circle(t.location),Object.keys(t.rounds).length?e.setStyle({color:"black"}):e.setStyle({color:"red"}),e.on({click:function(){return a.selectedEstablishment=t}}),t.mapObject=e,a.$set(a.establishments,t.id,t),n.push(t.location)}(e);return this.handleEstablishmentsDisplay(),this.centerMap(n)},handleEstablishmentsDisplay:function(){var t,e,n,i,s,a,l;if(this.displayEstablishments){for(t in l=this,n=this.establishments,s=[],n)e=n[t],s.push(function(t,e){return e.mapObject.addTo(l.lmap)}(0,e));return s}for(t in i=this.establishments,a=[],i)e=i[t],a.push(function(t,e){return e.mapObject.remove()}(0,e));return a}},mounted:function(){return this.buildMap(),this.$nextTick(function(){return this.$refs.perimeter.buildMode()})}},Et=Tt,jt=(n("244a"),Object(f["a"])(Et,dt,pt,!1,null,null,null)),$t=jt.exports,Pt={name:"app",components:{lez:$t,viewer:ut},data:function(){return{selectedTab:"lez"}},methods:{selectLez:function(){return this.selectedTab="lez"},selectViewer:function(){return this.selectedTab="viewer"}}},At=Pt,Rt=(n("034f"),Object(f["a"])(At,a,l,!1,null,null,null)),zt=Rt.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(t){return t(zt)}}).$mount("#app")},"20af":function(t,e,n){"use strict";var i=n("8f0f"),s=n.n(i);s.a},"244a":function(t,e,n){"use strict";var i=n("a1b5"),s=n.n(i);s.a},"4b28":function(t,e,n){},"64a9":function(t,e,n){},"72e2":function(t,e,n){"use strict";var i=n("4b28"),s=n.n(i);s.a},"8f0f":function(t,e,n){},a1b5:function(t,e,n){},c2a2:function(t,e,n){"use strict";var i=n("dfd5"),s=n.n(i);s.a},dfd5:function(t,e,n){}});
//# sourceMappingURL=app.b03b2ada.js.map