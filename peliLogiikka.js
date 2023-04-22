const pelaajaLista = [];
const ilmoitus = document.getElementById("ilmoitus");
const form = document.querySelector("form");

// Säännöt
document.getElementById("luinSaannot").addEventListener('click', () => {
    document.getElementById("saannot").style.display = "none";

    document.getElementById("noppienValitseminen").style.display = "block";
    document.getElementById("pisteMaaranValitseminen").style.display = "block";
});

// Noppien määrän valitseminen 

let noppienMaara;
let yksiNoppa = document.getElementById("yksiNoppa");
let kaksiNoppaa = document.getElementById("kaksiNoppaa");

yksiNoppa.addEventListener('click', () => {
    
    if(voittoPistemaara == null) {
        ilmoitus.innerHTML = "Aseta voittamiseen tarvittava pistemäärä";
    } else {
        noppienMaara = 1;
        
        let noppienValitseminen = document.getElementById("noppienValitseminen");
        noppienValitseminen.style.display = "none";
        
        let pelaajienAsettaminen = document.getElementById("pelaajienAsettaminen");
        pelaajienAsettaminen.style.display = "block";
        
        document.getElementById("NaytaVoittoPistemaara").innerHTML = "Voittamiseen tarvittava pistemäärä: " + voittoPistemaara;
        document.getElementById("NaytaVoittoPistemaara").style.display = "none";
        
        document.getElementById("pisteMaaranValitseminen").style.display = "none";
    }
})

kaksiNoppaa.addEventListener('click', () => {
    
    if(voittoPistemaara == null) {
        ilmoitus.innerHTML = "Aseta voittamiseen tarvittava pistemäärä";
    } else {
        noppienMaara = 2;
        
        let noppienValitseminen = document.getElementById("noppienValitseminen");
        noppienValitseminen.style.display = "none";
        
        let pelaajienAsettaminen = document.getElementById("pelaajienAsettaminen");
        pelaajienAsettaminen.style.display = "block";
        
        document.getElementById("NaytaVoittoPistemaara").innerHTML = "Voittamiseen tarvittava pistemäärä: " + voittoPistemaara;
        document.getElementById("NaytaVoittoPistemaara").style.display = "none";
        
        document.getElementById("pisteMaaranValitseminen").style.display = "none";
    }
    
})

// Voittamiseen tarvittavan pistemäärän valitseminen

let voittoPistemaara = 100;
function pistemaaranAsettaminen() {
    let pistemaara = document.getElementById("Pistemaara").value;

    ilmoitus.innerHTML = "";

    if(isNaN(pistemaara)) {
        ilmoitus.innerHTML = "Pistemäärän pitää olla numero!";
    } else if(pistemaara >= 100) {
        voittoPistemaara = pistemaara;
    }

    document.getElementById("pisteMaaranValitseminen").style.display = "none";

    document.getElementById("NaytaVoittoPistemaara").innerHTML = "Voittamiseen tarvittava pistemäärä: " + voittoPistemaara;
}


// Pelaajien hallinta

function lisaaPelaaja(form) {
    const lisattavaPelaaja = form.lisattavaPelaaja.value;
    
    ilmoitus.innerHTML = "";
    
    
    if (lisattavaPelaaja != "") {
        
        if (tarkistaListanSisalto(pelaajaLista, lisattavaPelaaja) == true) {
            pelaajaLista.push({nimi: lisattavaPelaaja, pisteet: 0});
        }
        
        let teksti = "<ol>";
        for (let i = 0; i < pelaajaLista.length; i++) {
            teksti += "<li>" + pelaajaLista[i].nimi + "</li>";
        }
        teksti += "</ol>";
        document.getElementById("listaus").innerHTML = teksti;
        
    }
    
    if (lisattavaPelaaja == "") {
        ilmoitus.innerHTML = "Pelaajan nimi ei saa olla tyhjä";
    }
    
}

