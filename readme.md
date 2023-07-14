QS Pivot Image
Questa estensione, affiancata alla Pivot standard di Qlik, permette di visualizzare immagini all'interno della pivot stessa.
Agisce dopo la fine del caricamento del foglio in cui la Pivot è inserita, inserendo un tag img prelevando il source dalla cella della Pivot.
E' necessario, fra i parametri di configurazione dell'estensione indicare in quali campi sono contenuti i link alle immagini, e se solo link semplici 
o se invece hanno un prefisso e suffisso per identificare l'url.

I parametri di configurazione dell'estensione sono:

ShowImage: Attiva o disattiva la visualizzazione delle immagini.
ShowMode: determina come viene visualizzato l'ingrandimento dell'immagine. modale su on click, modale su on mouse over, non visualizza l'ingrandimento
OnlyUrl: definisce se nel campo è presente solo l'url dell'immagine o anche altro codice
IniTag: nel caso in cui nel dato sia contenuto altro codice è il tag iniziale
EndTag: nel caso in cui nel dato sia contenuto altro codice è il tag finale
ImageFields: l'elenco separato da virgola dei campi immagine da trattare
HeaderColor: il colore dell'header del popup che contiene l'ingrandimento dell'immagine