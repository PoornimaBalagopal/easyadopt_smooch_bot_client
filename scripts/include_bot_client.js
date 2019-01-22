  !function(e,n,t,r){
  function o(){try{var e;if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var t=n.getElementsByTagName("script")[0],r=n.createElement("script");r.async=!0,r.src=e.url,t.parentNode.insertBefore(r,t)}}catch(e){}}var s,p,a,i=[],c=[];e[t]={init:function(){s=arguments;var e={then:function(n){return c.push({type:"t",next:n}),e},catch:function(n){return c.push({type:"c",next:n}),e}};return e},on:function(){i.push(arguments)},render:function(){p=arguments},destroy:function(){a=arguments}},        e.__onWebMessengerHostReady__=function(n){if(delete e.__onWebMessengerHostReady__,e[t]=n,s)for(var r=n.init.apply(n,s),o=0;o<c.length;o++){var u=c[o];r="t"===u.type?r.then(u.next):r.catch(u.next)}p&&n.render.apply(n,p),a&&n.destroy.apply(n,a);for(o=0;o<i.length;o++)n.on.apply(n,i[o])};var u=new XMLHttpRequest;u.addEventListener("load",o), u.addEventListener("load", s), u.open("GET", r+"/loader.json", !0),u.responseType = "json", u.send()
    }(window, document, "Bots", "https://smoochbotclient.herokuapp.com/scripts");

// this will clear the chatlog and reinitialize the bot when the page gets loaded/reloaded - starts here
  /*var keys = Object.keys(localStorage);
  for(var i = 0; i < keys.length; i++){
    localStorage.removeItem(keys[i]);
  }
  Bots.destroy(); */
  var appId = "5c36e2e0dbc7b20022182bff";
   Bots.on("ready", changeAllTags);
  Bots.on("message:received", changeLastMessage);
  Bots.on("message:received", deleteTagsInCarouselPreview);
 
 var access_token=null;
var user_id=null;
var Servlet_uri = "https://"+window.location.host+"/fscmRestApi/tokenrelay";
var diff;
var botuser;
var hiflag;
var bot = {};
	getJWT();
/*if(/fa-ext/.test(Servlet_uri)){
	getJWT();
}else
{
		console.log("NOT FA EMBEDDED")
	}*/
	
  // this will clear the chatlog and reinitialize the bot when the page gets loaded/reloaded - ends here
  // variables for the additional styling and clear button - starts here  
  
	var space = document.createElement("span");
    space.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
   // variables for the additional styling and clear button - ends here
 function set_localstorage(){	
  var fap = window.location.host.split('-')[1];

	var retrievedObject = localStorage.getItem('bot');
	if(retrievedObject===null){
		console.log('retrievedObject: ', retrievedObject);
	 var startDate = new Date();
		 
		  bot['botuser']=user_id;
			bot['time']=startDate;
			bot['hiflag']=false;
			//Put the object into storage
			localStorage.setItem('bot', JSON.stringify(bot));
			retrievedObject = localStorage.getItem('bot');
	}
	var retreivedbotvalues = JSON.parse(retrievedObject);
	console.log('retrievedObject: ', JSON.parse(retrievedObject));
	botuser = retreivedbotvalues["botuser"];
	var lastDate = new Date(retreivedbotvalues["time"]);
	hiflag = retreivedbotvalues["hiflag"];
	console.log('botuser: ', botuser);
	var startDate = new Date();
	diff =(startDate.getTime() - lastDate.getTime()) / 1000;
	  diff /= 60;
	//clear the local storage if the logged-in user is different or time exceeds 2 hrs
	console.log(diff);
	if(diff > 120 || botuser!=user_id){    
	var keys = Object.keys(localStorage);
     for(var i = 0; i < keys.length; i++){
      localStorage.removeItem(keys[i]);
     }
     Bots.destroy();
	 var startDate = new Date();
	   bot['botuser']=user_id;
		bot['time']=startDate;
		bot['hiflag']=false;
		//Put the object into storage
		localStorage.setItem('bot', JSON.stringify(bot));
	}
		Bots.on('ready', function(){
		console.log('the init has completed!');
		console.log(Bots.getUser());
		//var userdetails = Bots.getUser();
		//var user = userdetails["givenName"];
		retrievedObject = localStorage.getItem('bot');
		bot=JSON.parse(retrievedObject);
		hiflag = bot['hiflag'];
		if(diff >= 120 || botuser!=user_id || hiflag==false){
		//Bots.sendMessage("Hi");
		bot['hiflag']=true;
		localStorage.setItem('bot', JSON.stringify(bot));
		}
		
	}); 
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
		   
		 Bots.updateUser({
			"givenName": access_token,
			"surname": user_id,
			 properties: {
			  language: "nl"
		  }
		})
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
	  
	  function initBots(appId){
		 Bots.on("ready", changeAllTags);
		Bots.on("message:received", changeLastMessage);
		Bots.on("message:received", deleteTagsInCarouselPreview);  
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
		 Bots.updateUser({
			"givenName": access_token,
			"surname": user_id,
			 properties: {
			  language: "nl"
		  }
		})
		 const chatFrame = document.getElementById("web-messenger-container").contentDocument;
		 //for clear conversation button
		 chatFrame.getElementById("intro_text").appendChild(space); 
		chatFrame.getElementById("intro_text").appendChild(addClearButton()); 
		const cssLink = document.createElement("link");
		cssLink.href = "https://smoochbotclient.herokuapp.com/custom_tag_styling.css";
		cssLink.rel = "stylesheet";
		cssLink.type = "text/css";
		 
		chatFrame.head.appendChild(cssLink); 
	
    });
}
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
}
	
// Get JWT token using token relay FA Servlet
function getJWT() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET",Servlet_uri, true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.onreadystatechange = function () {
	if(xhttp.readyState === 4 && xhttp.status === 200) {
		
		access_token=JSON.parse(xhttp.responseText).access_token;		
		user_id=JSON.parse(xhttp.responseText).principal;		
		set_localstorage();
	}
	};
	xhttp.send();
	
} 
