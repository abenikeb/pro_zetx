import firebase from 'firebase'
export class EmissionType {
    uid?: string;
    household?: [
        {
            electricity: number,
            electricityImage: string,
            naturalgas: number,
            naturalgasImage: string,
            dateMeasured: firebase.firestore.Timestamp,
            dateUserClaims: string,
            status: string,
        },
    ];
    
    food?: [
        {
            image:string,
            measuredOn:firebase.firestore.Timestamp,
            dateUserClaims:string,
            beef:number,
            lamb:number,
            cheese:number,
            pork:number,
            turkey:number,
            chicken:number,
            tuna:number,
            milk:number,
            status:string
        }
    ];

    shopping?: [
        {
            paper:number,
            plastic:number,
            textile:number,
            pharma: number,
            image:string,
            measuredOn: firebase.firestore.Timestamp,
            dateUserClaims: string,
            status:string
          }
    ]
}
