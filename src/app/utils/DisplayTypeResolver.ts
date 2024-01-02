export enum DisplayType {
    BADGE = 'badge',
    DATETIME = 'scheduledDatetime',
    PRIORITY = 'priority',
    ASSIGNMENT = 'assignment',
    CUSTOMER = 'customer',
    TITLE = 'title',
    DEFAULT = 'text'
}

export enum TypoGraphyType {
    TITLE = 'title',
    STRING = 'string',
}

export enum ElementType {
    BADGE = 'badge',
    DATETIME = 'datetime',
    PROFILE = 'userprofile',
    TYPOGRAPHY = 'typography',
}

export const getDisplayType = (type: DisplayType) => {
    switch (type) {
        case DisplayType.BADGE:
        case DisplayType.PRIORITY:
            return ElementType.BADGE;
        case DisplayType.DATETIME:
            return ElementType.DATETIME;
        case DisplayType.ASSIGNMENT:
            return ElementType.PROFILE;
        case DisplayType.TITLE:
        case DisplayType.CUSTOMER:
        case DisplayType.DEFAULT:
        default:
            return ElementType.TYPOGRAPHY;
    }
};