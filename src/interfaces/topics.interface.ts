export interface ITopics {
    topicId: number;
    topicName: string;
    topicDescription: string;
    subjectId?: number;
    activities: Activities[]
}

export interface Activities {
    activityId: number;
    activityName: string;
    activityDescription: string;
    topidId: number;
}
