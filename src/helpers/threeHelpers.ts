export const radians_to_degrees = (radians: number) => {
  return radians * (180 / Math.PI)
}

export const degrees_to_radians = (degrees: number) => {
  return (degrees * Math.PI) / 180
}
