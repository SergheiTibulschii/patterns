interface Product {
    operation: () => string;
}

abstract class Creator {
    public abstract createItem(): Product;

    public someOperation(): string {
        const product = this.createItem();
        return `Creator: ${product.operation()}`
    }
}

class ConcreteCreator1 extends Creator {
    createItem(): Product {
        return new ConcreteProduct1();
    }
}
class ConcreteCreator2 extends Creator {
    createItem(): Product {
        return new ConcreteProduct2();
    }
}

class ConcreteProduct1 implements Product {
    operation(): string {
        return "ConcreteProduct1 operation";
    }
}

class ConcreteProduct2 implements Product {
    operation(): string {
        return "ConcreteProduct2 operation";
    }
}

function clientCode(creator: Creator) {
    creator.someOperation();
}

clientCode(new ConcreteCreator1())
clientCode(new ConcreteCreator2())