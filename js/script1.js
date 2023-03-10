class Test{
    constructor(test1,test2)
    {
        this.test1 = test1;
        this.test2 = test2;
    }

    createMultiple()
    {
        return this.test1 * this.test2;
    }
}

class tester extends Test{
    constructor(test1,test2, text, number)
    {
        super(test1,test2);
        this.text = text;
        this.number = number;
    }
    
    showTest()
    {
        console.log(`text = ${this.text}, number = ${this.number}`);
    }
}

const newElement = new tester(700,900,`lorem`, '200');

console.log(newElement.createMultiple());

newElement.showTest();