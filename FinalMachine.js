
let currentState='q1'; //начальное состояние

const readline = require('readline');

// Создаем интерфейс
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//функция для проверки подцепочки 
//изначально мы находимся в состоянии q1, читаем символ и идет по дка
const tabl=new Map([
        ['q1', (symbol) => {if(symbol=='~') return 'q2';
                            else if(symbol=="a") return '0';
                            else if(symbol=="b") return '0';
                            return 'Error';
                            }],
        ['q2', (symbol) => {if(symbol=='~') return 'f';
                            else if(symbol=="a") return 'q3';
                            else if(symbol=="b") return '0';
                            return 'Error';
                            }],
        ['q3', (symbol) => {if(symbol=='~') return '0';
                            else if(symbol=="a") return 'q4';
                            else if(symbol=="b") return 'q5';
                            return 'Error';
                            }],
        ['q4', (symbol) => {if(symbol=='~') return '0';
                            else if(symbol=="a") return 'q3';
                            else if(symbol=="b") return 'q6';
                            return 'Error';
                            }],
        ['q5', (symbol) => {if(symbol=='~') return '0';
                            else if(symbol=="a") return '0';
                            else if(symbol=="b") return 'q6';
                            return 'Error';
                            }],
        ['q6', (symbol) => {if(symbol=='~') return 'f';
                            else if(symbol=="a") return 'q3';
                            else if(symbol=="b") return '0';
                            return 'Error';
                            }],
        ['f', () => {return 'f';
                            }],
        ['0', () => {return '0';
                            }]
]);

rl.question('Введите строку: ', (input) => {
  let count=1;
  let num_index1=0;
  let num_index2=0;
  let itog_chain;


  //ищем подцепочку
  for(let i=0;i<input.length;++i){
    const symbol=input[i];

    //проверка на правильность ввода цепочки
    if(symbol!='~' && symbol!='a' && symbol!='b'){
      console.log("Неизвестный символ: ",symbol);
      break;
    }
    
    if(symbol==='~'){
      if(count===1){
        ++count;
        num_index1=i;
      }else if(count===2){
        num_index2=i;
        break;
      }
    }
  }

  //проверяем что нашли два ~~
  if(num_index1!=undefined && num_index2!=undefined){
    console.log(num_index1+1);
    itog_chain=input.slice(num_index1,num_index2+1);
  }else{
    console.log("Не нашлось '~~' ");
    rl.close();
    return;
  }

  //проверка подцепочки 
  for(let symbol of itog_chain){
    //проверяем корректность работы функции
    const transitionFunction=tabl.get(currentState);
    if(typeof transitionFunction==='function'){
      currentState = transitionFunction(symbol);
    }else{
      console.log("Нет функции перехода для состояния: ",currentState);
      break;
    }

    //если мы попадаем в состояние '0', то просто переходим к следующему символу, так как подцепочка не подошла
    if(currentState==='0'){
      continue;
    }
    if(currentState==='Error'){
      console.log("Ошибка в цепочке");
    }
    //цепочка успешно обработана
    else if(currentState==='f'){
      console.log(itog_chain);
      break;
    }
  }

  // Закрываем интерфейс
  rl.close();
});



