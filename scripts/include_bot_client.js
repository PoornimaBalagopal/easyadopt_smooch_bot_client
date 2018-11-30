  !function(e,n,t,r){
  function o(){try{var e;if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var t=n.getElementsByTagName("script")[0],r=n.createElement("script");r.async=!0,r.src=e.url,t.parentNode.insertBefore(r,t)}}catch(e){}}var s,p,a,i=[],c=[];e[t]={init:function(){s=arguments;var e={then:function(n){return c.push({type:"t",next:n}),e},catch:function(n){return c.push({type:"c",next:n}),e}};return e},on:function(){i.push(arguments)},render:function(){p=arguments},destroy:function(){a=arguments}},        e.__onWebMessengerHostReady__=function(n){if(delete e.__onWebMessengerHostReady__,e[t]=n,s)for(var r=n.init.apply(n,s),o=0;o<c.length;o++){var u=c[o];r="t"===u.type?r.then(u.next):r.catch(u.next)}p&&n.render.apply(n,p),a&&n.destroy.apply(n,a);for(o=0;o<i.length;o++)n.on.apply(n,i[o])};var u=new XMLHttpRequest;u.addEventListener("load",o), u.addEventListener("load", s), u.open("GET", r+"/loader.json", !0),u.responseType = "json", u.send()
    }(window, document, "Bots", "https://smoochbotclient.herokuapp.com/scripts");

  var keys = Object.keys(localStorage);
  for(var i = 0; i < keys.length; i++){
    localStorage.removeItem(keys[i]);
  }
  Bots.destroy();

  Bots.init({ 
    appId: '5c01651aae57e400227ffc66',
    fixedIntroPane: true,	
    businessName: "Oracle Digital Assistant",
    businessIconUrl: "https://smoochbotclient.herokuapp.com/images/Group10.svg",
	customColors: {
        brandColor: '65758e',
        conversationColor: '65758e',
        actionColor: '65758e',
    },
	 customText: {
            headerText:'How can I help?',
			introductionText: 'EasyAdopt Skills',
			
        }
  })
  
  .then(function addCustomTagStyling() {
    const chatFrame = document.getElementById("web-messenger-container").contentDocument;
    const cssLink = document.createElement("link");
    cssLink.href = "https://smoochbotclient.herokuapp.com/custom_tag_styling.css";
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";

    chatFrame.head.appendChild(cssLink);
  })
    
  const tags = [
    {unescaped: "<ea_header>",        escaped: "&lt;ea_header&gt;"},
    {unescaped: "</ea_header>",       escaped: "&lt;/ea_header&gt;"},
    {unescaped: "<ea_mainresponse>",  escaped: "&lt;ea_mainresponse&gt;"},
    {unescaped: "</ea_mainresponse>", escaped: "&lt;/ea_mainresponse&gt;"},
    {unescaped: "<ea_footerlink>",    escaped: "&lt;ea_footerlink&gt;"},
    {unescaped: "</ea_footerlink>",   escaped: "&lt;/ea_footerlink&gt;"},
    {unescaped: "<ea_infolink>",      escaped: "&lt;ea_infolink&gt;"},
    {unescaped: "</ea_infolink>",     escaped: "&lt;/ea_infolink&gt;"},
    {unescaped: "<ea_inresplink>",    escaped: "&lt;ea_inresplink&gt;"},
    {unescaped: "</ea_inresplink>",   escaped: "&lt;/ea_inresplink&gt;"},
    {unescaped: "<br>",                escaped: "&lt;br&gt;"}
]

function escapeMessage(message) {
    for (let i in tags) {
        message = message.replace(new RegExp(tags[i].unescaped, "g"), tags[i].escaped);
    }
    return message;
}

function unescapeMessage(message) {
    for (let i in tags) {
        message = message.replace(new RegExp(tags[i].escaped, "g"), tags[i].unescaped);
    }
    return message;
}

function ea_inresplink(videoSrc) {
    return `<iframe width="100%" src="${videoSrc}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
}

function ea_footerlink(footerlink) {
    return `<a href="${footerlink}" target="_blank"><ea_footer>Visit us</ea_footer></a>`
}

function ea_infolink(infolink) {
    return `<a href="${infolink}" target="_blank"><ea_info>More info</ea_footer></a>`
}

function changeTags(messageReceived) {
    console.log(messageReceived);

    const chatFrame = document.getElementById("web-messenger-container").contentDocument;
    const botMessages = chatFrame.querySelectorAll(".msg-wrapper .msg:not(.msg-carousel)");

    botMessages.forEach(msg => {
        msg.innerHTML = unescapeMessage(msg.innerHTML);
    });

    const inresplinks = chatFrame.querySelectorAll("ea_inresplink");
    inresplinks.forEach(msg => msg.outerHTML = ea_inresplink(msg.innerHTML));

    const footerlinks = chatFrame.querySelectorAll("ea_footerlink");
    footerlinks.forEach(msg => msg.outerHTML = ea_footerlink(msg.innerHTML));

    const infolinks = chatFrame.querySelectorAll("ea_infolink");
    infolinks.forEach(msg => msg.outerHTML = ea_infolink(msg.innerHTML));
}

Bots.on("message:received", changeTags);
