'use strict';

// Set client auth mode - true to enable client auth, false to disable it
const isClientAuthEnabled = false;

/**
 * Initializes the SDK and sets a global field with passed name for which
 * it can be referred to later.
 *
 * @param {string} name Name by which the chat widget should be referred
 */
function initSdk(name) { {
	 if (!document || !WebSDK) {
        setTimeout(function() {
            initSdk(name);
        }, 2000);
        return;
    }
   if (!name) {
        name = 'Bots';          // Set default reference name to 'Bots'
    }
    var Bots;

    setTimeout(function() {
        /**
         * SDK configuration settings
         * Other than URI, all fields are optional with two exceptions for auth modes
         * In client auth disabled mode, 'channelId' must be passed, 'userId' is optional
         * In client auth enabled mode, 'clientAuthEnabled: true' must be passed
         */
        let chatWidgetSettings = {
             URI: 'gc3odaejas01-gc35001.botmxp.ocp.oraclecloud.com', // the domain where you want to host your bot
            clientAuthEnabled: isClientAuthEnabled,     // Enables client auth enabled mode of connection if set true
          //  channelId: 'a8a484d4-c319-4420-a4d6-7351d44dae1d',                   // Channel ID, available in channel settings in ODA UI
		   channelId: '6117d24b-f313-416c-aa7f-58c7672585aa', // here goes the channel id of the web channel you configure, hidden due to security
		   openChatOnLoad:false,   //Flag to expand chat widget when page is loaded
		   enableAutocomplete: true, // for autocomplete feature such as you are typing in " i want ..." It will automatically suggest you "i want to order pizza"
            enableAutocompleteClientCache: true, // Minimizes server calls when user uses autocomplete feature
           // enableBotAudioResponse: true,               // Enables audio utterance of skill responses
            enableClearMessage: true,                   // Enables display of button to clear conversation
			showConnectionStatus: true, // for showing connection status as connected or ready in the chat window
            enableTimestamp: false,
			
			displayActionsAsPills: true, // just a ui feature to show action buttons 
            initUserHiddenMessage: 'Hello', // to intialize the conversation from bots side
			font: '12px Verdana, Geneva, sans-serif',
            theme: 'classic',
			botButtonIcon: 'images/bot-button.png',
            logoIcon: 'https://easyadopt-bot-client.herokuapp.com/images/bot-white.png',
            botIcon: 'https://easyadopt-bot-client.herokuapp.com/images/bot-green.png',
            personIcon: 'https://easyadopt-bot-client.herokuapp.com/images/user-icon.png',
			 i18n: { // element usefull for english language placeholders and also tool tip
                en: {

                    audioResponseOff: 'Click to turn audio response on', // Tool tip for the speaker off button
                    audioResponseOn: 'Click to turn audio response off', // Tool tip for the speaker on button   

                    chatTitle: 'Vknow', // Replaces Chat
                    connected: 'Ready', // Replaces Connected
                    inputPlaceholder: 'Type here', // Replaces Type a message
                    send: 'Send (Enter)' // Replaces Send tool tip
                }
            }
        };

        // Initialize SDK
        if (isClientAuthEnabled) { // check if authentication is enabled 
            Bots = new WebSDK(chatWidgetSettings, generateToken); // if yes generate a token
        } else {
            Bots = new WebSDK(chatWidgetSettings); // otherwise initialize via widget settings
        }

        // Connect to the ODA
        Bots.connect().then(() => {
            Bots.setUserInputMessage("Hi");
        })

        // Create global object to refer Bots
        window[name] = Bots;
    }, 0);
};