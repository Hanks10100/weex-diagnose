# Weex Diagnose

Compile and diagnose Weex source files. *Only support `.vue` syntax currently.*

## Usage

```
weex-diagnose [options] <path>
```

The `path` can be local path or remote url. Moreover, it can parse the url rules of `http://dotwe.org/vue/`.

### Options

+ `-V`: `--version` output the version number.
+ `-s`: `--silent` Donot print the results in console.
+ `-z`: `--zebra` Diagnose zebra moudle.
+ `-d`: `--directory` Diagnose the whole directory.
+ `-o`: `--output <dest>` Write the results into a json file.
+ `-h`: `--help` output usage information.

## Example

```
weex-diagnose http://dotwe.org/vue/c5cd35c8cec3b197662583be41387d90
```
