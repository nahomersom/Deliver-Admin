import { Validators } from '@angular/forms';
export let lookup = [
    {name: 'id', defaultValue: null, validation: []},
    {name: 'lookup_type', defaultValue: null, validation: [Validators.required]},
    {name: 'value', defaultValue: null, validation: [Validators.required]},
    {name: 'parent_id', defaultValue: null, validation: []},
   ];
