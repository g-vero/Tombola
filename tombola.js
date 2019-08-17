// Selezione elementi del DOM 

const casellaCartellone = document.querySelectorAll('.riga div');
const cartella = document.getElementById('cartella');
const estrazione = document.getElementById('btn_est');
const nonUscito = document.querySelector('.nonUscito');
let numEstrattoDOM = document.getElementById('numero_estratto');
const premi = document.querySelectorAll('#premi div');
const tombola = document.getElementById("tombola");
const nuovaPartitaBottone = document.getElementById('btn_new_game');


//genera numero casuale
let numeroRandom = () => Math.floor(Math.random() * 90) + 1; 

init();

// Crea la cartella con numeri casuali unici

function generaCartella(){
    let arrayControllo = [];
    let caselleCartella = Array.from(document.querySelectorAll('.cartella div'));
    
    for(let i =0; i<15; i++){
        let numCasella = numeroRandom();
       
        while(arrayControllo.indexOf(numCasella) !== -1){
            numCasella = numeroRandom();
        }
        arrayControllo[i] = numCasella;
        caselleCartella[i].innerHTML = numCasella;
        
    }

}


// Evento per gestire il click estrazione numero casuale

estrazione.addEventListener('click', () => {
    let numeroEstratto = numeroRandom();

        // Aggiornamento interfaccia grafica con numero estratto
    
        while(casellaCartellone[numeroEstratto - 1].className === 'uscito'){
            numeroEstratto = numeroRandom();
            
        }

        numEstrattoDOM.innerHTML = numeroEstratto;

        casellaCartellone[numeroEstratto - 1].className ='uscito';
       

        let premiCartellone =  casellaCartellone[numeroEstratto - 1].parentNode.getElementsByClassName('uscito').length;
       

         let nodeCartella = casellaCartellone[numeroEstratto - 1].parentNode.classList[0];
         
            let tot=0;
        document.querySelectorAll('.'+nodeCartella).forEach((item)=>{
            
            tot += item.getElementsByClassName('uscito').length;
         
        })

        if(tot === 15) premiCartellone = 15;
        
        controllaVincite(premiCartellone);

    
    });


// Controllo vincite su cartella
    // E' possibile 'coprire' solo una casella con un numero effetivamente uscito
    

    cartella.addEventListener('click', (e)=>{
    
        let casellaCartella = e.target.innerHTML;
        
        if( casellaCartellone[casellaCartella -1].className == 'uscito'){       
            e.target.classList.add('coperto');
        } else {
            nonUscito.innerHTML = `Il numero ${casellaCartella} non è uscito!`
        }
    
        let premiCartella = e.target.parentNode.getElementsByClassName('coperto').length;
        let tombolaCartella =  e.target.parentNode.parentNode.getElementsByClassName('coperto').length;
    
        if(tombolaCartella === 15) premiCartella = 15;
        controllaVincite(premiCartella);
    })


    //Funzione controllo vincite cartellone/cartella (ambo ecc)

function controllaVincite(vincita){
   
    switch(vincita){
        case 2:
           
            
            if(premi[0].style.display =='none'){
                premi[0].style.display = 'block';
                    }
			
			break;
		case 3:
			
			if(premi[1].style.display=='none'){
                premi[1].style.display = 'block';
                    } 
			break;
		case 4:
			
			if(premi[2].style.display=='none'){
                premi[2].style.display = 'block';
                    } 
			break;
		case 5:
			
			if(premi[3].style.display=='none'){
			premi[3].style.display = 'block';
				} 
			break;
			
		case 15:
       
            tombola.style.display = "block";
	}
    }

//Nuova partita

nuovaPartitaBottone.addEventListener('click', ()=>{

    init();
});

function init(){
    tombola.style.display = "none";

    nonUscito.innerHTML = '';

    numEstrattoDOM.innerHTML = '';

    premi.forEach(function(item){
        item.style.display = 'none';
    }); 

    casellaCartellone.forEach((item)=>{
        item.classList.remove('uscito');
    });

    generaCartella();

   
}
