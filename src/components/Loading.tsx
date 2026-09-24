const Loading = () => {
    return (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-lime-400" />

            <p className="text-sm font-medium tracking-wide text-zinc-400">
                Loading workouts...
            </p>
        </div>
    );
};

export default Loading;