

class CoolorPicker {
    constructor() {
        this.colorDivs = document.querySelectorAll('.color');
        this.currentHexes = document.querySelectorAll('.color h2');
        this.generateBtn = document.querySelectorAll('.generate');
        this.sliders = document.querySelectorAll('input[type="range"]')
        this.initialColors;
    }


    //Methods
    //Bulding HexColor Gen with out library 
    /*     generateHex() {
            const hexLetters = '0123456789ABCDEF'
            let hash = '#'
            for (let i = 0; i < 6; i++) {
                hash += hexLetters[Math.floor(Math.random() * 16)]
    
            }
            return hash;
        } */

    // Bulidng HexColor Gen with library :D 10x faster
    hexGenerator() {
        const hexletters = chroma.random();
        return hexletters
    }

    randomColors() {
        this.colorDivs.forEach(div => {
            // we catch the div children element
            const hexText = div.children[0];
            // we declare random variable to get generateHex function
            const randomColor = this.hexGenerator()
            // We set into Hex text the random color also we make it as abckground
            div.style.backgroundColor = randomColor;
            hexText.innerHTML = randomColor;
            // we check the luminance of the color 
            this.checkTextContrast(randomColor, hexText)
        })
    }

    checkTextContrast(color, text) {
        const luminance = chroma(color).luminance();
        if (luminance > 0.5) {
            text.style.color = 'black'
        } else {
            text.style.color = "white"
        }

    }
}







let randomHex = new CoolorPicker();
console.log(randomHex.randomColors());