export class DriverData{
    id?:string;
    account={
    id:null,
    full_name:'',
    email:'',
    phone_number: ''
    }
    tags:any;
    driver_type:string;
    team:string;
    description:string;
    vehicle_type_id: string;
    image:string;
    color:string;
    plate_number:string;
//     attachment: string;
    address = {
           id:null,
          region: '',
          city: '',
          sub_city: '',
          wereda: '',
          house_number:'',
    };
  
    }