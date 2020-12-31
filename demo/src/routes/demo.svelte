<script>
  import Parser from '@jamincan/wolang';
  import { create } from 'xmlbuilder2';

  const parser = new Parser();

  let program = '';
  let error = '';
  $: output = compile(program);

  // Recursively flatten a block so that there are no nested sets in it
  function flatten(block) {
    return block.flatMap((set) => {
      if (set.type !== 'Set') return [set];
      const elements = flatten(set.sets);
      console.log(elements);
      return Array(set.repeat)
        .fill()
        .flatMap(() => elements);
    });
  }

  function compile(program) {
    // Parse the program and catch any errors
    try {
      const ast = parser.parse(program);
    } catch (e) {
      error = e;
      return;
    }

    const intervals = flatten(parser.parse(program));

    // Scan to ensure intensity is all power or all percentFTP
    const hasPower = intervals.some((interval) => interval.intensity.type === 'Power');
    const hasPercentFTP = intervals.some(
      (interval) => interval.intensity.type === 'PercentFTP'
    );
    if (hasPower && hasPercentFTP) {
      error =
        ".zwo files can't mix relative and absolute values. Specify power only as a percentage or absolute power, but not both.";
      return;
    }

    // If the program parses, clear the error
    error = '';

    // Build the workout xml structure from the list of intervals
    const workout = intervals.map(({ duration, intensity, annotation }) => {
      let interval = {
        SteadyState: { '@Duration': duration, '@Power': intensity.value },
      };
      if (annotation) {
        interval['SteadyState']['textevent'] = {
          '@timeoffset': 0,
          '@message': annotation,
        };
      }
      return interval;
    });

    // Build the full workout_file document
    let doc = {
      workout_file: {
        author: 'Insert your name here.',
        name: 'Insert workout name here.',
        description: program,
        sportType: 'bike',
        workout: {
          '#': workout,
        },
      },
    };
    if (hasPower) doc['workout_file']['ftpOverride'] = 1; // If absolute values are specified, set FTP to 1 so that power values convert properly

    return create(doc).end({ prettyPrint: true });
  }
</script>

<section class="input">
  <form>
    <textarea
      id="input"
      bind:value={program}
      placeholder="Enter your wolang program here"
      style="width: 100%; height: 20em" />
  </form>
</section>
{#if error}
  <p>{error}</p>
{:else}
  <section class="output">
    <pre>
  <code>
    {output}
  </code>
</pre>
  </section>
{/if}
