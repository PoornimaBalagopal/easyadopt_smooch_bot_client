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
	{unescaped: "<ea-link>",         escaped: "&lt;ea-link&gt;"},  
    {unescaped: "<ea-step>",          escaped: "&lt;ea-step&gt;"},
    {unescaped: "</ea-step>",         escaped: "&lt;/ea-step&gt;"},
    {unescaped: '<ea-link href="',    escaped: '&lt;ea-link href="'},
    {unescaped: '">',                escaped: '"&gt;'}
];

function deleteTags(message) {
    for (let i in tags) message = message.replace(new RegExp(tags[i].escaped, "g"), "");
    //return message.replace(/&lt;.?ea_\w+>?/g, "");
      return message.replace(/&lt;?.ea-\w+(?:&gt;)?/g, "");
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
	deleteTagsInCarouselPreview();
}

function changeLastMessage(messageReceived) {
    const chatFrame = document.getElementById("web-messenger-container").contentDocument;
    const botMessages = chatFrame.querySelectorAll(".msg-wrapper .msg:not(.msg-carousel):not(.right-row)");
    let lastMessage = botMessages[botMessages.length -1];
    
   // lastMessage.innerHTML = unescapeMessage(lastMessage.innerHTML);
  
	if (/ea/g.test(lastMessage.innerHTML)) lastMessage.innerHTML = unescapeMessage(lastMessage.innerHTML);

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
