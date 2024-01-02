export enum StatusType {
    SUCCESS = 'NEW',
    WARNING = 'SENT TO SERVICE PROVIDER'
}

export enum PriorityType {
    ERROR = 'HIGH',
    INFO = 'MEDIUM',
    SUCCESS = 'LOW',
}

export const getStatusColor = (statusType: StatusType, priorityType: PriorityType) => {
    switch (priorityType) {
        case PriorityType.SUCCESS:
            switch (statusType) {
                case StatusType.SUCCESS:
                    return 'green';
                case StatusType.WARNING:
                    return 'orange';
            }
        case PriorityType.INFO:
            switch (statusType) {
                case StatusType.SUCCESS:
                    return 'red';
                case StatusType.WARNING:
                    return 'violet';
            }
        default:
            return 'gray';
    }
};

export const getPriorityColor = (type: PriorityType) => {
    switch (type) {
        case PriorityType.SUCCESS:
            return 'green';
        case PriorityType.ERROR:
            return 'yellow';
        case PriorityType.INFO:
            return 'blue';
        default:
            return 'gray';
    }
};