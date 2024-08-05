let spiral_base_points: { x: number, y: number }[] = [];
export const generateSpiralPoints = (numPoints: number, scale: number) => {
    const arrSize = numPoints * 5;
    const out = new Array(arrSize);
    const wind = 9200;
    const curve = 0.5; // 0.5
    const rot_offset = 0.93 * scale + 0.73;
    for (let i = 0; i < arrSize; i++) {

        const interval = Math.sqrt(scale * wind * i) / Math.log(8) / 17
        const radius = Math.pow(scale, 2) * interval * 0.35;

        const x = Math.sin(interval * curve + rot_offset) * radius;
        const y = Math.cos(interval * curve + rot_offset) * radius;
        out[i] = { x, y };
    }
    spiral_base_points = out;
    // console.log("Generated spiral points", spiral_base_points);
    return out;
}


let spiral_visible_points: { x: number, y: number }[] = [];
export const getVisibleSpiralPoints = (numPoints: number, scale: number, width: number, height: number) => {
    let i = 0;
    const out = [];
    console.log(scale, width, height);
    generateSpiralPoints(numPoints, scale);
    while (out.length < numPoints && i < spiral_base_points.length) {
        let { x, y } = spiral_base_points[i];
        // x = x * scale;
        // y = y * scale;
        // console.log("x,y", x, y);
        if (i == 1) {
            x *= 0.1;
            y *= 0.8;
        }
        if (i != 0 && i != 1 && x > -width / 2 && x < width / 2 && y > -height / 2) {
            out.push({ x, y });
        }
        i++;
    }
    spiral_visible_points = out;
    return out
}

export const getVisibleSpiralPoint = (index: number) => {
    if (index < spiral_visible_points.length) {
        return spiral_visible_points[index];
    } else {
        return { x: 0, y: -window.innerHeight / 2 };
    }
}
