
this.colorDivs = document.querySelectorAll('.color');


class CoolorPicker {
    constructor(colorDivs) {
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

            //Initial Colorize Sliders
            const color = chroma(randomColor)
            const sliders = div.querySelectorAll('.sliders input')
            const hue = sliders[0];
            const brightness = sliders[1];
            const saturation = sliders[2];
            this.colorizeSliders(color, hue, brightness, saturation)
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
    colorizeSliders(color, hue, brightness, saturation) {
        //Scale Saturation
        const noSat = color.set('hsl.s', 0);
        const fullSat = color.set('hsl.s', 1);
        const scaleSat = chroma.scale([noSat, color, fullSat]);

        //Scale Brightness
        const midBright = color.set('hsl.l', 0.5);
        const scaleBright = chroma.scale(['black', midBright, 'white'])

        // Scale hue
        /* Its all colors no need to sue chroma functions  */

        // update inputs colors 
        brightness.style.background = `linear-gradient(to right,
                ${scaleBright(0)},${scaleBright(0.5)},${scaleBright(1)})`;

        saturation.style.background = `linear-gradient(to right,
                    ${scaleSat(0)},${scaleSat(1)})`;

        hue.style.backgroundImage = `linear-gradient(to right, 
         #FF0000,#FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)`;
    }


}









let randomHex = new CoolorPicker();
randomHex.randomColors()

//Events
// Hsl Control we get the data attribute
// Event Listiner 

randomHex.sliders.forEach(slider => {
    slider.addEventListener('input', function (e) {
        // we sort hs control by index number like 0 1 2 3 4 5 
        const index = e.target.getAttribute('data-hue') ||
            e.target.getAttribute('data-brigth') ||
            e.target.getAttribute('data-Satu');
        let sliders = e.target.parentElement.querySelectorAll('input[type="range"]')
        const hue = sliders[0];
        const brigth = sliders[1];
        const satu = sliders[2];
        const bgColor = colorDivs[index].querySelector("h2").innerText;

        let color = chroma(bgColor)
            .set('hsl.h', hue.value)
            .set('hsl.l', brigth.value)
            .set('hsl.s', satu.value);
            colorDivs[index].style.backgroundColor=color;

    })
})