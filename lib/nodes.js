/** Returns an Interval object - the annotation property is only included if provided */
export function Interval(duration, intensity, annotation) {
  if (annotation) return { duration, intensity, annotation };
  return { duration, intensity };
}
