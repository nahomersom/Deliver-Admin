import { Validators } from "@angular/forms";
export let systemUser = [
    {name: 'id', defaultValue: null, validation: []},
    {group: true, child: [
        {name: 'id', defaultValue: null, validation: []},
        {name: 'full_name', defaultValue: null, validation: [Validators.required]},
       {name: 'phone_number', defaultValue: null, validation: [Validators.required, Validators.minLength(9), Validators.maxLength(10)]},
       {name: 'email', defaultValue: null, validation: [Validators.required, Validators.email]},
        {name: 'group_id', defaultValue: null, validation: [Validators.required]},
    ],
    name: 'account', defaultValue: null, validation: [Validators.required]},
    {group: true, child: [
        {name: 'id', defaultValue: null, validation: []},
        {name: 'region', defaultValue: null, validation: [Validators.required]},
       {name: 'city', defaultValue: null, validation: [Validators.required]},
       {name: 'sub_city', defaultValue: null, validation: [Validators.required]},
        {name: 'wereda', defaultValue: null, validation: [Validators.required]},
    ],
    name: 'address', defaultValue: null, validation: [Validators.required]}
];