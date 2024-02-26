export interface Variant {
    _id?: string;
    name: string;
    description?: string;
    price: number;
}

export interface Plat {
    _id?: string;
    name: string;
    description: string;
    image: string;
    price: number;
    variants: Variant[];
}

export interface Boisson {
    _id?: string;
    image: string;
    name: string;
    description?: string;
    price: number;
}

export interface Table {
    _id?: string;
    tableName: number;
    capacity: number;
    QRCode: string;
}

export interface Restaurant {
    _id?: string;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
    plats: Plat[];
    boissons: Boisson[];
    tables?: Table[]
};

export interface PlatCart extends Partial<Plat> {
    variant?: Variant;
    quantity: number;
}

export interface BoissonCart extends Partial<Boisson> {
    quantity: number;
}

export interface RestaurantCart {
    plats: PlatCart[];
    boissons: BoissonCart[];
};


// SESSION

export interface Session {
    token: string;
    connected: boolean;
    restaurant: Restaurant;
}

export interface UserSession {
    scanned: boolean;
    restaurant: Restaurant;
}

enum CommandeStatus {
    pending = 'pending',
    in_preparation = 'in_preparation',
    ready = 'ready',
    served = 'served',
    paid = 'paid',
}

export interface Commande {
    _id?: string;
    restaurantId: string;
    date: Date;
    price: number; // Total price of the order
    plats: PlatCart[];
    boissons: BoissonCart[];
    statut: CommandeStatus; // Status of the order (pending, in_preparation, ready, served, paid)
}
