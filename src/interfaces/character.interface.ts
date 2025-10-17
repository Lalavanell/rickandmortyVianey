

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
