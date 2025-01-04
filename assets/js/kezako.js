
function decode(a) {
    return a.replace(/[a-zA-Z]/g,
        function(c){
            return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        }
    );
};

function revealMail(element) {
    var y = decode("frpubveqrybhenqbhe@tznvy.pbz");
    var mail_elt = document.createElement('i');
    mail_elt.textContent = y;
    var bb = document.createElement('b').appendChild(mail_elt);
    element.replaceWith(bb);
    return false;
};
