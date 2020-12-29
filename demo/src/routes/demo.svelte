<script>
  import Parser from '../../../dist/parser';

  const parser = new Parser();
  let input = '1 min @ 200W';
  let output = parser.parse(input);
</script>

<textarea> {input} </textarea>

<textarea> {output} </textarea>
