# Daymark

Daymark is a minimalist, privacy-focused mood tracker app. It functions as a digital "Year in Pixels," allowing users to log their daily emotional state, add context with notes, and visualize their year in a color-coded grid.

Built with performance and aesthetics in mind, utilizing the latest features of Next.js 16 and React 19.

![Daymark App Screenshot](public/daymark-logo.png)

## Features

-   **Daily Logging:** Simple interface to log moods on a 5-point scale (Heavy to Bright).
-   **Yearly Grid:** A heatmap visualization of your entire year at a glance.
-   **Timeline View:** A scrollable history of your days, grouped by month, with detailed notes.
-   **Timezone Aware:** Automatically detects and adjusts to the user's local timezone.
-   **Responsive Design:** Optimized for mobile and desktop usage using Tailwind CSS v4.
-   **Secure Authentication:** Powered by Supabase Auth.

## Tech Stack

-   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
-   **Language:** TypeScript
-   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
-   **Database:** PostgreSQL (via [Supabase](https://supabase.com/))
-   **ORM:** [Prisma](https://www.prisma.io/)
-   **UI Components:** [HeroUI](https://heroui.com/) & [Framer Motion](https://www.framer.com/motion/)
-   **Icons:** [Lucide React](https://lucide.dev/)

## Project Structure

-   `/app`: Next.js App Router pages and layouts.
-   `/components`: Reusable UI components (Home, Timeline, Year views).
-   `/lib`: Utilities, database queries, and mood constants.
-   `/actions`: Server Actions for data mutation.
-   `/prisma`: Database schema and migrations.

## License

This project is private and intended for personal use.