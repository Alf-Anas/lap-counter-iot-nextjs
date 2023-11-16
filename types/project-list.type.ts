export type ProjectListTYpe = ProjectType[];

export type ProjectType = {
    no: number;
    key: string;
    rank: number;
    name: string;
    about_original: string;
    about: string;
    description: string;
    affiliation?: string;
    platform: string;
    tech_stack: string;
    url?: string;
    source_code?: string;
    year: string;
    status: string;
    logo?: string;
    file?: string;
    video?: string;
    youtube?: string;
};
