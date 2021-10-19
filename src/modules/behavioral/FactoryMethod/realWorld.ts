type DeliveryType = 'land' | 'sea' | 'air'
interface Transport {
    deliver: () => string;
    brand: string;
    model: string;
    liftingCapacity: number;
}

class T500Plane implements Transport {
    deliver(): string {
        return 'T500Plane delivery'
    }

    liftingCapacity = 800;
    model = 'T-500';
    brand = 'boeing';
}

class T400Plane implements Transport {
    deliver(): string {
        return 'T400Plane delivery'
    }

    liftingCapacity = 250;
    model = 'T-400';
    brand = 'boeing';
}

class Ship1 implements Transport {
    deliver(): string {
        return 'Ship1 delivery'
    }

    liftingCapacity = 1500;
    model = 'ship-model';
    brand = 'ship-brand';
}
class Ship2 implements Transport {
    deliver(): string {
        return 'Ship2 delivery'
    }

    liftingCapacity = 2500;
    model = 'ship-model';
    brand = 'ship-brand';
}

class Truck1 implements Transport {
    deliver(): string {
        return 'Truck1 delivery'
    }

    liftingCapacity = 20;
    model = 'truck-model';
    brand = 'truck-brand';
}
class Truck2 implements Transport {
    deliver(): string {
        return 'Truck2 delivery'
    }

    liftingCapacity = 40;
    model = 'truck-model';
    brand = 'truck-brand';
}
const isBetween300And1000 = (num: number) => isBetween(num, [300, 1000])
const isBetween2000And5000 = (num: number) => isBetween(num, [2000, 5000])
const isBetween200And300 = (num: number) => isBetween(num, [200, 300])
const isBetween20And30 = (num: number) => isBetween(num, [20, 30])
const isBetween30And40 = (num: number) => isBetween(num, [30, 40])

abstract class Logistics {
    public abstract createTransport(capacity: number): Transport;

    public planDelivery(capacity: number): string {
        const transport = this.createTransport(capacity);
        return transport.deliver();
    }
}

class RoadLogistics extends Logistics {
    createTransport(capacity: number): Transport {
        if(isBetween20And30(capacity)) {
            return new Truck1()
        } else if (isBetween30And40(capacity)) {
            return new Truck2()
        }
        throw new Error(`There is no truck that will handle capacity: ${capacity}`)
    }
}

class SeaLogistics extends Logistics {
    createTransport(capacity: number): Transport {
        if(capacity < 2000) {
            return new Ship1()
        } else if (isBetween2000And5000(capacity)) {
            return new Ship2()
        }

        throw new Error(`There is no ship that will handle capacity: ${capacity}`)
    }
}

class AirLogistics extends Logistics {
    createTransport(capacity: number): Transport {
        if(isBetween300And1000(capacity)) {
            return new T500Plane()
        } else if (isBetween200And300(capacity)) {
            return new T400Plane()
        }

        throw new Error(`There is no plane that will handle capacity: ${capacity}`)
    }

}

const getLogisticsDepartment = (deliveryType: DeliveryType) => {
    if(deliveryType === 'land') {
        return new RoadLogistics()
    } else if (deliveryType === 'sea') {
        return new SeaLogistics()
    } else {
        return new AirLogistics()
    }

    throw new Error(`No such delivery type:${deliveryType}`)
}

const clientCall = (deliveryType: DeliveryType, cargoWeight: number) => {
    const logisticsDepartment = getLogisticsDepartment(deliveryType);
    console.log(logisticsDepartment.planDelivery(cargoWeight))
}


clientCall('land', 36)

function isBetween(num: number, range: [number, number], including: [boolean, boolean] = [true, true]) {
    const [includeStart, includeEnd] = including
    const [start, end] = range;

    if(includeStart && includeEnd) {
        return num >= start && num <= end
    }

    if(includeStart) {
        return num >= start && num < end
    }

    return num > start && num <= end
}