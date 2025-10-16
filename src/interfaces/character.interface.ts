

export interface Character {
    id:       number | null;
    name:     string;
    status:   string;
    species:  string;
    type:     string;
    gender:   string;
    origin:   string;
    location: string;
    image:    string;
    episode:  string[] | null;
}

// export enum Gender {
//     Female = "Female",
//     Male = "Male",
//     Unknown = "unknown",
// }

// export interface Location {
//     name: string;
//     url:  string;
// }

// export enum Species {
//     Alien = "Alien",
//     Human = "Human",
// }

// export enum Status {
//     Alive = "Alive",
//     Dead = "Dead",
//     Unknown = "unknown",
// }
