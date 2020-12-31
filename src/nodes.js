/** Returns an Interval object - the annotation property is only included if provided */
export function Interval(duration, intensity, annotation) {
  if (annotation) return { type: 'Interval', duration, intensity, annotation };
  return { type: 'Interval', duration, intensity };
}

export function Set(repeat, sets) {
  return { type: 'Set', repeat, sets };
}

export function Power(value) {
  return { type: 'Power', value };
}

export function PercentFTP(value) {
  return { type: 'PercentFTP', value };
}
