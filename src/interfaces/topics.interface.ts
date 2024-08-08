export interface ITopics {
    topicIc: number;
    topicName: string;
    topicDescription: string;
    subjectId?: number;
    activities: IActivities[]
}

export interface NewTopics {
    topicIc: number;
    topicName: string;
    topicDescription: string;
    subjectId?: number;
}

export interface IActivities {
    activityId: number;
    activityName: string;
    activityDescription: string;
    topidIc: number;
}
