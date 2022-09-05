
export const sortData = (data) => {
    // copy it out into an array
    const sortedData = [...data];

    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

    // sortedData.sort((a, b) => {
    //     if (a.cases > b.cases) {
    //         return -1;
    //     }
    //     else {
    //         return 1;
    //     }
    // });
    // return sortedData;
};