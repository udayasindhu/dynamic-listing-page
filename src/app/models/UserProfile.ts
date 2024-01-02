export interface UserProfile {
    user: User;
    team: Team;
}

export interface User {
    userUid: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
}

export interface Team {
    teamUid: string;
    teamName: string;
}