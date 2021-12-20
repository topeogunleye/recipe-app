import { stringLength, reverseString, capitalize } from './index.js';
import Calculator from './calculator.js';

const calc = new Calculator(10, 50);

describe('stringLength function', () => {
	const myString = 'hello';
	const strLength = myString.length;

	describe('Valid tests', () => {
		test('returns a string length if string length is between 1 and 10', () => {
			expect(stringLength(`${myString}`)).toBe(strLength);
		});
		test('returns a number if string length is between 1 and 10', () => {
			expect(typeof stringLength(`${myString}`) === 'number').toBeTruthy();
		});
		test('returns a number if string length is between 1 and 10', () => {
			expect(typeof stringLength(`${myString}`) === 'number').not.toBeFalsy();
		});
		test('returns a string length if string length is between 1 and 10', () => {
			expect(stringLength(`${myString}`)).not.toBeNull();
		});
		test('returns a string length if string length is between 1 and 10', () => {
			expect(stringLength(`${myString}`)).toEqual(5);
		});
	});

	describe('Not valid tests', () => {
		const myString = 'Hello World';
		const error = 'Error: Not length not btw 1 and 10';

		test('returns an error if string length is not between 1 and 10', () => {
			expect(stringLength(`${myString}`)).toBe(error);
		});
		test('returns an error if input is an empty string', () => {
			const myString = '';
			expect(stringLength(`${myString}`)).toBe(error);
		});
		test('returns an error if input is an empty string', () => {
			expect(typeof stringLength(`${myString}`) === 'string').toBeTruthy();
		});
		test('returns an error if input is an empty string', () => {
			expect(stringLength(`${myString}`)).not.toBeNull();
		});
	});
});

describe('reverse string function', () => {
	const myString = 'Hello World';

	test('returns right value', () => {
		expect(reverseString(myString)).toBe('dlroW olleH');
	});
	test('returns empty string', () => {
		const myString = '';
		expect(reverseString(myString)).toBe('');
	});
	test('returns right value', () => {
		const myString = 'Hello';
		expect(reverseString(myString)).toBe('olleH');
	});
	test('does not return wrong value', () => {
		expect(reverseString(myString)).not.toBe('dlroWolleH');
	});
	test('returns a string type', () => {
		expect(typeof reverseString(myString) === 'string').toBeTruthy();
	});
});

describe('Calculator class', () => {
	describe('Add function', () => {
		test('returns actual value', () => {
			expect(calc.add()).toBe(60);
		});
		test('returns actual value', () => {
			expect(calc.add() === 60).toBeTruthy();
		});
		test('returns actual value', () => {
			expect(calc.add() === 50).toBeFalsy();
		});
		test('should be greater than 50', () => {
			expect(calc.add()).toBeGreaterThan(50);
		});
		test('should be greater than first and second', () => {
			const first = 10;
			const second = 20;
			const calc = new Calculator(first, second);
			expect(calc.add()).toBeGreaterThan(first);
			expect(calc.add()).toBeGreaterThan(second);
		});
		test('should be close floating number', () => {
			const first = 0.3;
			const second = 0.2;
			const calc = new Calculator(first, second);
			expect(calc.add()).toBeCloseTo(0.5);
		});
	});

	describe('Subtract function', () => {
		test('returns actual value', () => {
			expect(calc.subtract()).toBe(40);
		});
		test('returns actual value', () => {
			expect(calc.subtract() === 40).toBeTruthy();
		});
		test('returns actual value', () => {
			expect(calc.subtract() === 50).toBeFalsy();
		});
		test('should be less than 50', () => {
			expect(calc.subtract()).toBeLessThan(50);
		});
		test('should be less than second and greater than first', () => {
			const first = 10;
			const second = 30;
			const calc = new Calculator(first, second);
			expect(calc.subtract()).toBeGreaterThan(first);
			expect(calc.subtract()).toBeLessThan(second);
		});
		test('should be close floating number', () => {
			const first = 0.1;
			const second = 0.4;
			const calc = new Calculator(first, second);
			expect(calc.subtract()).toBeCloseTo(0.3);
		});
	});

	describe('Divide function', () => {
		test('returns actual value', () => {
			expect(calc.divide()).toBe(5);
		});
		test('returns actual value', () => {
			expect(calc.divide() === 5).toBeTruthy();
		});
		test('returns actual value', () => {
			expect(calc.divide() === 7).toBeFalsy();
		});
		test('should be less than 50', () => {
			expect(calc.divide()).toBeLessThan(10);
		});
		test('should be less than second and first', () => {
			const first = 10;
			const second = 30;
			const calc = new Calculator(first, second);
			expect(calc.divide()).toBeLessThan(first);
			expect(calc.divide()).toBeLessThan(second);
		});
		test('should be close floating number', () => {
			const first = 0.1;
			const second = 0.4;
			const calc = new Calculator(first, second);
			expect(calc.divide()).toBe(4);
		});
	});

	describe('Mutiply function', () => {
		test('returns actual value', () => {
			expect(calc.multiply()).toBe(500);
		});
		test('returns actual value', () => {
			expect(calc.multiply() === 500).toBeTruthy();
		});
		test('returns actual value', () => {
			expect(calc.multiply() === 480).toBeFalsy();
		});
		test('should be less than 50', () => {
			expect(calc.multiply()).toBeGreaterThan(400);
		});
		test('should be less than second and first', () => {
			const first = 10;
			const second = 30;
			const calc = new Calculator(first, second);
			expect(calc.multiply()).toBeGreaterThan(first);
			expect(calc.multiply()).toBeGreaterThan(second);
		});
		test('should be close floating number', () => {
			const first = 0.1;
			const second = 0.4;
			const calc = new Calculator(first, second);
			expect(calc.multiply()).toBeCloseTo(0.04);
		});
	});
});

describe('Capitalize string', () => {
	test('should capitalize the first character of a string', () => {
		expect(capitalize('hello')).toBe('Hello');
	});
	test('should return a string', () => {
		expect(typeof capitalize('hello') === 'string').toBeTruthy();
	});
	test('should capitalize the first character of a string', () => {
		expect(capitalize('hello')).not.toBe('HellO');
	});
  test('should throw error if type is not a string', () => {
		expect(() => capitalize(20)).toThrow()
	});
});
