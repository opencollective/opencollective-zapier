⚠️ DEPRECATED ⚠️ See https://github.com/opencollective/opencollective/issues/3236

# Open Collective - Zapier Integration

A Zapier integration for Open Collective, still in **invite only** mode,
visit [this invite link](https://zapier.com/developer/public-invite/21484/63399c65bb01d75e00fe091ae7f58683/)
to try it.

## Foreword

If you see a step below that could be improved (or is outdated), please update the instructions. We rarely go through this process ourselves, so your fresh pair of eyes and your recent experience with it, makes you the best candidate to improve them for other users. Thank you!

## Development

### Prerequisite

Make sure you have Node.js version >= 10.

### Install

We recommend cloning the repository in a folder dedicated to `opencollective` projects.

```
git clone git@github.com:opencollective/opencollective-zapier.git opencollective/zapier
cd opencollective/zapier
npm install
```

You'll also need to setup an `.env` file following this template:

```env
# GraphQL API URL
API_URL=http://localhost:3000/api/graphql

# A user API key used for testing. Get yours on `/applications`
TEST_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Adding a new trigger

1. Add the notification type in `src/notifications_types.js`
2. Add sample data for this notification type in `src/samples.js`
3. Define the trigger in `src/triggers.js`

The trigger subscribe/unsubscribe/sample will be automatically tested by `test/index.test.js`.

### Testing

- Test everything: `npm run test:zapier`
- Unit tests (jest): `npm run test`

## Deployment

We have some helpers ready to help with the common tasks. For more
advanced operations (deprecating a version, migrating users...etc)
check the official Zapier documentation: https://zapier.github.io/zapier-platform-cli/cli.html

Before deploying a new version, don't forget to run
`npm version patch|minor|major`, otherwhise you'll overwrite the
previous version

- To deploy on `staging`:

```bash
npm run deploy:staging
```

- To deploy on `production`

This command will also bump the version.

```bash
npm run deploy:production
```

- To publish an app as the default

This will replace the default Open Collective app version.
**Never** run this command with a staging version!

```bash
npm run publish [version]
```
