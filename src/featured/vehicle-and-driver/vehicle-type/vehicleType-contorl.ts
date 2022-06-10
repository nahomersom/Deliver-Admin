import { Validators } from "@angular/forms";
export let vehicleType = [
    {name: 'id', defaultValue: null, validation: []},
    {name: 'parent_type', defaultValue: null, validation: [Validators.required]},
    {name: 'title', defaultValue: null, validation: [Validators.required]},
    {name: 'status', defaultValue: null, validation:[]},
    {name: 'initial_price', defaultValue: null, validation: [Validators.required]},
    {name: 'number_of_seat', defaultValue: null, validation: [Validators.required]},
    {name: 'description', defaultValue: null, validation: []},
    {name: 'image', defaultValue: null, validation: [Validators.required]},
    {group: true, child: [
        {name: 'price_per_km', defaultValue: null, validation: [Validators.required]},
        {name: 'price_per_kg', defaultValue: null, validation: [Validators.required]},
       {name: 'price_per_minute', defaultValue: null, validation: [Validators.required]},
       {name: 'price_per_km_night', defaultValue: null, validation: [Validators.required]},
        {name: 'price_per_kg_night', defaultValue: null, validation: [Validators.required]},
       {name: 'price_per_minute_night', defaultValue: null, validation: [Validators.required]},
    ],
    name: 'detail', defaultValue: null, validation: [Validators.required]}
];