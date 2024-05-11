# Cast to Farcaster Github Action

If you want to cast about your project update on Farcaster, then this is the action for you.

Reach out to [@harpaljadeja](https://warpcast.com/harpaljadeja) on farcaster for help.

## Usage

```yaml
- uses: therealharpaljadeja/farcaster-cast-github-action@v1
  with:
      message: "${{ github.event.release.name }}"
      signer-uuid: ${{ secrets.SIGNER_UUID }}
      neynar-api-key: ${{ secrets.NEYNAR_API_KEY }}
```

## Options

### message

**Required**

The message that will be part of the cast.

```yaml
- uses: therealharpaljadeja/farcaster-cast-github-action@v1
  with:
      message: "${{ github.event.release.name }}" # An example where the message is the release title
```

### signer-uuid

**Required**

The Signer UUID of the user that will cast the message. You can get it from [Neynar](https://docs.neynar.com/reference/create-signer)

```yaml
- uses: therealharpaljadeja/farcaster-cast-github-action@v1
  with:
      message: "${{ github.event.release.name }}"
      signer-uuid: ${{ secrets.SIGNER_UUID }} # Signer UUID is used to cast, so better to store it in repository secrets
```

### neynar-api-key

**Required**

[Neynar API](https://neynar.com/) is used by the action to cast and hence requires Neynar API key which can be obtained by signing up for the service.

Since the API key if exposed can be used by other people and consume your units, better to configure it as an [repository secret](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions).

```yaml
- uses: therealharpaljadeja/farcaster-cast-github-action@v1
  with:
      message: "${{ github.event.release.name }}"
      signer-uuid: ${{ secrets.SIGNER_UUID }}
      neynar-api-key: ${{ secrets.NEYNAR_API_KEY }}
```

### embeds

Optional

Embeds can be external links with OpenGraph Preview (potentially even [Farcaster Frames](https://docs.farcaster.xyz/learn/what-is-farcaster/frames)) which you want to be part of the cast or you can quote cast another cast.

**Max 2 embeds only**

#### Format

URL Embed: A url embed can be a string that starts with "https://". Multiple URLs can be comma seperated.
Cast Embed: "({fid}\_{cast_hash})"

```yaml
- uses: therealharpaljadeja/farcaster-cast-github-action@v1
  with:
      message: "${{ github.event.release.name }}"
      signer-uuid: ${{ secrets.SIGNER_UUID }}
      neynar-api-key: ${{ secrets.NEYNAR_API_KEY }}
      embeds: "${{ github.event.release.html_url }},(17979_0x6fd52801e55ca265f8cbbc40293ff020051b735f)" # Example of a URL Embed and a Cast Embed
```

### channel-id

Optional

Channel Id of the channel in which you wish to cast.

```yaml
- uses: therealharpaljadeja/farcaster-cast-github-action@v1
  with:
      message: "${{ github.event.release.name }}"
      signer-uuid: ${{ secrets.SIGNER_UUID }}
      neynar-api-key: ${{ secrets.NEYNAR_API_KEY }}
      embeds: "${{ github.event.release.html_url }},(17979_0x6fd52801e55ca265f8cbbc40293ff020051b735f)"
      channel-id: "degenx"
```

### Example

#### Cast to Farcaster on every release

```yaml
name: Cast to Farcaster on every release

on:
    release:
        types: [published]

jobs:
    cast-release-to-farcaster:
        environment: testing # You can use environment secrets as well
        runs-on: ubuntu-latest
        steps:
            - name: Get code
              uses: actions/checkout@v3
            - name: Cast to Farcaster
              uses: therealharpaljadeja/farcaster-cast-github-action@v1
              with:
                  message: "${{ github.event.release.name }}"
                  signer-uuid: ${{ secrets.SIGNER_UUID }}
                  neynar-api-key: ${{ secrets.NEYNAR_API_KEY }}
                  embeds: "${{ github.event.release.html_url }},(17979_0x6fd52801e55ca265f8cbbc40293ff020051b735f)"
                  channel-id: "degenx"
```