function tarkistaListanSisalto (arr, nimi)  {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].nimi === nimi) {
            ilmoitus.innerHTML = "Tämän niminen pelaaja on jo listattu";
            return false;
        }
    }

    return true;
}

form.addEventListener('submit', (Event) => {
    Event.preventDefault();
    lisaaPelaaja(form)
})


// Pelin aloitus

function aloitaPeli() {

    if(pelaajaLista.length < 2) {
        ilmoitus.innerHTML = "Pelaajia pitää olla vähintään kaksi"
    } else {
        ilmoitus.innerHTML = ""
        
        let pelaajienAsettaminen = document.getElementById("pelaajienAsettaminen");
        pelaajienAsettaminen.style.display = "none";
    
        let nopat = document.getElementById("Nopat");
        nopat.style.display = "block";

    }

    if (noppienMaara == 1) {
        let noppaKuva = document.getElementById("noppaKuva");
        noppaKuva.style.display = "block";

        document.getElementById("NaytaVoittoPistemaara").style.display = "block";
    } else {
        let noppaKuvat = document.getElementById("noppaKuvat");
        noppaKuvat.style.display = "block";

        document.getElementById("NaytaVoittoPistemaara").style.display = "block";
    }
    
    
};


// Yhden ja kahden nopan logiikkaa
const kolmeTuplaa = [];
let pelaajaIndeksi = 0;
let lisattavatPisteet = 0;


function tarkistaVoittaja(pisteet) {
    if (pisteet >= voittoPistemaara) {
        return true
    }
    return false
}

// Peli kahdella nopalla

// Kahden nopan logiikka
function tarkistaHeitot() {
    if (kolmeTuplaa.length == 3) {
        return true;
    } else {
        return false;
    }
}

function heitaNoppia() {
    // ensimmäinen noppa
    const satunnainenNumero1 = Math.floor(Math.random() * 6) + 1;
    const ensimmainenNoppaKuva = 'Noppa/dice' + satunnainenNumero1 + '.png';
    document.querySelectorAll("img.NoppaKuvatKaksi")[0].setAttribute("src", ensimmainenNoppaKuva)
    
    // toinen noppa
    const satunnainenNumero2 = Math.floor(Math.random() * 6) + 1;
    const toinenNoppaKuva = 'Noppa/dice' + satunnainenNumero2 + '.png';
    document.querySelectorAll("img.NoppaKuvatKaksi")[1].setAttribute("src", toinenNoppaKuva)
    
    document.getElementById("vuoro").innerHTML = "Pelaajan " + pelaajaLista[pelaajaIndeksi].nimi + " vuoro";
    
    if(!(satunnainenNumero1 == 1 && satunnainenNumero2 != 1 || satunnainenNumero1 != 1 && satunnainenNumero2 == 1)) {
        // Päätellään lisättävä pistemäärä
        if(satunnainenNumero1 == 1 && satunnainenNumero2 == 1) {
            lisattavatPisteet += 25;
            kolmeTuplaa.length = 0;
        } else if(satunnainenNumero1 == satunnainenNumero2) {
            lisattavatPisteet += satunnainenNumero1 * 2 + satunnainenNumero2 * 2;
            kolmeTuplaa.push(lisattavatPisteet);
        } else {
            lisattavatPisteet += satunnainenNumero1 + satunnainenNumero2;
            kolmeTuplaa.length = 0;
        }
        
        // tarkistetaan kolme viimeistä heittoa ja jos ne ovat tuplat nykyinen pelaaja ei saa pisteitä ja vuoro vaihtuu.
        if(tarkistaHeitot == true) {
            lisattavatPisteet = 0;
            pelaajaIndeksi++;
            if(pelaajaIndeksi >= pelaajaLista.length) {
                pelaajaIndeksi = 0;
            }

            document.getElementById("vuoro").innerHTML = "Pelaajan " + pelaajaLista[pelaajaIndeksi].nimi + " vuoro";
            document.getElementById("lisattavatPisteet").innerHTML = "Lisättävät pisteet " + 0;
    
            let teksti = "<ol>";
            for (let i = 0; i < pelaajaLista.length; i++) {
                teksti += "<li>" + pelaajaLista[i].nimi + " - " + pelaajaLista[i].pisteet + " pistettä" + "</li>";
            }
            teksti += "</ol>";
            document.getElementById("pisteet").innerHTML = teksti;

            kolmeTuplaa.length = 0;

        } else {
            document.getElementById("lisattavatPisteet").innerHTML = "Lisättävät pisteet " + lisattavatPisteet;
        }

    } else {
        kolmeTuplaa.length = 0;
        lisattavatPisteet = 0;
        pelaajaIndeksi++;

        if(pelaajaIndeksi >= pelaajaLista.length) {
            pelaajaIndeksi = 0;
        }

        document.getElementById("vuoro").innerHTML = "Pelaajan " + pelaajaLista[pelaajaIndeksi].nimi + " vuoro";
        document.getElementById("lisattavatPisteet").innerHTML = "Lisättävät pisteet " + 0;

        let teksti = "<ol>";
        for (let i = 0; i < pelaajaLista.length; i++) {
            teksti += "<li>" + pelaajaLista[i].nimi + " - " + pelaajaLista[i].pisteet + " pistettä" + "</li>";
        }
        teksti += "</ol>";
        document.getElementById("pisteet").innerHTML = teksti;
        
    }
}

