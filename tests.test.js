const { processInput } = require('./FinalMachine');

describe('Тестирование', () =>{
  test('Пустая цепочка', () =>{
    const result=processInput('~~');
    expect(result).toEqual([{start:1+': ',chain:'~~'}]); //1: ~~
  });

  test('Простая цепочка №1', () =>{
    const result=processInput('~abb~');
    expect(result).toEqual([{start:1+': ',chain:'~abb~'}]); //1: ~abb~
  });

  test('Простая цепочка №2', () =>{
    const result=processInput('~abbaabaaabbaaaab~');
    expect(result).toEqual([{start:1+': ',chain:'~abbaabaaabbaaaab~'}]); //1: ~abbaabaaabbaaaab~
  });

  test('Простая цепочка №3',() =>{
    const result=processInput('~abb~ab~');
    expect(result).toEqual([{start:1+': ',chain:'~abb~'}]); //1: ~abb~
  });

  test('Две цепочки', () =>{
    const result=processInput('~abb~aaaab~');
    expect(result).toEqual([{start:1+': ',chain:'~abb~'},  //1: ~abb~
                            {start:5+': ',chain:'~aaaab~'} //5: ~aaaab~
    ]);
  });

  test('Четыре цепочки', () =>{
    const result=processInput('~~abb~aaaab~abbaabaaabb~abb');
    expect(result).toEqual([{start:1+': ',chain:'~~'},             //1: ~~
                            {start:2+': ',chain:'~abb~'},          //2: ~abb~
                            {start:6+': ',chain:'~aaaab~'},        //6: ~aaaab~
                            {start:12+': ',chain:'~abbaabaaabb~'}  //12: ~abbaabaaabb~
    ]);
  });

  test('Цепочек не найдено №1',() =>{
    expect(() => processInput('~ab~')).toThrow('Цепочек не найдено');
  });

  test('Цепочек не найдено №2',() =>{
    expect(() => processInput('~aaa~aaabbb~')).toThrow('Цепочек не найдено');
  });

  test('Ошибка: неизвестный символ', () =>{
    expect(() => processInput('~abbc~')).toThrow('Неизвестный символ: c');
  });

  test('Ошибка: неизвестный символ', () =>{
    expect(() => processInput('~abbk~')).toThrow('Неизвестный символ: k');
  });
})