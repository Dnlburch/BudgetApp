//Budget Controller
var budgetController = (function() {

    var Expense = function(id, description, value){
      this.id = id;
      this.description = description;
      this.value = value
    };

    var Income = function(id, description, value){
      this.id = id;
      this.description = description;
      this.value = value
    };

    var data = {
      allItems: {
        exp: [],
        inc: [],
      },
      totals: {
        exp: 0,
        inc: 0,
      }
    };

    return {
      addItem: function(type, des, val){
        var newItem, id;
        //create new // IDEA:
        if (data.allItems[type].length > 0){
        id = data.allItems[type][data.allItems[type].length-1].id + 1;
      } else {
        id = 0;
      }
        //create new item based on inc or exp
        if (type === 'exp'){
          newItem = new Expense (id, des, val);
        } else if (type === 'inc') {
          newItem = new Income(id, des, val);
        }

        //push it into data structure
        data.allItems[type].push(newItem);
        //return new element
        return newItem;
      }

    };

}());



//UI Controller
var UIController = (function() {
  var DOMstrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputBtn: '.add__btn',
      incomeContainer: '.income__list',
      expenseContainer: '.expense__list'
  }

  return {
    getInput: function(){
        return {
          type: document.querySelector(DOMstrings.inputType).value, //Will be inc or exp
          description: document.querySelector(DOMstrings.inputDescription).value, //Description of input
          value: document.querySelector(DOMstrings.inputValue).value, //Gets input value
        };
      },

      addListItem: function (object, type){
        var html, newHtml, element;
        //create html string with placeholder text
        if (type === 'inc'){
          element = DOMstrings.incomeContainer;

          html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else {
        element = DOMstrings.expenseContainer;

        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }
        //replace placeholder text with data
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);
        //insert html into DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
      },

      getDOMstrings: function (){
        return DOMstrings;
      }

    };

}());






//Global app controller
var controller = (function(budgetCtrl, uiCtrl) {

    var setupEventListeners = function (){
      var DOM = UIController.getDOMstrings();

      document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

      document.addEventListener('keypress', function(event){
        if (event.keyCode === 13 || event.which === 13){
          ctrlAddItem();
        }
    });
  };


  var ctrlAddItem = function (){
    var input, newItem;

    //get input data
    var input = uiCtrl.getInput();

    //add item to budget Controller
    budgetCtrl.addItem(input.type, input.description, input.value);

    //add new item to ui
    uiCtrl.addListItem(newItem, input.type);

    //calculate budget


    //display budget on ui

  };

  return {
    init: function(){
      console.log('app started');
      setupEventListeners();
    }
  };

})(budgetController,UIController);

controller.init();
