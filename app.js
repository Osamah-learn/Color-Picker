



class CoolorPicker {
    constructor() {
        this.colorDivs = document.querySelectorAll('.color');
        this.currentHexes = document.querySelectorAll('.color h2');
        this.generateBtn = document.querySelectorAll('.generate');
        this.sliders = document.querySelectorAll('input[type="range"]');
        this.popup = document.querySelector('.copy-container')
        this.initialColors;
        this.adjustButton = document.querySelectorAll('.adjust');
        this.closeAdjustments = document.querySelectorAll('.close-adjustment');
        this.sliderContainers = document.querySelectorAll('.sliders');
    }




    /*Methods */



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
        // we push inital color to array
        this.initialColors = []
        this.colorDivs.forEach(div => {
            // we catch the div children element
            const hexText = div.children[0];
            // we declare random variable to get generateHex function
            const randomColor = this.hexGenerator()
            //Add it to the array
            this.initialColors.push(chroma(randomColor).hex())

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
            this.ColoriseSliders(color, hue, brightness, saturation)
            // reset inputs

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
    ColoriseSliders(color, hue, brightness, saturation) {
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

        saturation.value = color.hsl()[1];
        brightness.value = color.hsl()[2];
        hue.value = color.hsl()[0];
    }

    updateTextUi(index) {
        const activeDiv = this.colorDivs[index]
        const color = chroma(activeDiv.style.backgroundColor)
        const textHex = activeDiv.querySelector('h2');
        const icons = activeDiv.querySelectorAll('.controls button')
        textHex.innerHTML = color.hex()
        // Check contract
        this.checkTextContrast(color, textHex);
        // Check contract
        for (const icon of icons) {
            this.checkTextContrast(color, icon);
        }
    }

    copyToClipboard(hex){
      const el= document.createElement('textarea');
      el.value = hex.innerText;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      // Pop Up animation
      this.poppingUp()
      
    }
    // show poppingup after copy the hex color 
     poppingUp() {
        this.popup.classList.add("active");
        setTimeout(() => {
            this.popup.classList.remove("active");
        }, 500);
      }
      // show and hide sliders 
      openAdjustmentPanel(index){
        this.sliderContainers[index].classList.toggle('active')
        // close the adjustment button 
        this.sliderContainers[index].children[0].addEventListener("click", (e) => {
            this.sliderContainers[index].classList.remove("active");
          });
      }
}






// create New object 
let start = new CoolorPicker();
start.randomColors()

/* Events */

// Hsl Control we get the data attribute
start.sliders.forEach(slider => {
    slider.addEventListener('input', function (e) {
        // we sort hs control by index number like 0 1 2 3 4 5 
        const index = e.target.getAttribute('data-hue') ||
            e.target.getAttribute('data-brigth') ||
            e.target.getAttribute('data-Satu');
        let sliders = e.target.parentElement.querySelectorAll('input[type="range"]')
        const hue = sliders[0];
        const brigth = sliders[1];
        const satu = sliders[2];
        const bgColor = start.initialColors[index];
        console.log(`inital array ${bgColor}`);

        let color = chroma(bgColor)
            .set('hsl.h', hue.value)
            .set('hsl.l', brigth.value)
            .set('hsl.s', satu.value);
            start.colorDivs[index].style.backgroundColor = color;
//Colorize inputs // sliders 
start.ColoriseSliders(color,hue,brigth,satu)
    })
})

start.colorDivs.forEach((div, index) => {
    div.addEventListener('change', function () {
        start.updateTextUi(index)
    })
})

// Add event listnor to current Hex for show active copy Popup
start.currentHexes.forEach(hex => {
    hex.addEventListener('click',()=>{
        start.copyToClipboard(hex);
    })
})

// Add event listner for each adjustbutton to apply our function

start.adjustButton.forEach((button,index)=>{
    button.addEventListener('click',()=>{
        start.openAdjustmentPanel(index)
        console.log('Clicked');
    })
})