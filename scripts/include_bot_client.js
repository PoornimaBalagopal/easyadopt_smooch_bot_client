  !function(e,n,t,r){
  function o(){try{var e;if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var t=n.getElementsByTagName("script")[0],r=n.createElement("script");r.async=!0,r.src=e.url,t.parentNode.insertBefore(r,t)}}catch(e){}}var s,p,a,i=[],c=[];e[t]={init:function(){s=arguments;var e={then:function(n){return c.push({type:"t",next:n}),e},catch:function(n){return c.push({type:"c",next:n}),e}};return e},on:function(){i.push(arguments)},render:function(){p=arguments},destroy:function(){a=arguments}},        e.__onWebMessengerHostReady__=function(n){if(delete e.__onWebMessengerHostReady__,e[t]=n,s)for(var r=n.init.apply(n,s),o=0;o<c.length;o++){var u=c[o];r="t"===u.type?r.then(u.next):r.catch(u.next)}p&&n.render.apply(n,p),a&&n.destroy.apply(n,a);for(o=0;o<i.length;o++)n.on.apply(n,i[o])};var u=new XMLHttpRequest;u.addEventListener("load",o), u.addEventListener("load", s), u.open("GET", r+"/loader.json", !0),u.responseType = "json", u.send()
    }(window, document, "Bots", "https://smoochbotclient.herokuapp.com/scripts");

  // this will clear the chatlog and reinitialize the bot when the page gets loaded/reloaded - starts here
  var keys = Object.keys(localStorage);
  for(var i = 0; i < keys.length; i++){
    localStorage.removeItem(keys[i]);
  }
  Bots.destroy(); 
  Bots.on("ready", changeAllTags);
  Bots.on("message:received", changeLastMessage);
  Bots.on("message:received", deleteTagsInCarouselPreview);
	// *********** change the app id based on the Digital Assistant/Bot's channel id *************
  var appId = "5c01651aae57e400227ffc66";
  
  // this will clear the chatlog and reinitialize the bot when the page gets loaded/reloaded - ends here
  // variables for the additional styling and clear button - starts here
  var space = document.createElement("span");
   space.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
   // variables for the additional styling and clear button - ends here
  Bots.init({ 
     appId: appId,	
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
	//for clear conversation button
	 chatFrame.getElementById("intro_text").appendChild(space); 
	chatFrame.getElementById("intro_text").appendChild(addClearButton()); 
    chatFrame.head.appendChild(cssLink);	
	
  })
  //function for initiating the bot for clear button
  function initBots(appId){
    return Bots.init({
        appId: appId,
		    fixedIntroPane: true,	
			businessName: "Oracle Digital Assistant",	
			businessIconUrl: "https://smoochbotclient.herokuapp.com/images/Group10.svg",	
			customColors: {
				brandColor: '65758e',
				conversationColor: '65758e',
				actionColor: '65758e',
			},
			menuItems: {
				imageUpload: true,
				fileUpload: true,
				shareLocation: true
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
	//for clear conversation button
	 chatFrame.getElementById("intro_text").appendChild(space); 
	chatFrame.getElementById("intro_text").appendChild(addClearButton());  
    chatFrame.head.appendChild(cssLink);	
	
    });
}
//function for the clear button
function addClearButton()
{	
	const imgTag = document.createElement("img");
    const clearButton = document.createElement("button");
	//imgTag.className ="app-name";
	imgTag.alt= "Clear icon";
	imgTag.height= "15";
	imgTag.width=  "15";
	imgTag.src= "https://smoochbotclient.herokuapp.com/images/clearicon.svg";	

	// clearButton.innerHTML = "Clear Conversation ";
	 clearButton.setAttribute("id", "clearConvId");
	 clearButton.style.border="0";
	 clearButton.style.background="#F8F8FF";
	 clearButton.title="Clear Conversation";
	 clearButton.style.align="left";
	 clearButton.style.width="20%";
	 clearButton.type = "button";
	 clearButton.border ="none";
    	 
	clearButton.addEventListener("click", function(e) {
    var keys = Object.keys(localStorage);
	for(var i = 0; i < keys.length; i++){
		localStorage.removeItem(keys[i]);
		} 
		//chatFrame.location.reload(true);
		Bots.destroy();		
		initBots(appId);
		
	}, false);
	//adding the image to the button
	clearButton.appendChild(imgTag);
    
     return clearButton;
    //chatFrame.body.appendChild(clearButton); 
}
