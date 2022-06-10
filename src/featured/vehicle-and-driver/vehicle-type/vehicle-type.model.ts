export class VehicleTypeData {
    id = null;
    parent_type: string;
    title: string;
    status: number;
    initial_price: string;
    number_of_seat: string;
    description: string;
    image: string;
    detail = {
        price_per_km: '',
        price_per_kg: '',
        price_per_minute: '',
        price_per_km_night: '',
        price_per_kg_night: '',
        price_per_minute_night: ''
    };
}
