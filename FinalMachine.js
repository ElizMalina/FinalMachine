const readline = require('readline');

//начальное состояние
let currentState='q1'; 

//cоздаем интерфейс
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//подпрограмма(распознающий КА)
const KA=new Map([
        ['q1', (symbol) => {if(symbol=='~') return 'q2';
                            else if(symbol=="a") return '0';
                            else if(symbol=="b") return '0';
                            }],
        ['q2', (symbol) => {if(symbol=='~') return 'f';
                            else if(symbol=="a") return 'q3';
                            else if(symbol=="b") return '0';
                            }],
        ['q3', (symbol) => {if(symbol=='~') return '0';
                            else if(symbol=="a") return 'q4';
                            else if(symbol=="b") return 'q5';
                            }],
        ['q4', (symbol) => {if(symbol=='~') return '0';
                            else if(symbol=="a") return 'q3';
                            else if(symbol=="b") return 'q6';
                            }],
        ['q5', (symbol) => {if(symbol=='~') return '0';
                            else if(symbol=="a") return '0';
                            else if(symbol=="b") return 'q6';
                            }],
        ['q6', (symbol) => {if(symbol=='~') return 'f';
                            else if(symbol=="a") return 'q3';
                            else if(symbol=="b") return '0';
                            }],
        ['f', () => {return 'f';
                            }],
        ['0', () => {return '0';
                            }]
]);

//программа поиска цепочек этого языка в последовательности символов
rl.question("Введите последоватеьность символов алфавита регулярного языка: ", (input) => {
  let index=0;

  while(index<input.length){
    let count=1;
    let index_first= undefined;
    let index_last= undefined;
    let itog_chain;

    //ищем цепочку
    for(;index<input.length;++index){
      const symbol=input[index];

      //проверка на правильность ввода цепочки
      if(symbol!='~' && symbol!='a' && symbol!='b'){
        console.log("Неизвестный символ: ",symbol);
        break;
      }
      
      if(symbol==='~'){
        if(count===1){
          ++count;
          index_first=index;
        }else if(count===2){
          index_last=index;
          break;
        }
      }
    }

    //проверяем что нашли префикс и суффикс
    if(index_first!=undefined && index_last!=undefined){
      itog_chain=input.slice(index_first,index_last+1);
    }else{
      rl.close();
      return;
    }

    currentState='q1';

    //проверка цепочки в КА
    for(let symbol of itog_chain){
      //проверяем корректность работы функции
      const transitionFunction=KA.get(currentState);
      if(typeof transitionFunction==='function'){
        currentState = transitionFunction(symbol);
      }else{
        console.log("Нет функции перехода для состояния: ",currentState);
        break;
      }

      //если мы попадаем в состояние '0', то переходим к следующему символу, так как подцепочка не подошла
      if(currentState==='0'){
        continue;
      }
      //цепочка успешно обработана
      else if(currentState==='f'){
        console.log(index_first+1+": ",itog_chain);
        break;
      }
    } 

    //далее начинаем рассматривать последовательность, начиная с суффикса обработанной цепочки
    index=index_last; 
  }

  // Закрываем интерфейс
  rl.close();
});



