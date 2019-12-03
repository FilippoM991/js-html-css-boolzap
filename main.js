$(".vocale-invia i").click(function(){
    invia_messaggio();
    messaggio_risposta();
})
$("#invia-messaggio").keypress(function(event){
    if(event.which == 13){
        invia_messaggio();
        messaggio_risposta();
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
function messaggio_risposta(){
    setTimeout(function(){
        var messaggio = $(".messaggio.template").clone();
        messaggio.children(".testo-messaggio").text("Filippo sei veramente un grande!");
        messaggio.removeClass("template").addClass("ricevuto");
        $(".conversazione.active").append(messaggio);
    },1000)
}
$("#invia-messaggio").keyup(function(event){
    var messaggioUtente = $("#invia-messaggio").val();
    if (messaggioUtente.length != 0) {
        $(".vocale-invia i").removeClass("fa fa-microphone").addClass("fas fa-paper-plane")
    } else {
        $(".vocale-invia i").addClass("fa fa-microphone").removeClass("fas fa-paper-plane")
    }
})
$(".cerca-icon i").click(function(){
    var nomeDaCercare = $("#cerca-in-chat").val();
    if(nomeDaCercare.length != 0){
        $(".singolo-contatto").each(function(){
            var nomeContatto = $(this).find("p").text();
            if (nomeDaCercare.toLowerCase() == nomeContatto.toLowerCase()){
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    } else {
        $(".singolo-contatto").show();
    }
})
