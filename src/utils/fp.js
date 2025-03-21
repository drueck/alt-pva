export const curry = (fn) => {
  const curried = (...args) => {
    if (args.length >= fn.length) {
      return fn(...args)
    }

    return (...args2) => curried(...args.concat(args2))
  }

  return curried
}

export const compose =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value)
