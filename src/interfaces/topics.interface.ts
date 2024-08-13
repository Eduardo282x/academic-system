export interface ITopics {
    topicIc: number;
    topicName: string;
    topicDescription: string;
    subjectId?: number;
    activities: IActivities[];
    FilesTopics: FilesTopics[];
}
export interface FilesTopics {
    fileId:   number;
    filePath: string;
    topicId:  number;
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
