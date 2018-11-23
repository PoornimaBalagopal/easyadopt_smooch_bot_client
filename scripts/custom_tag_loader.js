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