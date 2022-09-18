const sum = (...args: number[]) => {
  return args.reduce((result, item) => {
    return result + item
  }, 0)
}

export default sum
