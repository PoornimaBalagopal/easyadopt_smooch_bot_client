'use strict';

// Set client auth mode - true to enable client auth, false to disable it
const isClientAuthEnabled = false;

/**
 * Initializes the SDK and sets a global field with passed name for which
 * it can be referred to later.
 *
 * @param {string} name Name by which the chat widget should be referred
 */
const initSdk = (name) => {
    if (!name) {
        name = 'Bots'; // Set default reference name to 'Bots'
    }
    let Bots;

    setTimeout(() => {
        /**
         * SDK configuration settings
         * Other than URI, all fields are optional with two exceptions for auth modes
         * In client auth disabled mode, 'channelId' must be passed, 'userId' is optional
         * In client auth enabled mode, 'clientAuthEnabled: true' must be passed
         */
        var chatWidgetSettings = {
             URI: 'gc3odaejas01-gc35001.botmxp.ocp.oraclecloud.com', // the domain where you want to host your bot
            clientAuthEnabled: isClientAuthEnabled,     // Enables client auth enabled mode of connection if set true
          //  channelId: 'a8a484d4-c319-4420-a4d6-7351d44dae1d',                   // Channel ID, available in channel settings in ODA UI
		   channelId: '6117d24b-f313-416c-aa7f-58c7672585aa', // here goes the channel id of the web channel you configure, hidden due to security
            // userId: '<userID>',                      // User ID, optional field to personalize user experience
            enableAutocomplete: true,                   // Enables autocomplete suggestions on user input
           // enableBotAudioResponse: true,               // Enables audio utterance of skill responses
            enableClearMessage: true,                   // Enables display of button to clear conversation
            enableSpeech: false,                         // Enables voice recognition
           // speechLocale: WebSDK.SPEECH_LOCALE.EN_US,   // Sets locale used to speak to the skill, the SDK supports EN_US, FR_FR, and ES_ES locales for speech
            showConnectionStatus: true,                 // Displays current connection status on the header
			//initBotAudioMuted:true,  //Initializes the skill message utterance in muted mode. This feature can only be activated when you set enableBotAudioResponse to true
			openChatOnLoad:false,   //Flag to expand chat widget when page is loaded
			conversationBeginPosition: 'bottom', // for conversation to begin at the bottom
			//position: { bottom: '20px', right: '20px' },
            displayActionsAsPills: true, // just a ui feature to show action buttons 
            initUserHiddenMessage: 'Hello', // to intialize the conversation from bots side
			timestampMode: 'relative',                  // Sets the timestamp mode, relative to current time or default (absolute)
            enableClearMessage: true,
			botButtonIcon: 'images/bot-button.png',
            logoIcon: 'images/bot-white.png',
            botIcon: 'images/bot-green.png',
            personIcon: 'images/user-icon.png',
			theme: 'classic',
           // embedded: true,
            //targetElement: 'chat-container',
           // embedTopScrollId: 'top-text',
            //customHeaderElementId: 'custom-header',
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
       

        // Create global object to refer Bots
        window[name] = Bots;
    }, 0);
};