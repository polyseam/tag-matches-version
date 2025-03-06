# tag-matches-version javascript action

This action ensures that the current tag matches the version in some manifest
file.

## Inputs

### `file-path`

path to the manifest which contains the version, `deno.json` by default

### `tag-prefix`

prefix of the tag, `v` by default

### `key`

key of the version in the manifest, `version` by default

## Outputs

### `matches`

`true` if the tag matches the version, `false` otherwise

## basic usage with deno.json

```yaml
uses: polyseam/tag-matches-version@v1
```

## or with package.json

```yaml
uses: polyseam/tag-matches-version@v1
with:
  file-path: "package.json"
```
