// colletions of interfaces

// user interface
export interface IUser {
    name: string,
    position: string,
    task: string[];
}

// card interfaces
export interface ICard {
    ProjectTite: string,
    detail: string,
}

// add task interfaces
export interface ITask {
    roomID: string,
    devName: string,
    tasks: string[],
    techStack: string,
    _id?: string,
    allowUpdate: boolean
};

export interface IGetTaskOID {
    roomID: string,
};

export interface IUserReg {
    username: string,
    password: string
};