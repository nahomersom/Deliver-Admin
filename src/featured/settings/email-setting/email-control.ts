import { Validators } from '@angular/forms';
export let email = [
    {name: 'id', defaultValue: null, validation: []},
    {group: true, child: [
        {name: 'protocol', defaultValue: null, validation: [Validators.required]},
        {name: 'host', defaultValue: null, validation: [Validators.required]},
        {name: 'port', defaultValue: null, validation: [Validators.required]},
        {name: 'email', defaultValue: null, validation: [Validators.required, Validators.email]},
        {name: 'password', defaultValue: null, validation: [Validators.required]},
        // {name:'status',defaultValue:null,validation:[Validators.required]},

    ],
    name: 'email', defaultValue: null, validation: [Validators.required]},
    {group: true, child: [
        {name: 'minimum_km', defaultValue: null, validation: [Validators.required]},
    ],
    name: 'other', defaultValue: null, validation: [Validators.required]
},
    {name: 'key', defaultValue: null, validation: []},
    { is_array: true, name: 'keys', defaultValue: [], validation: [Validators.required]},
   ];