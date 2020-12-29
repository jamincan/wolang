# wolang

Wolang is a human-centric language for communicating cycling workouts.

There are a broad array of programs that deal with cycling workouts including trainer software, coaching software, and bike computers. As might be expected, there are also a number of competing standards for communicating a bike workout. None of these standards, however, are designed to be read and used by humans.

The primary aim of Wolang is to be a language that is simple and easy to use directly. Coaches and athletes already communicate workouts in a concise, simple, and (usually) unambiguous way; Wolang attempts to formalize this language so it can also be used by computers.

    ```wolang
    # Example Program
    10min @170W "warmup"
    2x 5min @250W, 3min @220W, 60s @150W
    10min @170W "cooldown"]
    ```

More information about the javascript parser included with this project can be found in the [Documentation](DOCUMENTATION.md)
