import { test, expect } from '@playwright/test';

interface Person {
    name: string;
    age: number;
}

test('Variables and data types', async () => {
    let name: string = 'John Doe';
    let age: number = 30;
    let isStudent: boolean = true;
    let student = 'ethan';

    expect(name).toBe('John Doe');
    expect(age).toBe(30);
    expect(isStudent).toBe(true);
    expect(student).toBe('ethan');
});

test('Arrays and tuples', async () => {
    let tools : string[] = ['Selenium', 'Playwright', 'Cypress'];

    expect(tools.length).toBe(3);
    expect(tools).toContain('Playwright');
    tools.push('Postman');
    expect(tools.length).toBe(4);
}); 

test ('Object', async () => {
    let person: { name: string; age: number; isStudent: boolean } = {
        name: 'Jane Doe',
        age: 25,
        isStudent: false
    };  

    expect(person.name).toBe('Jane Doe');
    expect(person.age).toBe(25);
    expect(person.isStudent).toBe(false);
});

test ('Functions', async () => {
    function multiply(a: number, b: number): number {
        return a * b;
    } 

    expect(multiply(2, 3)).toBe(6);
});

    test('Arrow functions', async () => {
    const add = (a: number, b: number): number => a + b;
    expect(add(2, 3)).toBe(5);
});

test('Interface and object', async () => {
    const person: Person = {
        name: 'John Doe',
        age: 30,
    };

    expect(person.name).toBe('John Doe');
    expect(person.age).toBe(30);
});
    
    
    
    
    
    
    
    
    
    



