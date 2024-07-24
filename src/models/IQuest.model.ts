export enum QuestType{
    QText = "QText",
    QMultiple = "QMultiple",
    QGeo = "QGeo",
    QWand = "QWand",
    QPhoto = "QPhoto",
    QSpell = "QSpell",
    QAR = "QAR",
    QPluzze = "QPluzze",
}

export interface IQuest{

    // Meta
    id: number,
    title: string;
    type: QuestType;
    info: {
        description: string;
        image: string;
    };

    error?: any;
    actions?: any[]

}

export interface IQuestText extends IQuest{
    config: any;
    answer: string;
    validator: (value: string) => boolean;
}
export interface IQMultiple extends IQuest{
    config: {
        options: string[];
    };
    answer: string;
    validator: (value: string) => boolean;
}
export interface IQGeo extends IQuest{
    config: {
        tolerance: {
            lat: number,
            lng: number,
          },
          position: {
            lat: number,
            lng:  number,
          }
    };
    answer:  {
        lat: number,
        lng:  number,
      };
    validator: (value: string) => boolean;
}
export interface IQWand extends IQuest{
    config: any;
    answer: string;
    validator: (value: string) => boolean;
}