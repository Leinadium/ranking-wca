// persontable
type PersonTableInstance = {
    event: string,
    single: number,
    average: number,
    rankingSingle: number,
    rankingAverage: number,
}

export type PersonTableProps = {
    data: PersonTableInstance[],
};