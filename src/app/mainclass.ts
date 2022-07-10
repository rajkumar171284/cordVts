export class geofenceParams {
    msg:string;
    enabled:boolean;//popup
    location: any;
    lat:number;
    lng:number;
    radius:number;
    deviceId:any;
}
export class statusParams {
    msg: string = '';
    enabled: boolean = false;//popup
    openFilter: boolean = false
    locations: any = []
    data: any;
    pDialog: false;
    response:any=[]
}
export interface statusInterfaceParams {
    msg: string;
    enabled: boolean;
    openFilter: boolean;
    locations: any; 
    data: any;
    pDialog: boolean;
    response:any;
}
export class findStatus {
    total: number = 0;
    active: number = 0;
    inactive: number = 0;
    constructor(list) {
        this.total = list.length;       
        list.forEach(element => {
            if (element.ignitionStatus == 'OFF') {
                this.inactive++;
            } else if (element.ignitionStatus != 'OFF') {
                this.active++;
            }
        });

    }
}
export class Mainclass {
    reportsHeader = ["State Name",
        "Rate Code",
        "Total Miles By State",
        "Taxable Miles",
        "MPG",
        "Taxable Gallons"
        , "Taxable Paid Gallons"
        , "Net Gallons"
        , "Tax Rate"
        , "Tax Due/Refund"
        , "Interest Due"
        , "Total Due"]

    dmsHeader = ['Select', '#', 'IMEI',
        'Location',
        'Last Reported time',
        'Status',
        'Speed(kmph)',
        'Key',
        'Transmit', 'Action'];

    vehicleHeader = ['vehicle name', 'Last Reported time',
        'Status', 'Location'
    ];

    maintainanceHeader = ['#', 'IMEI',
        'Location',
        'Last Reported time',
        'Detailed View',
        'Action'];

    userData = {
        // header: ['SELECT', 'IMEI NO.', 'TYPE', 'DRIVER', 'MOBILE NUMBER', 'EDIT'],
        header: ['SELECT', 'IMEI NO.',  'DRIVER',  'EDIT'],

        users: [{ no: "John", id: "333939350417272", email: 'arajkumar1784@gmail.com', g: 'Male', num: '09591390709' },
        { no: "Ram", id: "23939350417272", email: 'araj@gmail.com', g: 'Male', num: '09591290709' },
        { no: "Nick", id: "0239350417272", email: 'john@gmail.com', g: 'Male', num: '09591290709' },
        { no: "Nick", id: "0239350417272", email: 'john@gmail.com', g: 'Male', num: '09591290709' },

        { no: "Nick", id: "0239350417272", email: 'john@gmail.com', g: 'Male', num: '09591290709' },
        { no: "Nick", id: "0239350417272", email: 'john@gmail.com', g: 'Male', num: '09591290709' },
        { no: "Nick", id: "0239350417272", email: 'john@gmail.com', g: 'Male', num: '09591290709' },

        { no: "Nick", id: "0239350417272", email: 'john@gmail.com', g: 'Male', num: '09591290709' },
        { no: "Nick", id: "0239350417272", email: 'john@gmail.com', g: 'Male', num: '09591290709' },
        { no: "Nick", id: "0239350417272", email: 'john@gmail.com', g: 'Male', num: '09591290709' },

        { no: "Nick", id: "0239350417272", email: 'john@gmail.com', g: 'Male', num: '09591290709' },
        ]

    }
    managerData = {
        header: ['SELECT', 'NAME', 'EMAIL ID', 'GENDER', 'MOBILE NUMBER', 'EDIT'],
        users: [
            {
                "_id": {
                    "$oid": "6093ced15d2aa48ec4eec2d2"
                },
                "emailId": "user",
                "gender": "Male",
                "mobileNo": "56345345345345435",
                "password": "1234",
                "userName": "user"
            },
            {
                "_id": {
                    "$oid": "609a167e7d45eff141ecd073"
                },
                "emailId": "arajkumar1784@gmail.com",
                "gender": "Male",
                "mobileNo": "09591390709",
                "password": "kumar123",
                "userName": "kumar"
            },
            {
                "_id": {
                    "$oid": "60a64c0f11857bd0521681fc"
                },
                "emailId": "raj@c.in",
                "gender": "Female",
                "mobileNo": "5456565",
                "password": "swwewre",
                "userName": "raj"
            },
            {
                "_id": {
                    "$oid": "6093ced15d2aa48ec4eec2d2"
                },
                "emailId": "user",
                "gender": "Male",
                "mobileNo": "56345345345345435",
                "password": "1234",
                "userName": "user"
            },
            {
                "_id": {
                    "$oid": "609a167e7d45eff141ecd073"
                },
                "emailId": "arajkumar1784@gmail.com",
                "gender": "Male",
                "mobileNo": "09591390709",
                "password": "kumar123",
                "userName": "kumar"
            },
            {
                "_id": {
                    "$oid": "60a64c0f11857bd0521681fc"
                },
                "emailId": "raj@c.in",
                "gender": "Female",
                "mobileNo": "5456565",
                "password": "swwewre",
                "userName": "raj"
            },
            {
                "_id": {
                    "$oid": "6093ced15d2aa48ec4eec2d2"
                },
                "emailId": "user",
                "gender": "Male",
                "mobileNo": "56345345345345435",
                "password": "1234",
                "userName": "user"
            },
            {
                "_id": {
                    "$oid": "609a167e7d45eff141ecd073"
                },
                "emailId": "arajkumar1784@gmail.com",
                "gender": "Male",
                "mobileNo": "09591390709",
                "password": "kumar123",
                "userName": "kumar"
            },
            {
                "_id": {
                    "$oid": "60a64c0f11857bd0521681fc"
                },
                "emailId": "raj@c.in",
                "gender": "Female",
                "mobileNo": "5456565",
                "password": "swwewre",
                "userName": "raj"
            }
        ]
    }




}

