export const svgPath = (points: number[][], command: any) => {
  // build the d attributes by looping over the points
  const d = points.reduce(
    (acc, point, i, a) =>
      i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${command(point, i, a)}`,
    ''
  )
  return d
  // return `<path d="${d}" fill="none" stroke="grey" />`
}

// Properties of a line
// I:  - pointA (array) [x,y]: coordinates
//     - pointB (array) [x,y]: coordinates
// O:  - (object) { length: l, angle: a }: properties of the line
const line = (pointA: any, pointB: any) => {
  const lengthX = pointB[0] - pointA[0]
  const lengthY = pointB[1] - pointA[1]
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: 1*Math.random() + Math.atan2(lengthY, lengthX)
  }
}

// Position of a control point
// I:  - current (array) [x, y]: current point coordinates
//     - previous (array) [x, y]: previous point coordinates
//     - next (array) [x, y]: next point coordinates
//     - reverse (boolean, optional): sets the direction
// O:  - (array) [x,y]: a tuple of coordinates
const controlPoint = (current: any, previous: any, next: any, reverse?: any) => {
  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  const p = previous || current
  const n = next || current
  const smoothing = 0.25

  // Properties of the opposed-line
  const o = line(p, n)

  // If is end-control-point, add PI to the angle to go backward
  const angle_noise = 0.25*(Math.random() - Math.random()) ;
  const angle = 1.25*o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing

  // The control point position is relative to the current point
  const x = current[0] + Math.cos(angle) * length
  const y = current[1] + Math.sin(angle) * length
  return [x, y]
}

// Create the bezier curve command
// I:  - point (array) [x,y]: current point coordinates
//     - i (integer): index of 'point' in the array 'a'
//     - a (array): complete array of points coordinates
// O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command
export const bezierCommand = (point: any, i: any, a: any) => {
  // start control point
  const cps = controlPoint(a[i - 1], a[i - 2], point)

  // end control point
  const cpe = controlPoint(point, a[i - 1], a[i + 1], true)
  return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`
}

const lineCommand = (point: number[]) => `L ${point[0]} ${point[1]}`
