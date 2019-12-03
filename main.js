$(".vocale-invia i").click(function(){
    // quando clicco sull icona richiamo funzione di invio e risposta a tempo
    invia_messaggio();
    setTimeout(messaggio_risposta, 1000);
})
$("#invia-messaggio").keypress(function(event){
    // stesso procedimento ma per il tasto invio,l evento è collegato appunto al tasto 13
    if(event.which == 13){
        invia_messaggio();
        setTimeout(messaggio_risposta, 1000);
    }
})
// funzione relativa all invio del messaggio da parte nostra
function invia_messaggio(){
    // prendo ciò che viene scritto all interno dell imput
    var messaggioUtente = $("#invia-messaggio").val();
    // se è diverso da zero
    if (messaggioUtente.length != 0) {
        // clono il messaggio template che ho usato come struttura del messaggio generico nell html che è nascosto con display none
        var messaggio = $(".messaggio.template").clone();
        // vado a inserire ciò che ho scritto nel punto che mi serve all interno della copia
        messaggio.children(".testo-messaggio").text(messaggioUtente);
        // tolgo la classe che lo rende nascosto, template appunto e aggiungo la classe che gli da le caratteristiche di inviato
        messaggio.removeClass("template").addClass("inviato");
        // inserisco il messaggio a schermo
        $(".conversazione.active").append(messaggio);
        // resetto l interno dell imput
        $("#invia-messaggio").val("");
    }
}
// funzione per la risposta del computer statica, viene richiamata dentro alla funzione set timeout all inizio, il procedimento è simile a quello della nostro messaggio
function messaggio_risposta(){
        var messaggio = $(".messaggio.template").clone();
        messaggio.children(".testo-messaggio").text("Filippo sei veramente un grande!");
        messaggio.removeClass("template").addClass("ricevuto");
        $(".conversazione.active").append(messaggio);
}
// facciamo cambiare l icona dal microfono di base all icona di invio, solo quando si inizia a scivere
$("#invia-messaggio").keyup(function(event){
    var messaggioUtente = $("#invia-messaggio").val();
    if (messaggioUtente.length != 0) {
        $(".vocale-invia i").removeClass("fa fa-microphone").addClass("fas fa-paper-plane")
    } else {
        $(".vocale-invia i").addClass("fa fa-microphone").removeClass("fas fa-paper-plane")
    }
})
// quando clicco sull icona di ricerca richiama funzione per cercare nome o parte di esso nei contatti
$(".cerca-icon i").click(function(){
    search();
})
// stesso come sopra ma automatico sul momento grazie a keyup
$("#cerca-in-chat").keyup(function(event){
    search();
})
// funzione di ricerca, per ogni contatto si valuta se il nome presente in esso contiene ciò che è scritto nell imput..grazie al fatto che le stringhe vengono viste come array di caratteri,ricerca fatta con lettere minuscole..se trova qualcosa lo mostra e nasconde il resto..se non c è nulla nell imput mostra tutto
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
// il nome della chat corrente è dato dal nome del contatto active in quel momento
$(".nome-informazione h4").text($(".singolo-contatto.active").find("p").text());
// quando si clicca su una conversazione le classi active che danno lo sfondo grigio ai contatti e il display block ai div delle conversazioni vengono tolti e messi sui nuovi elementi..usati index() per trovare la posizione e eq() per l elemento corrispondente
$(".singolo-contatto").click(function(){
    var nuovoContattoPosition = $(this).index();
    $(".singolo-contatto.active").removeClass("active");
    $(this).addClass("active");
    $(".conversazione.active").removeClass("active")
    var nuovaConversazioneActive = $(".conversazione").eq(nuovoContattoPosition);
    nuovaConversazioneActive.addClass("active");
    // anche il nome del contatto in alto di cui cambia la conversazione cambia
    $(".nome-informazione h4").text($(".singolo-contatto.active").find("p").text());
})
