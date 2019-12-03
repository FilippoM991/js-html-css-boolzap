$(".vocale-invia i").click(function(){
    invia_messaggio();
    setTimeout(messaggio_risposta, 1000);
})
$("#invia-messaggio").keypress(function(event){
    if(event.which == 13){
        invia_messaggio();
        setTimeout(messaggio_risposta, 1000);
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
        var messaggio = $(".messaggio.template").clone();
        messaggio.children(".testo-messaggio").text("Filippo sei veramente un grande!");
        messaggio.removeClass("template").addClass("ricevuto");
        $(".conversazione.active").append(messaggio);
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
    search();
})
$("#cerca-in-chat").keyup(function(event){
    search();
})
function search(){
    var nomeDaCercare = $("#cerca-in-chat").val();
    if(nomeDaCercare.length != 0){
        $(".singolo-contatto").each(function(){
            var nomeContatto = $(this).find("p").text();
            if (nomeContatto.toLowerCase().includes(nomeDaCercare.toLowerCase())){
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    } else {
        $(".singolo-contatto").show();
    }
}
$(".nome-informazione h4").text($(".singolo-contatto.active").find("p").text());

$(".singolo-contatto").click(function(){
    var nuovoContattoPosition = $(this).index();
    $(".singolo-contatto.active").removeClass("active");
    $(this).addClass("active");
    $(".conversazione.active").removeClass("active")
    var nuovaConversazioneActive = $(".conversazione").eq(nuovoContattoPosition);
    nuovaConversazioneActive.addClass("active");
    $(".nome-informazione h4").text($(".singolo-contatto.active").find("p").text());
})
