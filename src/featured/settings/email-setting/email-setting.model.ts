export class EmailSettingData {
    id = null;
    email = {
        protocol: '',
        host: '',
        port: '',
        email: '',
        password: '',
    };
    other = {
        minimum_km: 1
    };
    keys = {
        new: [],
        existing: [],
        deleted: []
    };

}
