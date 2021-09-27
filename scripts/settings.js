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
        let chatWidgetSettings = {
            font: '12px "Helvetica Neue", Helvetica, Arial, sans-serif',
            showConnectionStatus: true, // for showing connection status as connected or ready in the chat window
            enableTimestamp: false,
            conversationBeginPosition: 'bottom', // for conversation to begin at the bottom
            openChatOnLoad: true,
            position: { bottom: '20px', right: '20px' },
            displayActionsAsPills: true, // just a ui feature to show action buttons 
            initUserHiddenMessage: 'Hello', // to intialize the conversation from bots side
            embedded: true, // emebedded inside the web container
           // targetElement: 'chat-container',
           // embedTopScrollId: 'top-text',
          // customHeaderElementId: 'custom-header', // to provide custom header name to the chat window
            botButtonIcon: 'images/bot-button.png',
            logoIcon: 'images/bot-white.png',
            botIcon: 'images/bot-green.png',
            personIcon: 'images/user-icon.png',
            i18n: { // element usefull for english language placeholders and also tool tip
                en: {

                    audioResponseOff: 'Click to turn audio response on', // Tool tip for the speaker off button
                    audioResponseOn: 'Click to turn audio response off', // Tool tip for the speaker on button   

                    chatTitle: 'Vknow', // Replaces Chat
                    connected: 'Ready', // Replaces Connected
                    inputPlaceholder: 'Type here', // Replaces Type a message
                    send: 'Send (Enter)' // Replaces Send tool tip
                }
            },
            font: '12px Verdana, Geneva, sans-serif',
            theme: 'classic',
            embedded: true,
            targetElement: 'chat-container',
            embedTopScrollId: 'top-text',
            customHeaderElementId: 'custom-header',
            initUserProfile: { // for fetching the logged in user profile like first name
                profile: {
                    firstName: 'First',
                    lastName: 'Last',
                    email: 'first.last@example.com',
                    properties: {
                        lastOrderedItems: '1 medium pepperoni' // just a static text
                    }
                }
            },
            enableAutocomplete: true, // for autocomplete feature such as you are typing in " i want ..." It will automatically suggest you "i want to order pizza"
            enableAutocompleteClientCache: true, // Minimizes server calls when user uses autocomplete feature
            enableBotAudioResponse: true, //if you want your bot to read aloud your response

            URI: 'gc3odaejas01-gc35001.botmxp.ocp.oraclecloud.com', // the domain where you want to host your bot
            clientAuthEnabled: isClientAuthEnabled, // variable to store the value if client authetication is enabled
            channelId: '6117d24b-f313-416c-aa7f-58c7672585aa' // here goes the channel id of the web channel you configure, hidden due to security
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