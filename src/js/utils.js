export function GetRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

export function GetRandomColor() {
    const red = GetRandomInt(255);
    const green = GetRandomInt(255);
    const blue = GetRandomInt(255);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

export function IsThereSegmentAt(segments, coordinateX, coordinateY) {
    if (segments.find(segment => segment.coordinateX === coordinateX && segment.coordinateY === coordinateY)) {
        return true;
    } else {
        return false;
    }
}