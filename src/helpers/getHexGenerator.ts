export function getHexagonPathData() {
  // #################### x1,y0 ####################
  // ############## xc1,yc0 # xc2,yc0 ##############
  // ###############################################
  // ###############################################
  // #### xc0,yc1 ##################### xc3,yc1 ####
  // ## x0,y1 ############################# x2,y1 ##
  // ## x0,yc2 ########################### x2,yc2 ##
  // ###############################################
  // ###############################################
  // ## x0,yc3 ########################### x2,yc3 ##
  // ## x0,y2 ############################# x2,y2 ##
  // #### xc0,yc4 ##################### xc3,yc4 ####
  // ###############################################
  // ###############################################
  // ############## xc1,yc5 # xc2,yc5 ##############
  // #################### x1,y3 ####################

  const sin = (deg: number) => Math.sin((deg * Math.PI) / 180)
  const cos = (deg: number) => Math.cos((deg * Math.PI) / 180)

  const borderRadius = 10
  const sideLength = 50
  const x0 = 2;
  const y0 = 0;

  const x1 = sideLength * cos(30)
  const y1 = sideLength * sin(30)

  const xc1 = x1 - borderRadius * cos(30)
  const yc0 = borderRadius * sin(30)
  const xc2 = x1 + borderRadius * cos(30)

  const x2 = 2 * x1
  const y2 = y1 + sideLength

  const xc3 = x2 - borderRadius * cos(30)
  const yc1 = y1 - borderRadius * sin(30)
  const yc2 = y1 + borderRadius

  const y3 = y2 + y1

  const yc3 = y2 - borderRadius
  const yc4 = y2 + borderRadius * sin(30)

  const yc5 = y3 - borderRadius * sin(30)
  const xc0 = borderRadius * cos(30)

  return `
          M ${xc1},${yc0}
          Q ${x1},${y0} ${xc2},${yc0}
  
          L ${xc3},${yc1}
          Q ${x2},${y1} ${x2},${yc2}
  
          L ${x2},${yc3}
          Q ${x2},${y2} ${xc3},${yc4}
  
          L ${xc2},${yc5}
          Q ${x1},${y3} ${xc1},${yc5}
          
          L ${xc0},${yc4}
          Q ${x0},${y2} ${x0},${yc3}
          
          L ${x0},${yc2}
          Q ${x0},${y1} ${xc0},${yc1}
          Z
        `
}
