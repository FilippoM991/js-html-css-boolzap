$(".vocale-invia i").click(function(){
    invia_messaggio();
})
$("#invia-messaggio").keypress(function(event){
    if(event.which == 13){
        invia_messaggio();
    }
})
function invia_messaggio(){
    var messaggioUtente = $("#invia-messaggio").val();
    if (messaggioUtente.length != 0) {
        var messaggio = $(".messaggio.template").clone();
        messaggio.children(".testo-messaggio").text(messaggioUtente);
        messaggio.removeClass("template").addClass("inviato");
        $(".conversazione.active").append(messaggio);
        $("#invia-messaggio").val("");
    }
}
$("#invia-messaggio").keyup(function(event){
    var messaggioUtente = $("#invia-messaggio").val();
    if (messaggioUtente.length != 0) {
        $(".vocale-invia i").removeClass("fa fa-microphone").addClass("fas fa-paper-plane")
    } else {
        $(".vocale-invia i").addClass("fa fa-microphone").removeClass("fas fa-paper-plane")
    }
})