// Heitä
let heitaKahtaNoppaa = document.getElementById("heitaNoppia");
heitaKahtaNoppaa.addEventListener('click', () => {
    heitaNoppia();

    let teksti = "<ol>";
    for (let i = 0; i < pelaajaLista.length; i++) {
        teksti += "<li>" + pelaajaLista[i].nimi + " - " + pelaajaLista[i].pisteet + " pistettä" + "</li>";
    }
    teksti += "</ol>";
    document.getElementById("pisteet").innerHTML = teksti;
});

// Lopeta vuoro
let lopetaVuoroKaksiNoppaa = document.getElementById("lopetaVuoro2");
lopetaVuoroKaksiNoppaa.addEventListener('click', () => {

    pelaajaLista[pelaajaIndeksi].pisteet += lisattavatPisteet;
    if (tarkistaVoittaja(pelaajaLista[pelaajaIndeksi].pisteet)) {
        document.getElementById("voittoIlmoitus").innerHTML = "Pelaaja " + pelaajaLista[pelaajaIndeksi].nimi + " voitti pelin!";
        document.getElementById("Nopat").style.display = "none";
        document.getElementById("voittaminen").style.display = "block";

        let teksti = "<ol>";
        for (let i = 0; i < pelaajaLista.length; i++) {
            teksti += "<li>" + pelaajaLista[i].nimi + " - " + pelaajaLista[i].pisteet + " pistettä" + "</li>";
        }
        teksti += "</ol>";
        document.getElementById("pisteLista").innerHTML = teksti;
    }
    lisattavatPisteet = 0;
    pelaajaIndeksi++;

    if (pelaajaIndeksi >= pelaajaLista.length) {
        pelaajaIndeksi = 0;
    }
    
    document.getElementById("vuoro").innerHTML = "Pelaajan " + pelaajaLista[pelaajaIndeksi].nimi + " vuoro";
    document.getElementById("lisattavatPisteet").innerHTML = 0;

    // Näytä pelaajalista
    let teksti = "<ol>";
    for (let i = 0; i < pelaajaLista.length; i++) {
        teksti += "<li>" + pelaajaLista[i].nimi + " - " + pelaajaLista[i].pisteet + " pistettä" + "</li>";
    }
    teksti += "</ol>";
    document.getElementById("pisteet").innerHTML = teksti;
    
});


// Peli yhdellä nopalla

