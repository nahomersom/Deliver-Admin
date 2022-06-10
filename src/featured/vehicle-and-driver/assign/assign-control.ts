import { Validators } from "@angular/forms";

export let assign = [
    {name: 'id', defaultValue: null, validation: []},
    {name: 'vehicle_type_id', defaultValue: null, validation: [Validators.required]},
    {name: 'driver_id', defaultValue: null, validation: [Validators.required]},
    {name: 'vehicle_id', defaultValue: null, validation: [Validators.required]},
    {name: 'start_date', defaultValue: null, validation: [Validators.required]},
    {name: 'end_date', defaultValue: null, validation: [Validators.required]},
    {group: true, child: [
        {name: 'name', defaultValue: null, validation: []},
        {name: 'address', defaultValue: null, validation: [Validators.required]},
    ],
    name: 'client', defaultValue: null, validation: [Validators.required]}
];