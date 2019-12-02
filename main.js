var messaggio = $(".messaggio.template").clone();
messaggio.removeClass("template").addClass("inviato");
$(".vocale-invia i").click(function(){
    var messaggioUtente = $("#invia-messaggio").val();
    messaggio.children(".testo-messaggio").text(messaggioUtente);
    $(".main-messaggi").append(messaggio);
})
