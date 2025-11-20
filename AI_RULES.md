# AI Development Rules

This document provides guidelines for AI developers working on this web application. Following these rules ensures consistency, maintainability, and adherence to the project's architectural standards.

## Tech Stack

The application is built with a modern, component-based architecture. The core technologies are:

-   **Framework**: React (using Create React App) for building the user interface.
-   **Language**: TypeScript for static typing and improved developer experience.
-   **Styling**: Tailwind CSS for all utility-first styling.
-   **UI Components**: A custom component library built with shadcn/ui and Radix UI primitives, located in `src/components/ui`.
-   **Routing**: Wouter for lightweight and hook-based client-side routing.
-   **Data Fetching & Server State**: TanStack React Query for managing asynchronous data, caching, and server state.
-   **Global State Management**: Zustand for minimal and hook-based client-side state management.
-   **Forms**: React Hook Form for performance-optimized form handling, paired with Zod for schema-based validation.
-   **Icons**: Lucide React for a consistent and lightweight icon set.
-   **Internationalization (i18n)**: A custom context-based solution using JSON files in `src/locales` for multi-language support.

## Library Usage and Coding Guidelines

To maintain a clean and consistent codebase, please adhere to the following rules when selecting and using libraries:

-   **UI Components**:
    -   **ALWAYS** use the pre-built shadcn/ui components from `src/components/ui` for building UI elements (e.g., `Button`, `Card`, `Input`).
    -   Do not install new, third-party component libraries.
    -   If a new component is needed, compose it from the existing primitives in `src/components/ui`.

-   **Styling**:
    -   Use Tailwind CSS utility classes for all styling directly within your JSX.
    -   Avoid writing custom CSS files. If a complex, non-utility style is required (e.g., a unique animation), add it to `src/index.css`.

-   **Icons**:
    -   Use icons exclusively from the `lucide-react` package. This ensures visual consistency and performance.

-   **Routing**:
    -   Use `wouter` and its hook-based APIs (`useLocation`, `useRoute`) for all routing needs.
    -   Keep all route definitions centralized in `src/App.tsx`.

-   **State Management**:
    -   For server state (fetching, caching, updating data from the API), **ALWAYS** use TanStack React Query.
    -   For global client-side state that needs to be shared across components (e.g., theme, user settings), use Zustand. Create small, focused stores.
    -   For local component state, use React's built-in `useState` and `useReducer` hooks.

-   **Forms**:
    -   Use `react-hook-form` for all forms to manage state, validation, and submissions.
    -   Define validation schemas using `zod` and connect them using `@hookform/resolvers/zod`.

-   **API Requests**:
    -   Use the pre-configured Axios instance from `src/config/axiosConfig.ts` for all HTTP requests to the backend. This instance handles the base URL, credentials, and token refresh logic automatically.

-   **Internationalization (i18n)**:
    -   All user-facing text **MUST** be internationalized.
    -   Use the `useLanguage` hook to access the `t` function for translating keys.
    -   Add new translation strings to all JSON files in the `src/locales` directory. Do not hardcode text in components.

-   **File Structure**:
    -   Place full-page components in `src/pages`.
    -   Place reusable, application-specific components in `src/components`.
    -   Shared hooks should go in `src/hooks`.
    -   API-related functions are located in `src/api/api.ts`.