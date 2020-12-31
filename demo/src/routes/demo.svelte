<script>
  import Parser from '@jamincan/wolang';
  import { create } from 'xmlbuilder2';

  const parser = new Parser();

  let ftp = 200;
  let input = '1 min @ 200W';
  let output = compile(input);

  // Flattens a block so that there are no nested sets in it
  function flatten(block) {
    return block.flatMap((set) => {
      if (set.type !== 'Set') return [set];
      const elements = flatten(set.sets);
      return Array(set.repeat).flatMap(() => elements);
    });
  }

  function compile(program) {
    const intervals = flatten(parser.parse(program));

    const workout = intervals.map(({ duration, intensity, annotation }) => {
      console.log(intensity);
      intensity =
        intensity.type === 'PercentFTP' ? intensity.value : intensity.power / ftp;
      let interval = { SteadyState: { '@Duration': duration, '@Power': intensity } };
      if (annotation) {
        interval['textevent'] = { '@timeoffset': 0, message: annotation };
      }
      return interval;
    });
    const doc = create({
      workout_file: {
        author: '',
        name: '',
        description: '',
        sportType: 'bike',
        tags: '',
        workout,
      },
    });
    return doc.end({ prettyPrint: true });
  }
</script>

<section class="input">
  <form>
    <label for="ftp">FTP:</label>
    <input type="number" {ftp} />
    <label for="input">Wolang program:</label>
    <textarea id="input"> {input} </textarea>
  </form>
</section>
<section class="output">
  <pre>
  <code>
    {output}
  </code>
</pre>
</section>
