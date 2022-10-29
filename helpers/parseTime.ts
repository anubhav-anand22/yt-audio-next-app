export const parseNumTime = (num: number) => {
    const hour = Math.floor(num / 3600);
    const min = Math.floor((num - (hour * 3600)) / 60);
    const sec = Math.floor(num - ((hour * 3600) + (min * 60)));
    return `${hour < 10 ? "0" + hour : hour}:${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`
}