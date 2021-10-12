//Booking
let buyNow = document.getElementById("buy-now");
let closeModal = document.getElementById("modal-exit");
let overlay = document.getElementById('overlayBG')

buyNow.onclick = () =>{
    document.getElementById("modal-window").classList.toggle("buy-now-modal");
    overlay.style.display = 'block'
};
closeModal.onclick = () =>{
    document.getElementById("modal-window").classList.toggle("buy-now-modal");
    overlay.style.display = 'none'
};
overlay.onclick = () => {
    document.getElementById("modal-window").classList.toggle("buy-now-modal");
    overlay.style.display = 'none'
}

(function(){
    const blocks = document.querySelectorAll("#galleryImg img")
    const arrImg = ["gallery1.jfif", "gallery2.jfif", "gallery3.jfif", "gallery4.jfif", "gallery5.jfif", "gallery6.jfif", "gallery7.jfif", "gallery8.jfif", "gallery9.jfif", "gallery10.jfif", "gallery12.jfif", "gallery15.jfif"];
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    for(let item of blocks){
        let rand = randomIntFromInterval(0, arrImg.length-1);
        item.src = "images/" + arrImg[rand];
        arrImg.splice(rand, 1);
    }
})();



class BookingCalculator{
    #cost = [20, 25, 40]
    constructor(){
        this.ticketRadio = Array.from(document.querySelectorAll('.ticket-type input'))
        this.ticketBasic = document.getElementById("basicTicketAmount")
        this.ticketSenior = document.getElementById("seniorTicketAmount")
        this.totalPrice = document.getElementById("totalPrice")
        this.ticketButtons = Array.from(document.querySelectorAll(".amount button:not(#buy-now), .entry-ticket-amount button "))

        //Modal
        this.modalDate = document.getElementById("modalDate")
        this.modalTime = document.getElementById("modalTime")
        this.modalDateText = document.getElementById("modalDateText")
        this.modalTimeText = document.getElementById("modalTimeText")
        this.modalExhibitionText = document.getElementById("modalSelectText")
        this.modalSelect = document.getElementById("modalSelect")
        this.modalLeftBasicInput = document.getElementById("modalLeftBasicInput")
        this.modalLeftSeniorInput = document.getElementById("modalLeftSeniorInput")
        this.modalLeftBasicCost = document.getElementById("modalLeftBasicCost")
        this.modalLeftSeniorCost = document.getElementById("modalLeftSeniorCost")
        this.modalRightBasicAmount = document.getElementById("modalRightBasicAmount")
        this.modalRightBasicCost = document.getElementById("modalRightBasicTicketCost")
        this.modalRightBasicTotalCost = document.getElementById("modalRightBasicTotalCost")
        this.modalRightSeniorAmount = document.getElementById("modalRightSeniorAmount")
        this.modalRightSeniorCost = document.getElementById("modalRightSeniorTicketCost")
        this.modalRightSeniorTotalCost = document.getElementById("modalRightSeniorTotalCost")
        this.modalRightTotal = document.getElementById("modalRightTotal")

        //Radio Synchronization
        this.ticketRadio.forEach(e => {
            e.onclick = () => {
                if (!e.checked) e.checked = true
                this.modalSelect.value = e.value
                this.setCostText()
            }
        })
        this.modalSelect.onchange = () =>{
            this.ticketRadio[this.modalSelect.value].checked = true

            this.setCostText()
        }

        //Input synchronization
        this.modalLeftBasicInput.onchange = () => {
            this.ticketBasic.value = this.modalLeftBasicInput.value
            this.setCostText()
        }
        this.modalLeftSeniorInput.onchange = () => {
            this.ticketSenior.value = this.modalLeftSeniorInput.value
            this.setCostText()
        }
        this.ticketBasic.onchange = () => {
            this.modalLeftBasicInput.value = this.ticketBasic.value
            this.setCostText()
        }
        this.ticketSenior.onchange = () => {
            this.modalLeftSeniorInput.value = this.ticketSenior.value
            this.setCostText()
        }


        for (let i = 0; i < this.ticketButtons.length; i++) {
            const event = new Event("change")
            if (i%2) {
                this.ticketButtons[i].onclick = function(e) {
                    this.previousElementSibling.stepUp()
                    this.previousElementSibling.dispatchEvent(event)
                }
            }
            else{
                this.ticketButtons[i].onclick = function(e) {
                    this.nextElementSibling.stepDown()
                    this.nextElementSibling.dispatchEvent(event)
                }
            }
        }

        //Time-Date
        Array.from(document.querySelectorAll("#timeList option")).forEach(e=> {
            e.onclick = () => {
                this.modalTime.dispatchEvent(new Event("change"))
            }
        })

        this.modalTime.onchange = () => {
            this.modalTimeText.innerText = this.modalTime.value.split(":").join(" : ")
        }

        const date = new Date()
        this.modalDate.min = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()<10?'0'+date.getDate():date.getDate()}`

        this.modalDate.oninput = () => {
            this.modalDateText.innerText = new Date(this.modalDate.value).toLocaleString('en-US', {
                weekday: "long",
                month: "long",
                day: "numeric"
            })
        }

    }


    calculate(){
        return +this.calculateBasic() + +this.calculateSenior()
    }

    calculateBasic(){
        return this.#cost[+this.modalSelect.value]*this.modalLeftBasicInput.value
    }
    calculateSenior(){
        return ((this.#cost[+this.modalSelect.value]/2)*this.modalLeftSeniorInput.value).toFixed()
    }



    setCostText(){
        const basicCost = this.#cost[+this.modalSelect.value]
        this.modalLeftBasicCost.innerText = basicCost
        this.modalLeftSeniorCost.innerText = (basicCost/2).toFixed()
        this.modalRightBasicCost.innerText = basicCost
        this.modalRightSeniorCost.innerText = (basicCost/2).toFixed()

        this.modalRightBasicAmount.innerText = this.modalLeftBasicInput.value
        this.modalRightSeniorAmount.innerText = this.modalLeftSeniorInput.value

        this.modalRightBasicTotalCost.innerText = this.calculateBasic()
        this.modalRightSeniorTotalCost.innerText = this.calculateSenior()
        this.modalRightTotal.innerText = this.calculate()

        this.ticketBasic.value = this.modalRightBasicAmount.innerText
        this.ticketSenior.value = this.modalRightSeniorAmount.innerText
        this.totalPrice.innerText = this.calculate()

        this.modalExhibitionText.innerText = this.modalSelect.querySelector(`option[value="${this.modalSelect.value||0}"]`).innerText

        this.save()
    }
    save() {
        window.localStorage.tickets = JSON.stringify({
            type: this.modalSelect.value||0,
            basic: this.modalLeftBasicInput.value,
            senior: this.modalLeftSeniorInput.value
        })
    }
    load() {
        if (!window.localStorage.tickets) return
        const data =  JSON.parse(window.localStorage.tickets)
        console.log(data)
        this.modalSelect.value = data.type
        this.modalSelect.dispatchEvent(new Event('change'))
        this.modalLeftBasicInput.value = data.basic
        this.modalLeftSeniorInput.value  = data.senior
    }
}

const bookingCalculator = new BookingCalculator()
bookingCalculator.load()
bookingCalculator.setCostText()








