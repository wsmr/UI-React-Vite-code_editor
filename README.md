# Create a new Vite project with React template
npm create vite@latest my-react-app -- --template react

You can choose different React templates:
- react - JavaScript + React
- react-ts - TypeScript + React
- react-swc - React with SWC (faster compilation)
- react-swc-ts - TypeScript + React + SWC

# Navigate to the project directory
cd my-react-app

# Install dependencies
npm install

# Start the development server
npm run dev

Development Commands
- npm run dev      # Start development server
- npm run build    # Build for production
- npm run preview  # Preview production build
- npm run lint     # Run ESLint (if configured)


## Project Structure
```
my-react-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# UI-React-Vite-code_editor
