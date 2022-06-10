import { Validators } from "@angular/forms";

export let vehicle = [
    {name: 'id', defaultValue: null, validation: []},
    {name: 'plate_number', defaultValue: null, validation: [Validators.required]},
    {name: 'model', defaultValue: null, validation: [Validators.required]},
    {name: 'load_capacity', defaultValue: null, validation: [Validators.required]},
    {name: 'load_capacity', defaultValue: null, validation: [Validators.required]},
    {name: 'chassis_number', defaultValue: null, validation: [Validators.required]},
    {name: 'vehicle_type_id', defaultValue: null, validation: [Validators.required]},
    {name: 'vehicle_image', defaultValue: null, validation: []},
    {name: 'owner_full_name', defaultValue: null, validation: [Validators.required]},
    {name: 'owner_phone_number', defaultValue: null, validation: [Validators.required, Validators.minLength(9), Validators.maxLength(10)]},
    {name: 'owner_image', defaultValue: null, validation: []},
    {name: 'owner_attachment', defaultValue: null, validation: []},
    {name: 'remark', defaultValue: null, validation: []},
    {name: 'owner_region', defaultValue: null, validation: [Validators.required]},
    {name: 'owner_city', defaultValue: null, validation: [Validators.required]},
    {name: 'owner_sub_city', defaultValue: null, validation: [Validators.required]},
    {name: 'owner_wereda', defaultValue: null, validation: [Validators.required]},
    {name: 'owner_email', defaultValue: null, validation: [Validators.required, Validators.email]}
];