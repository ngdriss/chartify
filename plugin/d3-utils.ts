import {randomUniform} from "d3-random"
import {path as d3Path} from "d3-path"

export const randomPoints = () => {
    const randomX = randomUniform(0, 10); // Adjust the range as needed

// Generate random data points
    const data: any[] = [
        {x: 0, y: 100}
    ];
    const numPoints = 20; // You can adjust the number of data points as needed

// Generate strictly increasing random data
    let prevX = 0;
    for (let i = 0; i < numPoints; i++) {
        let newX = Math.round(prevX + randomX()); // Generating random increments
        let newY = Math.round(Math.random() * 100);
        data.push({x: newX, y: newY});
        prevX = newX;
    }
    data.push({x: 100, y: 100})
    return data;
}

export const toPaths = (data: any[]) => {

    // Create a path generator
    const pathGenerator = d3Path();

    // Move to the starting point of the path
    pathGenerator.moveTo(data[0].x, data[0].y);

    // Iterate over the data points and construct the path
    for (let i = 1; i < data.length; i++) {
        pathGenerator.lineTo(data[i].x, data[i].y);
    }

    // Get the SVG path string
    return toFigmaPath(pathGenerator.toString());
    //return pathGenerator.toString();
}

const toFigmaPath = (path: string) => {
    // Add spaces between letters and numbers and replace commas with spaces
    return path
        .replaceAll(/([a-zA-Z]+)(\d)/g, '$1 $2')
        .replaceAll(/(\d+)([a-zA-Z])/g, '$1 $2')
        .replaceAll(/,/g, ' ')
}
