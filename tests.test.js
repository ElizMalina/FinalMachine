const { processInput } = require('./FinalMachine');

describe('Тестирование', () =>{
  test('Пустая цепочка', () =>{
    const result=processInput('~~');
    expect(result).toEqual([{start:1+': ',chain:'~~'}]);
  });

  test('Простая цепочка №1', () =>{
    const result=processInput('~abb~');
    expect(result).toEqual([{start:1+': ',chain:'~abb~'}]);
  });

  test('Простая цепочка №2', () =>{
    const result=processInput('~abbaabaaabbaaaab~');
    expect(result).toEqual([{start:1+': ',chain:'~abbaabaaabbaaaab~'}]);
  });

  test('Простая цепочка №3',() =>{
    const result=processInput('~abb~ab~');
    expect(result).toEqual([{start:1+': ',chain:'~abb~'}]);
  });

  test('Две цепочки', () =>{
    const result=processInput('~abb~aaaab~');
    expect(result).toEqual([{start:1+': ',chain:'~abb~'},
                            {start:5+': ',chain:'~aaaab~'}
    ]);
  });

  test('Четыре цепочки', () =>{
    const result=processInput('~~abb~aaaab~abbaabaaabb~abb');
    expect(result).toEqual([{start:1+': ',chain:'~~'},
                            {start:2+': ',chain:'~abb~'},
                            {start:6+': ',chain:'~aaaab~'},
                            {start:12+': ',chain:'~abbaabaaabb~'}
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