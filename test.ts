console.log('testing')

export function testfunction() {
    console.log('test function')
    console.error('error');
    console.log(test('dinesh'))
}

const test = (input: string): string => {
    return "hello " + input;
}
