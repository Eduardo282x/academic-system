export interface ITopics {
    topicId: number;
    topicName: string;
    topicDescription: string;
    subjectId?: number;
    activities: IActivities[]
}

export interface NewTopics {
    topicId: number;
    topicName: string;
    topicDescription: string;
    subjectId?: number;
}

export interface IActivities {
    activityId: number;
    activityName: string;
    activityDescription: string;
    topidId: number;
}
