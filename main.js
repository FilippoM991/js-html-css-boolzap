$(".vocale-invia i").click(function(){
    // quando clicco sull icona richiamo funzione di invio e risposta a tempo
    // prendo ciò che viene scritto all interno dell imput
    var messaggioUtente = $("#invia-messaggio").val();
    // se è diverso da zero
    if (messaggioUtente.length != 0){
        invia_messaggio();
        setTimeout(messaggio_risposta, 1000);
    }

})
$("#invia-messaggio").keypress(function(event){
    // stesso procedimento ma per il tasto invio,l evento è collegato appunto al tasto 13
    if(event.which == 13){
        var messaggioUtente = $("#invia-messaggio").val();
        if (messaggioUtente.length != 0){
            invia_messaggio();
            setTimeout(messaggio_risposta, 1000);
        }
    }
})
// funzione relativa all invio del messaggio da parte nostra
function invia_messaggio(){
        // prendo ciò che viene scritto all interno dell imput
        var messaggioUtente = $("#invia-messaggio").val();
        // clono il messaggio template che ho usato come struttura del messaggio generico nell html che è nascosto con display none
        var messaggio = $(".messaggio.template").clone();
        // vado a inserire ciò che ho scritto nel punto che mi serve all interno della copia
        messaggio.children(".testo-messaggio").text(messaggioUtente);
        // usiamo la funzione new date per inserire l ora corrente nel messaggio
        var d = new Date();
        var ore, minuti;
        ore = d.getHours() + ":";
        minuti = d.getMinutes();
        messaggio.children(".orario-messaggio").text(ore + minuti);
        // tolgo la classe che lo rende nascosto, template appunto e aggiungo la classe che gli da le caratteristiche di inviato
        messaggio.removeClass("template").addClass("inviato");

        // inserisco il messaggio a schermo
        $(".conversazione.active").append(messaggio);
        // resetto l interno dell imput
        $("#invia-messaggio").val("");
}
// funzione per la risposta del computer statica, viene richiamata dentro alla funzione set timeout all inizio, il procedimento è simile a quello della nostro messaggio
function messaggio_risposta(){
        var messaggio = $(".messaggio.template").clone();
        messaggio.children(".testo-messaggio").text("Filippo sei veramente un grande!");
        // usiamo la funzione new date per inserire l ora corrente nel messaggio
        var d = new Date();
        var ore, minuti;
        ore = d.getHours() + ":";
        minuti = d.getMinutes();
        messaggio.children(".orario-messaggio").text(ore + minuti);
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

// quando si clicca su una conversazione le classi active che danno lo sfondo grigio ai contatti e il display block ai div delle conversazioni vengono tolti e messi sui nuovi elementi..

// Metodo di usare index() per trovare la posizione e eq() per l elemento corrispondente

// $(".singolo-contatto").click(function(){
//     var nuovoContattoPosition = $(this).index();
//     $(".singolo-contatto.active").removeClass("active");
//     $(this).addClass("active");
//     $(".conversazione.active").removeClass("active")
//     var nuovaConversazioneActive = $(".conversazione").eq(nuovoContattoPosition);
//     nuovaConversazioneActive.addClass("active");
//     // anche il nome del contatto in alto di cui cambia la conversazione cambia
//     $(".nome-informazione h4").text($(this).find("p").text());
//     // recupero l immagine del contatoo su cui ho cliccato
//     var immagineContatto = $(this).find("img").attr("src");
//     // cambio l immagine grazie all attributo recuperato
//     $(".header-container-right").find("img").attr("src", immagineContatto);
// })
// Proviamo il metodo con l assegnazione dei data invece di usare index ed eq,è molto più preciso e non scombina le cose se si cambia l ordine dei contatti
// aggiungo quindi l attr data-conversazione ad ogni conversazione e al relativo contatto
$(".singolo-contatto").click(function(){
    // recupero il data-conversazione del contatto su cui ho cliccato
    var conversazione_contatto = $(this).attr("data-conversazione");
    // nascondo il pannello conversazione attivo togliendo la classe(come fatto sopra)
    $(".conversazione.active").removeClass("active");
    // recuparo il pannello conversazione con lo stesso data del contatto cliccato e gli assegno la classe active
    $(".conversazione[data-conversazione='"+ conversazione_contatto +"']").addClass("active");
    // diamo la classe active dei contatti al contatto cliccato
    $(".singolo-contatto.active").removeClass("active");
    $(this).addClass("active");
    // anche il nome del contatto in alto di cui cambia la conversazione cambia
    $(".nome-informazione h4").text($(this).find("p").text());
    // recupero l immagine del contatoo su cui ho cliccato
    var immagineContatto = $(this).find("img").attr("src");
    // cambio l immagine grazie all attributo recuperato
    $(".header-container-right").find("img").attr("src", immagineContatto);

})
// per far si di poter interagire con i messaggi creati successivamente bisogna tenere l attenzione su un contenitore genitore oppure direttamente sul documento intero e usare on, facciamo comparire e scomparire il menu a tendina,se clicchiamo sullo stesso si chiude nel caso sia aperto,cliccare su uno fa chiudere gli altri
$(document).on("click", ".messaggio", function(){
    if ($(this).children(".menu_tendina").is(":visible")) {
        $(".menu_tendina").hide();
    } else {
        $(".menu_tendina").hide();
        $(this).children(".menu_tendina").show();
    }
} )

// usiamo lo stesso metodo per poter cliccare su "delete message"..usiamo la funzione parents per collegarci al parente di questo this che è .delete..parents con la s altrimenti prende l antenatto diretto..usiamo la funzione remove()
$(document).on("click", ".delete", function(){
    $(this).parents(".messaggio").remove();
})



// contenitore madre per tutte le conversazioni!! contiene un contenitore per ogni conversazione...la cui chiave è il codice data della conversazione e il valore è un array di oggetti messaggio
var pannelliConversazioni = {
    "c1":[
        {
            "testo": "ciao Bill",
            "direzione":"inviato"
        },
        {
            "testo": "ciao Filippo",
            "direzione":"ricevuto"
        }
    ],
    "c2":[
        {
            "testo": "ciao Sandro",
            "direzione":"inviato"
        },
        {
            "testo": "ciao Filippo",
            "direzione":"ricevuto"
        }
    ],
    "c3":[
        {
            "testo": "ciao Carlo",
            "direzione":"inviato"
        },
        {
            "testo": "ciao Filippo",
            "direzione":"ricevuto"
        }
    ],
    "c4":[
        {
            "testo": "ciao Francesca",
            "direzione":"inviato"
        },
        {
            "testo": "ciao Filippo",
            "direzione":"ricevuto"
        }
    ],
    "c5":[
        {
            "testo": "ciao Bob",
            "direzione":"inviato"
        },
        {
            "testo": "ciao Filippo",
            "direzione":"ricevuto"
        }
    ],
    "c6":[
        {
            "testo": "ciao Bryan",
            "direzione":"inviato"
        },
        {
            "testo": "ciao Filippo",
            "direzione":"ricevuto"
        }
    ],
    "c7":[
        {
            "testo": "ciao Lucy",
            "direzione":"inviato"
        },
        {
            "testo": "ciao Filippo",
            "direzione":"ricevuto"
        }
    ],
    "c8":[
        {
            "testo": "ciao John",
            "direzione":"inviato"
        },
        {
            "testo": "ciao Filippo",
            "direzione":"ricevuto"
        }
    ],
    "c9":[
        {
            "testo": "ciao Michele",
            "direzione":"inviato"
        },
        {
            "testo": "ciao Filippo",
            "direzione":"ricevuto"
        }
    ],
}
// uso ciclo per gli oggetti
for (var codicePannello in pannelliConversazioni) {
    console.log(pannelliConversazioni[codicePannello]);
    // creo una variabile che mi rappresenta il contenitore dei due messaggi
    var messages = pannelliConversazioni[codicePannello]
    // essendo un array adesso uso un ciclo for in modo che arrivato a questo punto del ciclo dell oggetto inizi a lavorare sul array in questione
    for (var i = 0; i < messages.length; i++) {
        // recupero i du emessaggi
        singoloMessaggio = messages[i];
        var testoMessage = singoloMessaggio.testo;
        var direzioneMessage = singoloMessaggio.direzione;
        console.log(testoMessage);
        console.log(direzioneMessage);
        // a questo punto uso lo stesso procedimento usato per l invio del messaggio normale
        // clono il messaggio template che ho usato come struttura del messaggio generico nell html che è nascosto con display none
        var messaggio = $(".messaggio.template").clone();
        // vado a inserire il testo preso dall array nel punto che mi serve all interno della copia
        messaggio.children(".testo-messaggio").text(testoMessage);
        // tolgo la classe che lo rende nascosto, template appunto e aggiungo la classe in base a ciò che ha preso dall array nella chiave direzione
        messaggio.removeClass("template").addClass(direzioneMessage);
        // inserisco il messaggio a schermo, basandomi sul data conversazione e la var codice pannello creata nel ciclo dell oggetto
        $(".conversazione[data-conversazione='"+ codicePannello +"']").append(messaggio);
    }
}
