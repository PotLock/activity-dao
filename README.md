# Activity DAO

[Activity DAO](https://activity.community) is a community-driven platform for organizing and participating in events and activities.



Built with love by [Potluck Labs](https://potluck.software)

## Features

- Browse and join DAOs
- Discover and RSVP to events 
- Activity feeds to stay up-to-date
- Wallet integration for authentication


# Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Emotion CSS](https://emotion.sh/docs/introduction)

## Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/ActivityDAO/activity-dao.git
```

2. Install dependencies
```
npm install
```

3. Set up environment variables
   Copy `.env.example` to `.env.local` and fill in the required values:
```
NEXT_PUBLIC_GITHUB_TOKEN=
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
NEXT_PUBLIC_ALCHEMY_ID=
NEXT_PUBLIC_NEYNAR_API=
```
Here's a guide on how to obtain the tokens and keys for each environment variable:

## Environment Variables Setup

To set up your project, you'll need to obtain the following tokens and keys:

### NEXT_PUBLIC_GITHUB_TOKEN

This is a GitHub Personal Access Token. To generate one:

1. Go to your GitHub account settings
2. Click on "Developer settings" in the left sidebar
3. Select "Personal access tokens" and then "Tokens (classic)"
4. Click "Generate new token (classic)"
5. Give your token a descriptive name
6. Select the necessary scopes (typically, "repo" is sufficient for most operations)
7. Click "Generate token"
8. Copy the generated token immediately, as it won't be shown again

### NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

To get a WalletConnect Project ID:

1. Go to https://cloud.walletconnect.com/ and sign in or create an account
2. Create a new project
3. Add your project information (name and project homepage)
4. Select "WalletKit" as the SDK and "Javascript" as the platform
5. Create your project
6. Set the Allowed Domains list to include your project's URLs
7. Copy the project ID from the basic information section

### NEXT_PUBLIC_ALCHEMY_ID

This is your Alchemy API key. To obtain one:

1. Create a free account on Alchemy (https://www.alchemy.com/)
2. Log in to your Alchemy dashboard
3. Click on "Create App" in the dashboard
4. Fill in the app details, selecting the appropriate network (e.g., Ethereum mainnet)
5. Click "Create app"
6. On the app's details page, you'll find your API key in the top right corner

### NEXT_PUBLIC_NEYNAR_API

To get a Neynar API key:

1. Sign up for a Neynar account (https://neynar.com/)
2. After logging in, navigate to your dashboard
3. Look for an option to create or view API keys
4. Generate a new API key
5. Copy the API key for use in your project

Remember to keep these tokens and keys secure and never commit them directly to your repository. Use environment variables or a secure secrets management system to store them.

4. Run the development server
```
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `pages/` - Next.js pages
- `components/` - React components
- `styles/` - CSS styles
- `public/` - Static assets
- `data/` - Data files (include events.json and interests.json which catalog events, daos, and interests with forecaster channels)

## Main Pages

- Home
- DAOs
- Events  
- Feeds

## Documentation

- [Handbook](https://handbook.activity.community)
- [Notion Workspace](https://potlock.notion.site/ACTIVITY-FUND-247c79a4dc4643839b3fab75360c318a)

## Design

- [Figma Designs](https://www.figma.com/design/bMBfA2d7favfAUDo1FsIqS/ActivityDAO?node-id=60-870&node-type=frame&t=ep0DxJNzjDvDnjmu-0)

## To Do [GitHub Project Board](https://github.com/orgs/PotLock/projects/18/views/1)

- Finish design implementation
- Complete handbook documentation
- Set up custom domain and website
- Add event and Luma integration
- Build local JSON database for community contributions

## Contributing

Please check our [GitHub Project Board](https://github.com/orgs/PotLock/projects/18/views/1) for open tasks and issues.

## Connect

- [Twitter](https://twitter.com/activity_dao)
- [Website](https://activity.community)

## License

This project is licensed under the [MIT License](LICENSE).