// Yhden nopan logiikka
function heitaNoppaa() {
    const satunnainenNumero1 = Math.floor(Math.random() * 6) + 1;
    const ensimmainenNoppaKuva = 'Noppa/dice' + satunnainenNumero1 + '.png';
    document.querySelectorAll("img.NoppaKuvatYksi")[0].setAttribute("src", ensimmainenNoppaKuva)

    document.getElementById("vuoro").innerHTML = "Pelaajan " + pelaajaLista[pelaajaIndeksi].nimi + " vuoro";

    if(satunnainenNumero1 != 1) {
        lisattavatPisteet += satunnainenNumero1
        document.getElementById("lisattavatPisteet").innerHTML = "Lisättävät pisteet " + lisattavatPisteet;
    } else {
        lisattavatPisteet = 0;
        pelaajaIndeksi++;

        if(pelaajaIndeksi >= pelaajaLista.length) {
            pelaajaIndeksi = 0;
        }

        document.getElementById("vuoro").innerHTML = "Pelaajan " + pelaajaLista[pelaajaIndeksi].nimi + " vuoro";
        document.getElementById("lisattavatPisteet").innerHTML = "Lisättävät pisteet " + 0;

        let teksti = "<ol>";
        for (let i = 0; i < pelaajaLista.length; i++) {
            teksti += "<li>" + pelaajaLista[i].nimi + " - " + pelaajaLista[i].pisteet + " pistettä" + "</li>";
        }
        teksti += "</ol>";
        document.getElementById("pisteet").innerHTML = teksti;
    }
}

// Heitä
let heitaYhtaNoppaa = document.getElementById("heitaNoppaa");
heitaYhtaNoppaa.addEventListener('click', () => {
    heitaNoppaa();

    let teksti = "<ol>";
    for (let i = 0; i < pelaajaLista.length; i++) {
        teksti += "<li>" + pelaajaLista[i].nimi + " - " + pelaajaLista[i].pisteet + " pistettä" + "</li>";
    }
    teksti += "</ol>";
    document.getElementById("pisteet").innerHTML = teksti;
});

// Lopeta vuoro
let lopetaVuoroYksiNoppa = document.getElementById("lopetaVuoro1");
lopetaVuoroYksiNoppa.addEventListener('click', () => {
    // Lisää pisteet pelaajalle ja nollaa lisattavatpisteet ja muuta pelaajaindeksi
    pelaajaLista[pelaajaIndeksi].pisteet += lisattavatPisteet;
    
    if (tarkistaVoittaja(pelaajaLista[pelaajaIndeksi].pisteet)) {
        document.getElementById("voittoIlmoitus").innerHTML = "Pelaaja " + pelaajaLista[pelaajaIndeksi].nimi + " voitti pelin!";
        document.getElementById("Nopat").style.display = "none";
        document.getElementById("voittaminen").style.display = "block";

        let teksti = "<ol>";
        for (let i = 0; i < pelaajaLista.length; i++) {
            teksti += "<li>" + pelaajaLista[i].nimi + " - " + pelaajaLista[i].pisteet + " pistettä" + "</li>";
        }
        teksti += "</ol>";
        document.getElementById("pisteLista").innerHTML = teksti;
    }

    lisattavatPisteet = 0;
    pelaajaIndeksi++;
    
    if (pelaajaIndeksi >= pelaajaLista.length) {
        pelaajaIndeksi = 0;
    }
    
    document.getElementById("vuoro").innerHTML = "Pelaajan " + pelaajaLista[pelaajaIndeksi].nimi + " vuoro";
    document.getElementById("lisattavatPisteet").innerHTML = 0;

    // Näytä pelaajalista
    let teksti = "<ol>";
    for (let i = 0; i < pelaajaLista.length; i++) {
        teksti += "<li>" + pelaajaLista[i].nimi + " - " + pelaajaLista[i].pisteet + " pistettä" + "</li>";
    }
    teksti += "</ol>";
    document.getElementById("pisteet").innerHTML = teksti;
    
});
