let spiral_base_points: { x: number, y: number }[] = [];
export const generateSpiralPoints = (numPoints: number, scale: number) => {
    const arrSize = numPoints * 10;
    const out = new Array(arrSize);

    const SPIRAL_TIGHTNESS = 25; //0.04
    const POINT_SPACING = 10 * SPIRAL_TIGHTNESS; //9200
    const START_OFFSET = 1;
    const OVERALL_ROTATION = scale - Math.PI / 2//Math.PI / 4; //0.93 * scale +
    const CENTER_VOID_RADIUS = 150;

    const start_radius = Math.sqrt(POINT_SPACING * START_OFFSET / SPIRAL_TIGHTNESS) * SPIRAL_TIGHTNESS;
    for (let i = 0; i < arrSize; i++) {
        const index = i + START_OFFSET;
        const interval = Math.sqrt(POINT_SPACING * index / SPIRAL_TIGHTNESS);
        const radius = interval * SPIRAL_TIGHTNESS - start_radius + CENTER_VOID_RADIUS;

        const x = Math.sin(interval + OVERALL_ROTATION) * radius;
        const y = Math.cos(interval + OVERALL_ROTATION) * radius;
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
    // console.log(scale, width, height);
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
