# FitLog

FitLog is a modern workout library and workout planning application built with Next.js. It allows users to browse workouts, view detailed workout information, save workouts for later, and create a personalized daily workout plan.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- React Toastify
- REST API
- Local Storage

## Features

- Responsive workout library for mobile, tablet, and desktop
- Browse workouts fetched from the FitLog REST API
- Detailed workout pages with equipment, difficulty, sets, reps, duration, calories, rating, and instructions
- Add workouts to today's personalized plan
- Save workouts for later
- My Plan page with workout metrics for exercises, minutes, and calories
- Mark workouts as completed
- Remove workouts from the plan
- Sort workouts by duration, calories, or rating
- Persistent plan and saved workouts using Local Storage
- Responsive navigation with live Plan and Saved counters
- Custom loading state and 404 page
- Toast notifications for workout actions

## API

All workouts:

`https://api.abcz.workers.dev/api/fitlog`

Single workout:

`https://api.abcz.workers.dev/api/fitlog/:id`

## Project Structure

```text
src/
├── app/
│   ├── my-plan/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── workout/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
├── context/
├── data/
├── lib/
└── types/