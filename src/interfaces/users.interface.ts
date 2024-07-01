export interface IUsers {
    id?:      number;
    userId?:  number;
    name:     string;
    lastname: string;
    username: string;
    email:    string;
    age:      string;
    rolId?:    number;
    rolText?:  string;
    classrooms?:  number;
    classroomId?:  number;
}

export interface IStudent {
    studentId:   number;
    userId:      number;
    classroomId: number;
    classrooms:  string;
    name:        string;
    lastname:    string;
    username:    string;
    email:       string;
    age:         string;
}
export interface IAssistent extends IStudent {
    assistent: boolean;
}

