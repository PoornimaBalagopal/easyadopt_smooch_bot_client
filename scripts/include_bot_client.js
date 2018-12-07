  !function(e,n,t,r){
  function o(){try{var e;if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var t=n.getElementsByTagName("script")[0],r=n.createElement("script");r.async=!0,r.src=e.url,t.parentNode.insertBefore(r,t)}}catch(e){}}var s,p,a,i=[],c=[];e[t]={init:function(){s=arguments;var e={then:function(n){return c.push({type:"t",next:n}),e},catch:function(n){return c.push({type:"c",next:n}),e}};return e},on:function(){i.push(arguments)},render:function(){p=arguments},destroy:function(){a=arguments}},        e.__onWebMessengerHostReady__=function(n){if(delete e.__onWebMessengerHostReady__,e[t]=n,s)for(var r=n.init.apply(n,s),o=0;o<c.length;o++){var u=c[o];r="t"===u.type?r.then(u.next):r.catch(u.next)}p&&n.render.apply(n,p),a&&n.destroy.apply(n,a);for(o=0;o<i.length;o++)n.on.apply(n,i[o])};var u=new XMLHttpRequest;u.addEventListener("load",o), u.addEventListener("load", s), u.open("GET", r+"/loader.json", !0),u.responseType = "json", u.send()
    }(window, document, "Bots", "https://botclientformatresponse.herokuapp.com/scripts");

  var keys = Object.keys(localStorage);
  for(var i = 0; i < keys.length; i++){
    localStorage.removeItem(keys[i]);
  }
  Bots.destroy();

  Bots.on("ready", changeAllTags);
  Bots.on("message:received", changeLastMessage);
  Bots.on("message:received", deleteTagsInCarouselPreview);

  Bots.init({ 
    appId: '5bf54b2e82603a00228f3541',
    fixedIntroPane: true,	
    businessName: "Oracle Digital Assistant",
    businessIconUrl: "https://botclientformatresponse.herokuapp.com/images/Group10.svg",
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
    cssLink.href = "custom_tag_styling.css";
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";

    chatFrame.head.appendChild(cssLink);
  })
  const tags = [
    {unescaped: "<ea-header>",        escaped: "&lt;ea-header&gt;"},
    {unescaped: "</ea-header>",       escaped: "&lt;/ea-header&gt;"},
    {unescaped: "<ea-mainresponse>",  escaped: "&lt;ea-mainresponse&gt;"},
    {unescaped: "</ea-mainresponse>", escaped: "&lt;/ea-mainresponse&gt;"},
    {unescaped: "<ea-footer>",        escaped: "&lt;ea-footer&gt;"},
    {unescaped: "</ea-footer>",       escaped: "&lt;/ea-footer&gt;"},
    {unescaped: "<ea-video>",         escaped: "&lt;ea-video&gt;"},
    {unescaped: "</ea-video>",        escaped: "&lt;/ea-video&gt;"},
    {unescaped: "<ea-steps>",         escaped: "&lt;ea-steps&gt;"},
    {unescaped: "</ea-steps>",        escaped: "&lt;/ea-steps&gt;"},
    {unescaped: "</ea-link>",         escaped: "&lt;/ea-link&gt;"},
    {unescaped: "<ea-step>",          escaped: "&lt;ea-step&gt;"},
    {unescaped: "</ea-step>",         escaped: "&lt;/ea-step&gt;"},
    {unescaped: '<ea-link href="',    escaped: '&lt;ea-link href="'},
    {unescaped: '">',                escaped: '"&gt;'}
];

function deleteTags(message) {
    for (let i in tags) message = message.replace(new RegExp(tags[i].escaped, "g"), "");
    return message.replace(/&lt;.?ea_\w+>?/g, "");
}

function unescapeMessage(message) {
    for (let i in tags) {
        message = message.replace(new RegExp(tags[i].escaped, "g"), tags[i].unescaped);
    }

    return message;
}

function ea_video(node) {
    node.outerHTML = `<iframe width="100%" src="${node.innerHTML}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
};

function ea_footer(node) {
    node.outerHTML = `<ea-footer>${node.innerHTML}</ea-footer>`;
}

function ea_steps(node) {
    node.outerHTML = `<ol class="ea-steps">${node.innerHTML}</ol>`;
}

function ea_step(node)  {
    node.outerHTML = `<li class="ea-step">${node.innerHTML}</li>`;
}

function ea_link(node) {
    node.outerHTML = `<a target="_blank" href="${node.attributes.href.value}">${node.innerHTML}</li>`
}

function changeAllTags() {
    const chatFrame = document.getElementById("web-messenger-container").contentDocument;
    if (!chatFrame) return;

    const botMessages = chatFrame.querySelectorAll(".msg-wrapper .msg:not(.msg-carousel):not(.right-row)");
    
    botMessages.forEach(msg => {
        if (!/ea/g.test(msg.innerHTML)) return; // Only edit our customizable elements
        msg.innerHTML = unescapeMessage(msg.innerHTML);
    });

    chatFrame.querySelectorAll("ea-video").forEach(ea_video);
    chatFrame.querySelectorAll("ea-footer").forEach(ea_footer);
    chatFrame.querySelectorAll("ea-steps").forEach(ea_steps);
    chatFrame.querySelectorAll("ea-step").forEach(ea_step);
    chatFrame.querySelectorAll("ea-link").forEach(ea_link);
}

function changeLastMessage(messageReceived) {
    const chatFrame = document.getElementById("web-messenger-container").contentDocument;
    const botMessages = chatFrame.querySelectorAll(".msg-wrapper .msg:not(.msg-carousel):not(.right-row)");
    let lastMessage = botMessages[botMessages.length -1];
    
    lastMessage.innerHTML = unescapeMessage(lastMessage.innerHTML);

    lastMessage.querySelectorAll("ea-video").forEach(ea_video);
    lastMessage.querySelectorAll("ea-footer").forEach(ea_footer);
    lastMessage.querySelectorAll("ea-steps").forEach(ea_steps);
    lastMessage.querySelectorAll("ea-step").forEach(ea_step);
    lastMessage.querySelectorAll("ea-link").forEach(ea_link);
}

function deleteTagsInCarouselPreview(messageReceived) {
    const chatFrame = document.getElementById("web-messenger-container").contentDocument;
    const carouselItems = chatFrame.querySelectorAll(".msg-carousel .carousel-item .carousel-description");

    carouselItems.forEach(msg => {
        msg.innerHTML = deleteTags(msg.innerHTML);
    });
}