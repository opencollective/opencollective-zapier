# Open Collective - Zapier Integration

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

### Testing

- Test everything: `npm run test:zapier`
- Unit tests (jest): `npm run test`

## Deployment

TODO
