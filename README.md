# polyseam/tag-matches-version action

Generally we use [git tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
to trigger release builds of our projects.

The tag associates the commit SHA which should be used to build the release.

The git tag is not necessarily in line with the version of the software in the
source code - but it should be.

This action is used to ensure the git tag matches the version value in your
source code, generally in a manifest like `deno.json` or `package.json`.

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

## inputs

### `file-path`

`deno.json` by default

This is the path to the manifest in your repo which contains the version value.

If the `file-path` ends with `.yaml` or `.yml` the action will try to parse the
file as a yaml file instead of as a json/jsonc file.

### `tag-prefix`

`v` by default

If you use the default value the action will assume your git tag begins with a
`v` and will strip that prefix before comparing it to the version in your
manifest.

For example, if you leave `tag-prefix` set to `v` and your manifest contains
`1.0.0` then your git tag should be `v1.0.0` in order for the action to match
and succeed.

### `key`

`version` by default

The `key` is used to pull the version value from your manifest, whether your
manifest is JSON, JSONC, or YAML, we will use this key to access the value.

### `fail-on-mismatch`

`true` by default

The standard behavior is for this action to fail and prevent your build if the
tag does not match the manifest version, giving you a chance to fix the manifest
before the release build continues.

If you set this to `false` the action will not fail the build, but will output
the `matches` value as `false`.

## outputs

### `matches`

`true` if the tag matches the version, `false` otherwise
