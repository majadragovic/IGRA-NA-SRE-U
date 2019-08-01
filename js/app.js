Vue.component('section1',{
    data: function () {
        return {
            numbers: [{value: '1', isSelected: false}, {value: '2', isSelected: false}, {value: '3', isSelected: false},
                      {value: '4', isSelected: false}, {value: '5', isSelected: false}, {value: '6', isSelected: false},
                      {value: '7', isSelected: false}, {value: '8', isSelected: false}, {value: '9', isSelected: false},
                      {value: '10', isSelected: false}, {value: '11', isSelected: false}, {value: '12', isSelected: false},
                      {value: '13', isSelected: false}, {value: '14', isSelected: false}, {value: '15', isSelected: false},
                      {value: '16', isSelected: false}, {value: '17', isSelected: false}, {value: '18', isSelected: false},
                      {value: '19', isSelected: false}, {value: '20', isSelected: false}, {value: '21', isSelected: false},
                      {value: '22', isSelected: false}, {value: '23', isSelected: false}, {value: '24', isSelected: false},
                      {value: '25', isSelected: false}, {value: '26', isSelected: false}, {value: '27', isSelected: false},
                      {value: '28', isSelected: false}, {value: '29', isSelected: false}, {value: '30', isSelected: false}],
            cell: [],
            choosenNumbers: [],
            numberOfSelection : 0
        }
      },
      props: [''],
      methods: {
        chooseNumber(number){
          var allSelectedNumbersArray = this.numbers.filter(this.isSelected);
          var noSelectedNumbers = allSelectedNumbersArray.length;
          if (noSelectedNumbers < 5){
             number.isSelected = !number.isSelected;
          } 
        },
        isSelected(number) {
          return number.isSelected;
        },
        createTicket(event){
          var allSelectedNumbersArray = this.numbers.filter(this.isSelected);
          this.$emit('createTicket', allSelectedNumbersArray);
          allSelectedNumbersArray.forEach(function(number) {
            number.isSelected = false;
          });
        }
      },
      template:`
      <div class="sekcija_1"><button
      class="is-gray" 
      v-for="number in numbers"
      @click = "chooseNumber(number)"
      v-bind:class="{ 'is-green' : number.isSelected == true }">
        {{ number.value }}
      </button>
      <button class="button_2"
        @click="createTicket">DODAJ TIKET
      </button>
      </div>
    `,      
    }); 

    Vue.component('section2', {
      data: function () {
        return {
          
        }
      },
      props: ['numbers'], 
      methods: {
        
      },
        
      template: `<div>
                 </div>`
    });  

    Vue.component('section3', {
      data: function () {
        return {
          
        }
      },
        
      props: 
      [ 'numbers' ]
      ,
   
      template: `<div>
      <div class="tiket">
      <div v-for="ticket in numbers" v-bind:class="{ 'is-green' : ticket.isWining == true }">
      <button 
      class="is-gray" 
      v-for="number in ticket.ticketNumbers">
        {{ number.value }}
      </button>
      <!-- kvota: {{ 2 * ticket.ticketNumbers.length }} -->
     </div>
      </div>
      </div>`
    });  

var vm = new Vue({
    el: '#app',
    data: {
        allTickets: [],
        winingNumbers: []
    },

    methods: {
      createTicket (ticket) {        
        if (this.allTickets.length < 5){
          var ticketObject = {ticketNumbers: [], isWining: false};
          ticketObject.ticketNumbers = ticket; 
          this.allTickets.push(ticketObject);
        }        
      },
      generateCombination: function () {
        this.getRandomNumbers(0);
      },

      getRandomNumbers(counter){
        if(counter < 12){
          setTimeout(function(){
            counter++;
            var myRandom = Math.round(Math.random() * 29) + 1;
            if (this.winingNumbers.includes(myRandom) == false){ 
              this.winingNumbers.push(myRandom);
            } else {
              counter--;
            }
            this.getRandomNumbers(counter);
          }.bind(this), 2000);
        }
        this.winingNumbers.sort(function(a, b){return a-b});
        this.markWiningTickets();     
      },
     
     markWiningTickets() {
      function isWiningTicket(currentValue) {
        return this.winingNumbers.indexOf(parseInt(currentValue.value, 10)) > -1
     }

      var that = this;
      this.allTickets.forEach(function(obj) {     
        var arr1 = obj.ticketNumbers;
        var isWining = arr1.every(isWiningTicket, that);
        obj.isWining = isWining;   
      }); 
    },

    resetGame() {
       this.winingNumbers = [];
       this.allTickets = [];
    }
   },
    template: `<div class="app">
    <div class="sekcija_3">
      <button
        class="is-gray" 
        v-for="number in winingNumbers">
        {{ number }}
      </button>
    </div>
    <section1 @createTicket="createTicket"></section1>
    <section2></section2>
    <section3 v-bind:numbers="allTickets"></section3>
    <button class="button_3"
        v-if="this.allTickets.length == 5"
        @click="generateCombination"
      >ODIGRAJ</button>
      <button class="button_3"
        v-if="this.winingNumbers.length == 12"
        @click="resetGame"
      >RESET</button>
    </div>`
  });