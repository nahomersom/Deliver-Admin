import { Validators } from '@angular/forms';

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
export let driver = [
    {name: 'id', defaultValue: null, validation: []},
    {name: 'tags', defaultValue: null, validation: [Validators.required]},
    {name: 'driver_type', defaultValue: null, validation: [Validators.required]},
    {name: 'team', defaultValue: null, validation: [Validators.required]},
    {name: 'description', defaultValue: null, validation: []},
    {name: 'vehicle_type_id', defaultValue: null, validation: [Validators.required]},
    {name: 'image', defaultValue: null, validation: [Validators.required]},
    {name: 'color', defaultValue: null, validation: [Validators.required]},
    {name: 'plate_number', defaultValue: null, validation: [Validators.required]},
    {group: true, child: [
        {name: 'id', defaultValue: null, validation: []},
        {name: 'full_name', defaultValue: null, validation: [Validators.required]},
        {name: 'email', defaultValue: null, validation: [Validators.required]},
        {name: 'phone_number', defaultValue: null, validation: [Validators.required, Validators.minLength(9), Validators.maxLength(10)]}
      
    ], name: 'account', defaultValue: null, validation: [Validators.required, Validators.email]},

    {group: true, child: [
        {name: 'id', defaultValue: null, validation: []},
        {name: 'region', defaultValue: null, validation: [Validators.required]},
        {name: 'city', defaultValue: null, validation: [Validators.required]},
        {name: 'sub_city', defaultValue: null, validation: [Validators.required]},
        {name: 'wereda', defaultValue: null, validation: [Validators.required]},
        {name: 'house_number', defaultValue: null, validation: [Validators.required]}
    ],
    name: 'address', defaultValue: null, validation: [Validators.required]},
];
